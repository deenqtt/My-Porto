'use client';

import { GitHubStats } from '@/types';
import { BookOpen, Star, Users, GitFork, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuickStatsProps {
  stats: GitHubStats;
}

export default function QuickStats({ stats }: QuickStatsProps) {
  const items = [
    { label: 'Repositories', value: stats.totalRepos, icon: BookOpen, color: 'text-cyan-400' },
    { label: 'Total Stars', value: stats.totalStars, icon: Star, color: 'text-yellow-500' },
    { label: 'Fork Count', value: stats.totalForks, icon: GitFork, color: 'text-purple-400' },
    { label: 'Watchers', value: stats.followers, icon: Users, color: 'text-blue-400' },
  ];

  return (
    <div className="relative p-5 md:p-8 rounded-2xl md:rounded-3xl bg-[#0d0d0d] border border-[#1f2937] overflow-hidden group">
      {/* HUD Frame Elements - Reduced size on mobile */}
      <div className="absolute top-0 left-0 w-4 h-4 md:w-8 md:h-8 border-t-2 border-l-2 border-cyan-500/20 rounded-tl-xl md:rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-4 h-4 md:w-8 md:h-8 border-t-2 border-r-2 border-cyan-500/20 rounded-tr-xl md:rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-4 h-4 md:w-8 md:h-8 border-b-2 border-l-2 border-cyan-500/20 rounded-bl-xl md:rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-4 h-4 md:w-8 md:h-8 border-b-2 border-r-2 border-cyan-500/20 rounded-br-xl md:rounded-br-2xl" />

      {/* Metadata Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8 px-1 md:px-2">
        <div className="flex items-center gap-3">
          <Activity size={12} className="text-cyan-500 animate-pulse" />
          <span className="text-[8px] md:text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">
            System_Telemetry_Output
          </span>
        </div>
        <div className="text-[8px] md:text-[10px] font-mono text-cyan-500/40 hidden sm:block">
          MODE: NOMINAL
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
        {items.map(({ label, value, icon: Icon, color }, index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center lg:items-start"
          >
            <div className="flex items-center gap-2 mb-2 md:mb-3 text-center lg:text-left">
               <Icon size={12} className={color} />
               <span className="text-[8px] md:text-[9px] font-mono text-gray-600 uppercase tracking-widest">{label}</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white font-mono tracking-tighter">
              {value.toString().padStart(2, '0')}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scanning Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent h-1/2 w-full animate-[scanline_8s_linear_infinite] pointer-events-none" />
    </div>
  );
}
