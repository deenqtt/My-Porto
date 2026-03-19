'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import { Activity } from 'lucide-react';

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
      <div className="flex items-center gap-2 mb-4">
        <Activity size={16} className="text-cyan-400" />
        <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wider">
          Web Vitals (live)
        </h3>
      </div>

      {metrics.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-6">
          Collecting metrics... browse the site
        </p>
      ) : (
        <div className="space-y-4">
          {metrics.map((m) => {
            const pct =
              m.name === 'CLS'
                ? Math.min((m.value / m.poorThreshold) * 100, 100)
                : Math.min((m.value / m.poorThreshold) * 100, 100);

            return (
              <div key={m.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-mono text-gray-300">{m.name}</span>
                  <span className={`text-sm font-bold font-mono ${ratingColor[m.rating]}`}>
                    {m.value}
                    {m.unit}
                  </span>
                </div>
                <div className="h-1.5 bg-[#1f2937] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${ratingBg[m.rating]} transition-all duration-500`}
                    style={{ width: `${Math.max(pct, 3)}%` }}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-1 capitalize">{m.rating.replace('-', ' ')}</div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
