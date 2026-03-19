import { GitHubStats } from '@/types';
import { BookOpen, Star, Users, GitFork } from 'lucide-react';

interface QuickStatsProps {
  stats: GitHubStats;
}

export default function QuickStats({ stats }: QuickStatsProps) {
  const items = [
    { label: 'Public Repos', value: stats.totalRepos, icon: BookOpen },
    { label: 'Total Stars', value: stats.totalStars, icon: Star },
    { label: 'Forks', value: stats.totalForks, icon: GitFork },
    { label: 'Followers', value: stats.followers, icon: Users },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 pb-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-[#161616] border border-[#1f2937] rounded-xl p-5 text-center hover:border-cyan-500/30 transition-all duration-300"
          >
            <Icon size={20} className="text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white font-mono">{value}</div>
            <div className="text-sm text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
