'use client';

import { ContributionDay } from '@/types';
import Card from '@/components/ui/Card';

interface Props {
  contributions: ContributionDay[];
  totalContributions?: number;
}

const levelColors = [
  'bg-[#161616] border border-[#1f2937]',
  'bg-cyan-900/50',
  'bg-cyan-700/60',
  'bg-cyan-500/75',
  'bg-cyan-400',
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function ContribGraph({ contributions, totalContributions }: Props) {
  if (contributions.length === 0) {
    return (
      <Card>
        <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wider mb-4">
          Contribution Activity
        </h3>
        <p className="text-gray-600 text-sm text-center py-6">
          No contribution data available
        </p>
      </Card>
    );
  }

  // Group into weeks (each week = 7 days, Sun→Sat)
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  const displayTotal = totalContributions ?? contributions.reduce((sum, d) => sum + d.count, 0);

  // Build month labels — track which week each month starts
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
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wider">
          Contribution Activity
        </h3>
        <span className="text-xs text-gray-500 font-mono">
          {displayTotal} contributions · last year
        </span>
      </div>

      <div className="overflow-x-auto pb-1">
        <div style={{ minWidth: `${weeks.length * 13}px` }}>
          {/* Month labels */}
          <div className="flex mb-1.5" style={{ paddingLeft: '28px' }}>
            {weeks.map((_, wi) => {
              const label = monthLabels.find((m) => m.weekIndex === wi);
              return (
                <div
                  key={wi}
                  className="shrink-0 text-[10px] text-gray-500"
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
            <div className="flex flex-col gap-[1px] mr-1.5 shrink-0">
              {[0, 1, 2, 3, 4, 5, 6].map((d) => (
                <div
                  key={d}
                  className="text-[10px] text-gray-600 leading-none flex items-center"
                  style={{ height: '11px' }}
                >
                  {d % 2 === 1 ? DAYS[d].slice(0, 3) : ''}
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
                      title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                      className={`w-[11px] h-[11px] rounded-sm cursor-default transition-opacity hover:opacity-80 ${levelColors[day.level]}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-4 justify-end">
        <span className="text-[10px] text-gray-600">Less</span>
        {levelColors.map((cls, i) => (
          <div key={i} className={`w-[11px] h-[11px] rounded-sm ${cls}`} />
        ))}
        <span className="text-[10px] text-gray-600">More</span>
      </div>
    </Card>
  );
}
