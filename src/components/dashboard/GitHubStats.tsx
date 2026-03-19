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
          <Card key={label}>
            <div className="flex items-center gap-3">
              <Icon size={18} className={color} />
              <div>
                <div className="text-xl font-bold font-mono text-white">{value}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Top Languages */}
      <Card>
        <h3 className="text-sm font-mono text-gray-400 mb-4 uppercase tracking-wider">
          Top Languages · by bytes of code
        </h3>
        {stats.languages.length > 0 ? (
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.languages} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: '#161616',
                    border: '1px solid #1f2937',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#e5e7eb',
                  }}
                  formatter={(value) => [`${value}%`, 'Usage']}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {stats.languages.map((entry, index) => (
                    <Cell key={index} fill={entry.color} opacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-gray-500 text-sm text-center py-8">No language data available</p>
        )}
      </Card>

      {/* Recent Activity */}
      <Card>
        <h3 className="text-sm font-mono text-gray-400 mb-4 uppercase tracking-wider">
          Recent Activity
        </h3>
        <div className="space-y-2">
          {stats.recentActivity.slice(0, 8).map((event) => {
            const repoName = event.repo.split('/')[1] || event.repo;
            const repoOwner = event.repo.split('/')[0] || '';
            const commitMsg = event.payload?.commits?.[0]?.message;
            return (
              <div
                key={event.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyan-500/10 transition-colors"
              >
                <span className="text-[10px] font-mono text-cyan-400 mt-0.5 shrink-0 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                  {event.type}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">{repoOwner}/</span>
                    <a
                      href={`https://github.com/${event.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-300 font-mono hover:text-cyan-400 transition-colors truncate"
                    >
                      {repoName}
                    </a>
                  </div>
                  {commitMsg && (
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {commitMsg}
                    </p>
                  )}
                </div>
                <span className="text-xs text-gray-600 shrink-0 font-mono">
                  {new Date(event.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            );
          })}
          {stats.recentActivity.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-4">No recent activity</p>
          )}
        </div>
      </Card>
    </div>
  );
}
