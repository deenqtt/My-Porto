'use client';

import { WakaTimeStats as WakaTimeStatsType } from '@/types';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '@/components/ui/Card';
import { Clock, Cpu } from 'lucide-react';

interface Props {
  stats: WakaTimeStatsType | null;
}

const COLORS = ['#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e'];

export default function WakaTimeStats({ stats }: Props) {
  if (!stats) {
    return (
      <Card>
        <h3 className="text-[10px] font-mono text-gray-500 mb-6 uppercase tracking-[0.2em]">
          Session Data
        </h3>
        <div className="text-center py-8">
          <Clock size={32} className="text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Offline</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <Clock size={20} className="text-cyan-400" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-white tracking-tight">
              {stats.humanReadableTotal}
            </div>
            <div className="text-[10px] text-gray-500 font-mono uppercase">Coded · Last 30d</div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-[10px] font-mono text-gray-500 mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
          <Cpu size={12} />
          Resource Allocation
        </h3>
        <div className="h-44 w-full mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stats.languages}
                dataKey="percent"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={4}
              >
                {stats.languages.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#161616',
                  border: '1px solid #1f2937',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  color: '#e5e7eb',
                }}
                formatter={(v) => [`${Number(v).toFixed(1)}%`, 'Usage']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          {stats.languages.slice(0, 6).map((lang, i) => (
            <div key={lang.name} className="flex items-center justify-between text-[11px] font-mono">
              <div className="flex items-center gap-2 text-gray-400">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: COLORS[i % COLORS.length] }}
                />
                {lang.name}
              </div>
              <span className="text-gray-600">{lang.percent.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </Card>

      {stats.projects.length > 0 && (
        <Card>
          <h3 className="text-[10px] font-mono text-gray-500 mb-6 uppercase tracking-[0.2em]">
            Active Subsystems
          </h3>
          <div className="space-y-4">
            {stats.projects.slice(0, 5).map((project) => (
              <div key={project.name}>
                <div className="flex justify-between text-[11px] font-mono mb-1.5">
                  <span className="text-gray-400">{project.name}</span>
                  <span className="text-cyan-500/50">{project.percent.toFixed(1)}%</span>
                </div>
                <div className="h-1 bg-[#1f2937] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-500/40 rounded-full"
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
