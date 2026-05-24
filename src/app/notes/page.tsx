import { notes } from '@/data/notes';
import Link from 'next/link';
import { Book, Clock, ChevronRight, Hash } from 'lucide-react';

export default function NotesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-4 text-cyan-500 font-mono text-xs uppercase tracking-[0.3em]">
            <Book size={14} />
            System Documentation / Knowledge Hub
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Engineering <span className="text-gradient">Notes</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
            A collection of technical deep-dives, architectural explorations, and field notes 
            from various engineering experiments.
          </p>
        </div>

        {/* Notes Grid/List */}
        <div className="space-y-4">
          {notes.map((note) => (
            <Link
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="group block p-6 bg-[#161616] border border-[#1f2937] rounded-2xl hover:border-cyan-500/40 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono uppercase tracking-wider">
                    {note.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-gray-600 text-xs font-mono uppercase">
                    <Clock size={12} />
                    {new Date(note.date).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {note.tags.map(tag => (
                    <span key={tag} className="text-[10px] text-gray-500 font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {note.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {note.summary}
              </p>

              <div className="flex items-center gap-2 text-xs font-mono text-cyan-500/70 group-hover:text-cyan-400 transition-colors">
                READ_FULL_LOG
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {notes.length === 0 && (
          <div className="text-center py-24 border border-dashed border-[#1f2937] rounded-3xl">
             <p className="text-gray-600 font-mono uppercase text-xs tracking-widest">
               Directory empty. More logs coming soon.
             </p>
          </div>
        )}

      </div>
    </div>
  );
}
