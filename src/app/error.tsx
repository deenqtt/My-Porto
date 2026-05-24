'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
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
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-[#161616] border border-red-500/20 rounded-2xl relative overflow-hidden">
        {/* Error Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 mb-6">
            <AlertTriangle size={32} className="text-red-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2 font-mono uppercase tracking-tight">
            System Fault Detected
          </h2>
          <p className="text-gray-500 text-sm mb-8 font-mono">
            An unexpected error occurred in the telemetry pipeline. 
            Code: <span className="text-red-400">{error.digest || 'UNKNOWN_ERR'}</span>
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="flex items-center gap-2 px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all"
            >
              <RefreshCcw size={18} />
              Reboot System
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-2.5 bg-[#1f2937] hover:bg-[#374151] text-gray-300 font-semibold rounded-lg transition-all"
            >
              <Home size={18} />
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
