'use client';

import { useEffect } from 'react';
import { RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('System Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#f0ede6] text-[#1a1410] flex flex-col items-center justify-center px-4">
      <div className="font-mono text-[11px] text-[#bf5030] tracking-widest uppercase mb-4">
        system fault detected
      </div>
      <h2
        className="font-[family-name:var(--font-rajdhani)] font-bold text-[clamp(2rem,8vw,4rem)] leading-none mb-4 text-center"
        style={{ letterSpacing: '-0.02em' }}
      >
        SOMETHING BROKE
      </h2>
      <p className="font-mono text-[12px] text-[#7a6e64] leading-relaxed max-w-sm text-center mb-8">
        Unexpected error in the pipeline. Code:{' '}
        <span className="text-[#bf5030]">{error.digest || 'UNKNOWN_ERR'}</span>
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => reset()}
          className="group flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#1a1410] border border-[#bf5030]/40 bg-[#bf5030]/10 px-5 py-3 hover:border-[#bf5030] hover:text-[#bf5030] transition-all"
        >
          <RefreshCcw size={13} />
          reboot system
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#7a6e64] border border-[#1a1410]/20 px-5 py-3 hover:border-[#1a1410] hover:text-[#1a1410] transition-all"
        >
          <Home size={13} />
          return home
        </Link>
      </div>
    </div>
  );
}
