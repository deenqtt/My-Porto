import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail, validateContact } from '@/lib/email';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 });
  }

  const body = await req.json();
  const validation = validateContact(body);
  if (!validation.valid) {
    const firstError = Object.values(validation.errors).find(Boolean);
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const { name, email, subject, message } = body as { name: string; email: string; subject: string; message: string };
  const result = await sendContactEmail({ name, email, subject, message });

  if (!result.success) {
    return NextResponse.json({ error: result.error ?? 'Failed to send message.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
