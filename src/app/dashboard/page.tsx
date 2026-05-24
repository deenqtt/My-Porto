import type { Metadata } from 'next';
import { fetchGitHubStats } from '@/lib/github';
import { fetchWakaTimeStats } from '@/lib/wakatime';
import GitHubStats from '@/components/dashboard/GitHubStats';
import WakaTimeStats from '@/components/dashboard/WakaTimeStats';
import ContribGraph from '@/components/dashboard/ContribGraph';
import WebVitals from '@/components/dashboard/WebVitals';
import { Activity, Terminal, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering Telemetry',
  description: 'Live engineering telemetry — Source control metrics, coding sessions, and system vitals.',
};

export const revalidate = 3600;

export default async function DashboardPage() {
  const [githubStats, wakaStats] = await Promise.all([
    fetchGitHubStats(),
    fetchWakaTimeStats(),
  ]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header / System Status */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">System Live Telemetry</span>
            </div>
            <h1 className="text-4xl font-bold text-white">
              Engineering <span className="text-gradient">Control Center</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-6 p-4 rounded-xl bg-[#161616] border border-[#1f2937] backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Terminal size={18} className="text-gray-500" />
              <div>
                <div className="text-[10px] text-gray-500 uppercase font-mono">Status</div>
                <div className="text-xs text-white font-mono">NOMINAL</div>
              </div>
            </div>
            <div className="h-8 w-px bg-[#1f2937]" />
            <div className="flex items-center gap-3">
              <ShieldCheck size={18} className="text-gray-500" />
              <div>
                <div className="text-[10px] text-gray-500 uppercase font-mono">Security</div>
                <div className="text-xs text-white font-mono">ENCRYPTED</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* Left Column: Source Control (2/4) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 mb-4">
               <Activity size={16} className="text-cyan-400" />
               <h2 className="text-sm font-mono text-gray-400 uppercase tracking-widest">Source Control Telemetry</h2>
            </div>
            <GitHubStats stats={githubStats} />
            <ContribGraph contributions={githubStats.contributions} totalContributions={githubStats.totalContributions} />
          </div>

          {/* Middle Column: Coding Sessions (1/4) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-2 mb-4">
               <Terminal size={16} className="text-cyan-400" />
               <h2 className="text-sm font-mono text-gray-400 uppercase tracking-widest">Active Sessions</h2>
            </div>
            <WakaTimeStats stats={wakaStats} />
          </div>

          {/* Right Column: System Health (1/4) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-2 mb-4">
               <Activity size={16} className="text-blue-400" />
               <h2 className="text-sm font-mono text-gray-400 uppercase tracking-widest">Frontend Vitals</h2>
            </div>
            <WebVitals />
          </div>

        </div>
      </div>
    </main>
  );
}
