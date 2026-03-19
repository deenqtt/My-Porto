import { NextResponse } from 'next/server';
import { fetchWakaTimeStats } from '@/lib/wakatime';

export const revalidate = 3600;

export async function GET() {
  try {
    const stats = await fetchWakaTimeStats();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch WakaTime stats' }, { status: 500 });
  }
}
