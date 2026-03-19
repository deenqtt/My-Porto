export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  image?: string;
  status: 'completed' | 'in-progress' | 'planned';
  category: 'protocol-in' | 'protocol-out' | 'mobile' | 'other';
  process: ProcessStep[];
  year: number;
}

export interface ProcessStep {
  phase: string;
  description: string;
  duration?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image?: string;
  url?: string;
  category: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon?: string;
  category: string;
}

export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  followers: number;
  totalContributions: number;
  languages: { name: string; count: number; color: string }[];
  recentActivity: GitHubEvent[];
  contributions: ContributionDay[];
}

export interface GitHubEvent {
  id: string;
  type: string;
  repo: string;
  createdAt: string;
  payload?: {
    commits?: { message: string }[];
    action?: string;
  };
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface WakaTimeStats {
  totalSeconds: number;
  humanReadableTotal: string;
  languages: { name: string; totalSeconds: number; percent: number; color?: string }[];
  projects: { name: string; totalSeconds: number; percent: number }[];
}

export interface WebVitalMetric {
  metric: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export interface GuestbookMessage {
  id: string;
  name: string;
  message: string;
  created_at: string;
}
