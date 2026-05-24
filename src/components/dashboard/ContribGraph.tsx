'use client';

import { ContributionDay } from '@/types';
import Card from '@/components/ui/Card';

interface Props {
  contributions: ContributionDay[];
  totalContributions?: number;
}

const levelColors = [
  'bg-[#161616] border border-[#1f2937]',
  'bg-cyan-900/30',
  'bg-cyan-700/40',
  'bg-cyan-500/50',
  'bg-cyan-400/80',
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function ContribGraph({ contributions, totalContributions }: Props) {
  if (contributions.length === 0) {
    return (
      <Card>
        <h3 className="text-[10px] font-mono text-gray-500 mb-6 uppercase tracking-[0.2em]">
          Source Commit History
        </h3>
        <p className="text-gray-600 text-xs text-center py-6 font-mono">
          NO DATA STREAM AVAILABLE
        </p>
      </Card>
    );
  }

  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  const displayTotal = totalContributions ?? contributions.reduce((sum, d) => sum + d.count, 0);

  const monthLabels: { month: string; weekIndex: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const firstDay = week[0];
    if (!firstDay) return;
    const month = new Date(firstDay.date).getMonth();
    if (month !== lastMonth) {
      monthLabels.push({ month: MONTHS[month], weekIndex: wi });
      lastMonth = month;
    }
  });

  return (
    <Card>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">
          Source Commit History
        </h3>
        <span className="text-[10px] text-gray-600 font-mono bg-white/5 px-2 py-0.5 rounded">
          {displayTotal.toLocaleString()} TOTAL EVENTS
        </span>
      </div>

      <div className="overflow-x-auto pb-4 scrollbar-hide">
        <div style={{ minWidth: `${weeks.length * 13}px` }}>
          {/* Month labels */}
          <div className="flex mb-3" style={{ paddingLeft: '28px' }}>
            {weeks.map((_, wi) => {
              const label = monthLabels.find((m) => m.weekIndex === wi);
              return (
                <div
                  key={wi}
                  className="shrink-0 text-[9px] text-gray-600 font-mono uppercase tracking-tighter"
                  style={{ width: '12px', marginRight: '1px' }}
                >
                  {label ? label.month : ''}
                </div>
              );
            })}
          </div>

          {/* Grid with day labels */}
          <div className="flex">
            {/* Day labels */}
            <div className="flex flex-col gap-[1px] mr-3 shrink-0">
              {[0, 1, 2, 3, 4, 5, 6].map((d) => (
                <div
                  key={d}
                  className="text-[9px] text-gray-700 font-mono leading-none flex items-center h-[11px] uppercase"
                >
                  {d % 2 === 1 ? DAYS[d].slice(0, 1) : ''}
                </div>
              ))}
            </div>

            {/* Contribution cells */}
            <div className="flex gap-[1px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[1px]">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      title={`${day.date}: ${day.count} events`}
                      className={`w-[11px] h-[11px] rounded-[1px] cursor-crosshair transition-all hover:scale-125 hover:z-10 ${levelColors[day.level]}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-6 justify-start border-t border-white/[0.03] pt-4">
        <span className="text-[9px] text-gray-700 font-mono uppercase">Activity Density</span>
        <div className="flex gap-1">
          {levelColors.map((cls, i) => (
            <div key={i} className={`w-[10px] h-[10px] rounded-[1px] ${cls}`} />
          ))}
        </div>
      </div>
    </Card>
  );
}
