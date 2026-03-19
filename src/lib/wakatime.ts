import { WakaTimeStats } from '@/types';

const WAKATIME_BASE = 'https://wakatime.com/api/v1';

export async function fetchWakaTimeStats(): Promise<WakaTimeStats | null> {
  const apiKey = process.env.WAKATIME_API_KEY;
  if (!apiKey) return null;

  try {
    const encoded = Buffer.from(apiKey).toString('base64');
    const headers = { Authorization: `Basic ${encoded}` };

    const res = await fetch(`${WAKATIME_BASE}/users/current/stats/last_30_days`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const { data } = await res.json();

    return {
      totalSeconds: data.total_seconds || 0,
      humanReadableTotal: data.human_readable_total || '0 hrs',
      languages: (data.languages || []).slice(0, 8).map((l: Record<string, unknown>) => ({
        name: String(l.name),
        totalSeconds: Number(l.total_seconds),
        percent: Number(l.percent),
        color: String(l.color || '#06b6d4'),
      })),
      projects: (data.projects || []).slice(0, 6).map((p: Record<string, unknown>) => ({
        name: String(p.name),
        totalSeconds: Number(p.total_seconds),
        percent: Number(p.percent),
      })),
    };
  } catch {
    return null;
  }
}
