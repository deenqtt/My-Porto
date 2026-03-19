import { NextResponse } from 'next/server';
import { fetchGitHubStats } from '@/lib/github';

export const revalidate = 3600;

export async function GET() {
  try {
    const stats = await fetchGitHubStats();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch GitHub stats' }, { status: 500 });
  }
}
