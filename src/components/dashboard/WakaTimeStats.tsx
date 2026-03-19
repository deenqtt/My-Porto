'use client';

import { WakaTimeStats as WakaTimeStatsType } from '@/types';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '@/components/ui/Card';
import { Clock } from 'lucide-react';

interface Props {
  stats: WakaTimeStatsType | null;
}

const COLORS = ['#06b6d4', '#818cf8', '#f59e0b', '#10b981', '#f43f5e', '#8b5cf6', '#ec4899', '#06b6d4'];

export default function WakaTimeStats({ stats }: Props) {
  if (!stats) {
    return (
      <Card>
        <h3 className="text-sm font-mono text-gray-400 mb-4 uppercase tracking-wider">
          WakaTime Stats
        </h3>
        <div className="text-center py-8">
          <Clock size={32} className="text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 text-sm mb-2">WakaTime not configured</p>
          <p className="text-gray-600 text-xs">
            Add{' '}
            <code className="text-cyan-400">WAKATIME_API_KEY</code> to{' '}
            <code className="text-cyan-400">.env.local</code>
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <Clock size={18} className="text-cyan-400" />
          <div>
            <div className="text-2xl font-bold font-mono text-white">
              {stats.humanReadableTotal}
            </div>
            <div className="text-xs text-gray-500">coded in last 30 days</div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-mono text-gray-400 mb-4 uppercase tracking-wider">
          Languages
        </h3>
        <div className="flex items-center gap-6">
          <div className="h-40 w-40 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.languages}
                  dataKey="percent"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={60}
                >
                  {stats.languages.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: '#161616',
                    border: '1px solid #1f2937',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#e5e7eb',
                  }}
                  formatter={(v) => [`${Number(v).toFixed(1)}%`]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2 min-w-0">
            {stats.languages.map((lang, i) => (
              <div key={lang.name} className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: COLORS[i % COLORS.length] }}
                />
                <span className="text-sm text-gray-300 truncate">{lang.name}</span>
                <span className="text-xs text-gray-500 ml-auto font-mono">
                  {lang.percent.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {stats.projects.length > 0 && (
        <Card>
          <h3 className="text-sm font-mono text-gray-400 mb-4 uppercase tracking-wider">
            Projects
          </h3>
          <div className="space-y-3">
            {stats.projects.map((project) => (
              <div key={project.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{project.name}</span>
                  <span className="text-gray-500 font-mono">{project.percent.toFixed(1)}%</span>
                </div>
                <div className="h-1.5 bg-[#1f2937] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-500 rounded-full"
                    style={{ width: `${project.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
