'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import { Activity, Zap } from 'lucide-react';

interface Metric {
  name: string;
  value: number;
  unit: string;
  rating: 'good' | 'needs-improvement' | 'poor';
  goodThreshold: number;
  poorThreshold: number;
}

const ratingColor = {
  good: 'text-green-400',
  'needs-improvement': 'text-yellow-400',
  poor: 'text-red-400',
};

const ratingBg = {
  good: 'bg-green-400',
  'needs-improvement': 'bg-yellow-400',
  poor: 'bg-red-400',
};

export default function WebVitals() {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    const collected: Metric[] = [];

    const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
      const thresholds: Record<string, [number, number]> = {
        LCP: [2500, 4000],
        FCP: [1800, 3000],
        TTFB: [800, 1800],
        CLS: [0.1, 0.25],
        INP: [200, 500],
      };
      const [good, poor] = thresholds[name] || [0, Infinity];
      if (value <= good) return 'good';
      if (value <= poor) return 'needs-improvement';
      return 'poor';
    };

    const handleMetric = ({ name, value }: { name: string; value: number }) => {
      const isMilliseconds = name !== 'CLS';
      const displayValue = isMilliseconds ? Math.round(value) : value;
      const unit = isMilliseconds ? 'ms' : '';

      const rating = getRating(name, value);
      const thresholds: Record<string, [number, number]> = {
        LCP: [2500, 4000],
        FCP: [1800, 3000],
        TTFB: [800, 1800],
        CLS: [0.1, 0.25],
        INP: [200, 500],
      };
      const [g, p] = thresholds[name] || [0, Infinity];

      setMetrics((prev) => {
        const filtered = prev.filter((m) => m.name !== name);
        return [
          ...filtered,
          {
            name,
            value: displayValue,
            unit,
            rating,
            goodThreshold: g,
            poorThreshold: p,
          },
        ];
      });

      // Post to Supabase
      collected.push({ name, value: displayValue, unit, rating, goodThreshold: g, poorThreshold: p });
      fetch('/api/vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metric: name, value: displayValue }),
      }).catch(() => {});
    };

    import('web-vitals').then(({ onLCP, onFCP, onTTFB, onCLS, onINP }) => {
      onLCP(handleMetric);
      onFCP(handleMetric);
      onTTFB(handleMetric);
      onCLS(handleMetric);
      onINP(handleMetric);
    });
  }, []);

  return (
    <Card>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-blue-400" />
          <h3 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">
            System Health
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
           <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
           <span className="text-[10px] font-mono text-gray-600 uppercase">Live</span>
        </div>
      </div>

      {metrics.length === 0 ? (
        <div className="text-center py-10">
          <Zap size={24} className="text-gray-800 mx-auto mb-3 animate-pulse" />
          <p className="text-gray-600 text-[11px] font-mono uppercase tracking-tighter">
            Waiting for data...
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {metrics.map((m) => {
            const pct = Math.min((m.value / m.poorThreshold) * 100, 100);

            return (
              <div key={m.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex flex-col">
                    <span className="text-xs font-mono text-gray-300">{m.name}</span>
                    <span className="text-[9px] font-mono text-gray-600 uppercase mt-0.5">{m.rating.replace('-', ' ')}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-bold font-mono ${ratingColor[m.rating]}`}>
                      {m.value}
                    </span>
                    <span className="text-[10px] text-gray-600 font-mono ml-1">{m.unit}</span>
                  </div>
                </div>
                <div className="h-1 bg-[#1f2937] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${ratingBg[m.rating]} opacity-40 transition-all duration-700 ease-out`}
                    style={{ width: `${Math.max(pct, 5)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      <div className="mt-8 pt-6 border-t border-white/[0.03]">
        <p className="text-[9px] text-gray-700 font-mono leading-relaxed">
          METRICS COLLECTED VIA WEB-VITALS API. DATA PERSISTED FOR PERFORMANCE AUDITING.
        </p>
      </div>
    </Card>
  );
}
