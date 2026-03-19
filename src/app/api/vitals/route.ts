import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { rateLimit } from '@/lib/rateLimit';

const ALLOWED_METRICS = ['FCP', 'LCP', 'CLS', 'FID', 'TTFB', 'INP'];

export async function POST(req: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ ok: true }); // silent ignore if not configured
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!rateLimit(ip, 20, 60_000)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  try {
    const { metric, value } = await req.json();

    if (!ALLOWED_METRICS.includes(metric)) {
      return NextResponse.json({ error: 'Unknown metric.' }, { status: 400 });
    }

    if (typeof value !== 'number' || !isFinite(value)) {
      return NextResponse.json({ error: 'Invalid value.' }, { status: 400 });
    }

    await supabase.from('web_vitals').insert([{ metric, value }]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
