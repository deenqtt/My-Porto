import type { Metadata } from 'next';
import { fetchGitHubStats } from '@/lib/github';
import { fetchWakaTimeStats } from '@/lib/wakatime';
import GitHubStats from '@/components/dashboard/GitHubStats';
import WakaTimeStats from '@/components/dashboard/WakaTimeStats';
import ContribGraph from '@/components/dashboard/ContribGraph';
import WebVitals from '@/components/dashboard/WebVitals';
import { LayoutDashboard } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dev Dashboard',
  description: 'Live developer dashboard — GitHub stats, WakaTime coding hours, and Web Vitals.',
};

export const revalidate = 3600;

export default async function DashboardPage() {
  const [githubStats, wakaStats] = await Promise.all([
    fetchGitHubStats(),
    fetchWakaTimeStats(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-20">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <LayoutDashboard size={24} className="text-cyan-400" />
          <h1 className="text-4xl font-bold text-white">
            Dev <span className="text-gradient">Dashboard</span>
          </h1>
        </div>
        <div className="w-12 h-0.5 bg-cyan-500 rounded mb-4" />
        <p className="text-gray-400">
          Live stats from GitHub and WakaTime. Web Vitals measured in real-time as you browse.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left / Main column */}
        <div className="lg:col-span-2 space-y-6">
          <GitHubStats stats={githubStats} />
          <ContribGraph contributions={githubStats.contributions} totalContributions={githubStats.totalContributions} />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <WakaTimeStats stats={wakaStats} />
          <WebVitals />
        </div>
      </div>
    </div>
  );
}
