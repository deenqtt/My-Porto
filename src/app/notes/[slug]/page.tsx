import { notes } from '@/data/notes';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Tag, Share2 } from 'lucide-react';

export async function generateStaticParams() {
  return notes.map((note) => ({
    slug: note.slug,
  }));
}

export default function NoteDetailPage({ params }: { params: { slug: string } }) {
  const note = notes.find((n) => n.slug === params.slug);

  if (!note) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 font-sans">
      <div className="max-w-3xl mx-auto px-4">
        
        {/* Navigation / Breadcrumb */}
        <Link 
          href="/notes"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-400 transition-colors mb-12 group font-mono"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          BASE / NOTES / {note.slug.toUpperCase()}
        </Link>

        {/* Note Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono uppercase tracking-widest">
              {note.category}
            </span>
            <div className="flex items-center gap-1.5 text-gray-600 text-xs font-mono uppercase">
              <Clock size={12} />
              Last Updated: {new Date(note.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
            {note.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {note.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-500 text-[10px] font-mono uppercase">
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Content Area */}
        <article className="prose prose-invert prose-cyan max-w-none">
          <div 
            className="text-gray-400 leading-relaxed space-y-6 text-lg whitespace-pre-wrap font-sans"
            style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}
          >
            {note.content.trim()}
          </div>
        </article>

        {/* Footer / Meta */}
        <footer className="mt-20 pt-10 border-t border-[#1f2937] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="text-xs text-gray-600 font-mono uppercase tracking-widest">
            End of technical log // Node: {note.slug}
          </div>
          <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-cyan-400 transition-colors font-mono">
            <Share2 size={14} />
            SHARE_RESOURCE
          </button>
        </footer>

      </div>
    </main>
  );
}
