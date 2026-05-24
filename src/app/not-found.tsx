import Link from 'next/link';
import { Search, Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-[#161616] border border-cyan-500/10 rounded-2xl relative overflow-hidden text-center">
        {/* Decorative Grid */}
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Search size={40} className="text-cyan-500" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2 font-mono uppercase tracking-tighter">
            404: Node Not Found
          </h2>
          <p className="text-gray-500 text-sm mb-8 font-mono leading-relaxed">
            The requested address does not exist in the system directory. 
            It might have been moved or initialized in a different segment.
          </p>
          
          <Link
            href="/"
            className="group flex items-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded-lg transition-all hover:bg-gray-200"
          >
            <Home size={18} />
            Back to Base
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
