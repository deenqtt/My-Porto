import Link from 'next/link';
import { Home, ArrowUpRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f0ede6] text-[#1a1410] flex flex-col items-center justify-center px-4">
      <div className="font-mono text-[11px] text-[#bf5030] tracking-widest uppercase mb-4">
        error 404
      </div>
      <h2
        className="font-[family-name:var(--font-rajdhani)] font-bold text-[clamp(2.5rem,10vw,5rem)] leading-none mb-4 text-center"
        style={{ letterSpacing: '-0.02em' }}
      >
        NODE NOT FOUND
      </h2>
      <p className="font-mono text-[12px] text-[#7a6e64] leading-relaxed max-w-sm text-center mb-8">
        Requested address not in system directory. May have moved or initialized in a different
        segment.
      </p>
      <Link
        href="/"
        className="group flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#1a1410] border border-[#1a1410]/20 px-5 py-3 hover:border-[#bf5030] hover:text-[#bf5030] transition-all"
      >
        <Home size={13} />
        back to base
        <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </Link>
    </div>
  );
}
