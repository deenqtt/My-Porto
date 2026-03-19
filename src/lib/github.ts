import { GitHubStats, ContributionDay } from '@/types';

const GITHUB_USERNAME = 'deenqtt';
const GITHUB_API = 'https://api.github.com';

const restHeaders: HeadersInit = {
  Accept: 'application/vnd.github.v3+json',
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  'C++': '#f34b7d',
  C: '#555555',
  HTML: '#e34c26',
  CSS: '#563d7c',
  PHP: '#4F5D95',
  Rust: '#dea584',
  Go: '#00ADD8',
  Java: '#b07219',
  Dart: '#00B4AB',
  Shell: '#89e051',
  Makefile: '#427819',
  Vue: '#41b883',
  SCSS: '#c6538c',
};

// Map GitHub contribution color hex → level 0-4
function colorToLevel(color: string): 0 | 1 | 2 | 3 | 4 {
  const map: Record<string, 0 | 1 | 2 | 3 | 4> = {
    '#ebedf0': 0,
    '#161b22': 0,
    '#0d1117': 0,
    '#9be9a8': 1,
    '#40c463': 2,
    '#30a14e': 3,
    '#216e39': 4,
  };
  return map[color.toLowerCase()] ?? 1;
}

interface ContribResult {
  days: ContributionDay[];
  total: number;
}

// Fetch real contribution calendar via GitHub GraphQL API
async function fetchContributions(): Promise<ContribResult> {
  if (!process.env.GITHUB_TOKEN) return { days: [], total: 0 };

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const from = oneYearAgo.toISOString();
  const to = new Date().toISOString();

  const query = `{
    user(login: "${GITHUB_USERNAME}") {
      contributionsCollection(from: "${from}", to: "${to}") {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
        restrictedContributionsCount
      }
    }
  }`;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return { days: [], total: 0 };

    const json = await res.json();
    const collection = json?.data?.user?.contributionsCollection;
    const weeks = collection?.contributionCalendar?.weeks ?? [];
    const calendarTotal: number = collection?.contributionCalendar?.totalContributions ?? 0;
    const restricted: number = collection?.restrictedContributionsCount ?? 0;

    const days: ContributionDay[] = [];
    for (const week of weeks) {
      for (const day of week.contributionDays) {
        days.push({
          date: day.date,
          count: day.contributionCount,
          level: day.contributionCount === 0 ? 0 : colorToLevel(day.color),
        });
      }
    }

    // calendarTotal = public contributions shown in calendar
    // restricted = private contributions (visible when user enables "private contributions" on profile)
    // Together they equal what GitHub shows on your profile page
    return { days, total: calendarTotal + restricted };
  } catch {
    return { days: [], total: 0 };
  }
}

const EVENT_LABELS: Record<string, string> = {
  PushEvent: 'Push',
  CreateEvent: 'Create',
  DeleteEvent: 'Delete',
  ForkEvent: 'Fork',
  WatchEvent: 'Star',
  PullRequestEvent: 'PR',
  IssuesEvent: 'Issue',
  IssueCommentEvent: 'Comment',
  ReleaseEvent: 'Release',
  PublicEvent: 'Public',
};

export async function fetchGitHubStats(): Promise<GitHubStats> {
  try {
    const [userRes, reposRes, eventsRes, contribResult] = await Promise.all([
      fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
        headers: restHeaders,
        next: { revalidate: 3600 },
      }),
      fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
        headers: restHeaders,
        next: { revalidate: 3600 },
      }),
      fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/events/public?per_page=30`, {
        headers: restHeaders,
        next: { revalidate: 300 },
      }),
      fetchContributions(),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error('GitHub API error');
    }

    const user = await userRes.json();
    const repos = await reposRes.json();
    const events = eventsRes.ok ? await eventsRes.json() : [];

    const langBytes: Record<string, number> = {};
    let totalStars = 0;
    let totalForks = 0;

    const nonForkRepos = repos.filter((r: Record<string, unknown>) => !r.fork && r.size);

    for (const repo of repos) {
      if (repo.fork) continue;
      totalStars += repo.stargazers_count || 0;
      totalForks += repo.forks_count || 0;
    }

    // Fetch per-repo language bytes in parallel (like GitHub's language chart)
    const langResults = await Promise.allSettled(
      nonForkRepos.map((repo: Record<string, unknown>) =>
        fetch(`${GITHUB_API}/repos/${repo.full_name}/languages`, {
          headers: restHeaders,
          next: { revalidate: 3600 },
        }).then((r) => r.json())
      )
    );

    for (const result of langResults) {
      if (result.status === 'fulfilled' && typeof result.value === 'object') {
        for (const [lang, bytes] of Object.entries(result.value as Record<string, number>)) {
          langBytes[lang] = (langBytes[lang] || 0) + bytes;
        }
      }
    }

    const totalBytes = Object.values(langBytes).reduce((a, b) => a + b, 0) || 1;

    const languages = Object.entries(langBytes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, bytes]) => ({
        name,
        count: Math.round((bytes / totalBytes) * 100), // percentage
        color: LANG_COLORS[name] || '#8b949e',
      }));

    const recentActivity = Array.isArray(events)
      ? events.slice(0, 10).map((e: Record<string, unknown>) => ({
          id: String(e.id),
          type: EVENT_LABELS[String(e.type)] ?? String(e.type).replace('Event', ''),
          repo: (e.repo as { name: string })?.name || '',
          createdAt: String(e.created_at),
          payload: e.payload as { commits?: { message: string }[]; action?: string },
        }))
      : [];

    return {
      totalRepos: user.public_repos || 0,
      totalStars,
      totalForks,
      followers: user.followers || 0,
      totalContributions: contribResult.total,
      languages,
      recentActivity,
      contributions: contribResult.days,
    };
  } catch {
    return {
      totalRepos: 0,
      totalStars: 0,
      totalForks: 0,
      followers: 0,
      totalContributions: 0,
      languages: [],
      recentActivity: [],
      contributions: [],
    };
  }
}
