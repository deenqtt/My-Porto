'use client';

import { GitHubStats as GitHubStatsType } from '@/types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Card from '@/components/ui/Card';
import { GitBranch, Star, Users, BookOpen } from 'lucide-react';

interface Props {
  stats: GitHubStatsType;
}

export default function GitHubStats({ stats }: Props) {
  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Repos', value: stats.totalRepos, icon: BookOpen, color: 'text-cyan-400' },
          { label: 'Stars', value: stats.totalStars, icon: Star, color: 'text-yellow-400' },
          { label: 'Forks', value: stats.totalForks, icon: GitBranch, color: 'text-purple-400' },
          { label: 'Followers', value: stats.followers, icon: Users, color: 'text-green-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-[#161616] border border-[#1f2937] p-4 rounded-xl relative overflow-hidden group">
            <div className="flex items-center gap-3 relative z-10">
              <Icon size={16} className={color} />
              <div>
                <div className="text-xl font-bold font-mono text-white">{value}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-tighter font-mono">{label}</div>
              </div>
            </div>
            {/* Subtle background gauge effect */}
            <div className="absolute bottom-0 left-0 h-0.5 bg-cyan-500/20 w-full" />
          </div>
        ))}
      </div>

      {/* Top Languages */}
      <Card>
        <h3 className="text-[10px] font-mono text-gray-500 mb-6 uppercase tracking-[0.2em] flex justify-between">
          <span>Module Distribution</span>
          <span className="text-cyan-500/50">by bytes of code</span>
        </h3>
        {stats.languages.length > 0 ? (
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.languages} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: '#6b7280', fontFamily: 'monospace' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: '#6b7280', fontFamily: 'monospace' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: '#161616',
                    border: '1px solid #1f2937',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    color: '#e5e7eb',
                  }}
                  cursor={{ fill: 'white', opacity: 0.05 }}
                  formatter={(value) => [`${value}%`, 'Allocation']}
                />
                <Bar dataKey="count" radius={[2, 2, 0, 0]} barSize={30}>
                  {stats.languages.map((entry, index) => (
                    <Cell key={index} fill={entry.color} opacity={0.7} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-gray-500 text-sm text-center py-8">No data stream</p>
        )}
      </Card>

      {/* Recent Activity */}
      <Card>
        <h3 className="text-[10px] font-mono text-gray-500 mb-6 uppercase tracking-[0.2em]">
          Event Log
        </h3>
        <div className="space-y-1">
          {stats.recentActivity.slice(0, 5).map((event) => {
            const repoName = event.repo.split('/')[1] || event.repo;
            const commitMsg = event.payload?.commits?.[0]?.message;
            return (
              <div
                key={event.id}
                className="flex items-center gap-4 p-2 rounded hover:bg-white/[0.02] transition-colors border-b border-white/[0.02] last:border-0"
              >
                <span className="text-[9px] font-mono text-cyan-500/70 shrink-0 w-20 truncate">
                  {event.type.replace('Event', '')}
                </span>
                <div className="min-w-0 flex-1 flex items-center gap-2">
                  <span className="text-[11px] text-gray-300 font-mono truncate">
                    {repoName}
                  </span>
                  {commitMsg && (
                    <span className="text-[10px] text-gray-500 truncate hidden md:block">
                      - {commitMsg}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-gray-600 shrink-0 font-mono">
                  {new Date(event.createdAt).toLocaleTimeString('en-US', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
