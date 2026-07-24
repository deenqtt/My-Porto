import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Lock } from 'lucide-react';
import { projects, layerColor, getProject } from '@/data/projects';
import { TechChips, ProjectLinks, ProjectDiagram } from '@/components/project-bits';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  if (!p) return { title: 'Project not found — Deden Hidayat' };
  return {
    title: `${p.title} — Deden Hidayat`,
    description: p.impact,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: `${p.title} — Deden Hidayat`, description: p.impact, url: `/work/${p.slug}` },
  };
}

export default function WorkDetail({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();

  const color = layerColor[p.layer] ?? '#bf5030';

  return (
    <div className="min-h-screen bg-[#f0ede6] text-[#1a1410]">
      <div className="max-w-3xl mx-auto px-4 sm:px-10 py-14 sm:py-20">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#7a6e64] hover:text-[#bf5030] transition-colors mb-12"
        >
          <ArrowLeft size={13} />
          back to work
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[10px] text-[#7a6e64]/50">{p.n}</span>
          <span
            className="font-mono text-[10px] tracking-widest uppercase px-1.5 py-0.5 border"
            style={{ color, borderColor: `${color}40`, background: `${color}10` }}
          >
            {p.layer}
          </span>
          {p.status === 'private' && (
            <span className="inline-flex items-center gap-1 font-mono text-[9px] tracking-widest uppercase text-[#7a6e64]">
              <Lock size={9} /> private · commercial
            </span>
          )}
          {p.status === 'live' && (
            <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase text-[#3d6b5a]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3d6b5a] animate-pulse" /> live
            </span>
          )}
        </div>

        <h1
          className="font-[family-name:var(--font-rajdhani)] font-bold text-[clamp(2.25rem,8vw,4rem)] leading-[0.95] text-[#1a1410] mb-6"
          style={{ letterSpacing: '-0.02em' }}
        >
          {p.title}
        </h1>

        <p className="font-[family-name:var(--font-outfit)] text-[#3d2e28] text-base sm:text-lg leading-[1.7] font-medium max-w-2xl mb-10">
          {p.impact}
        </p>

        {p.diagram && (
          <div className="mb-10 max-w-2xl">
            <ProjectDiagram id={p.diagram} />
          </div>
        )}

        <div className="grid sm:grid-cols-[1fr_240px] gap-8 sm:gap-12">
          <div className="min-w-0">
            <SectionTitle>overview</SectionTitle>
            <p className="font-[family-name:var(--font-outfit)] text-[#7a6e64] text-sm leading-[1.85] mb-8">{p.blurb}</p>

            {p.hard && (
              <>
                <SectionTitle>the hard part</SectionTitle>
                <p className="font-[family-name:var(--font-outfit)] text-[#7a6e64] text-sm leading-[1.85] mb-8">{p.hard}</p>
              </>
            )}

            {p.role && (
              <>
                <SectionTitle>my role</SectionTitle>
                <p className="font-[family-name:var(--font-outfit)] text-[#7a6e64] text-sm leading-[1.85] mb-8">{p.role}</p>
              </>
            )}
          </div>

          <aside className="min-w-0">
            <SectionTitle>stack</SectionTitle>
            <div className="mb-8">
              <TechChips tech={p.tech} />
            </div>

            <SectionTitle>links</SectionTitle>
            {p.demo || p.repo ? (
              <ProjectLinks p={p} />
            ) : (
              <p className="font-mono text-[10px] text-[#7a6e64]/70 leading-relaxed">
                Private / commercial — source not public. Happy to walk through the architecture on request.
              </p>
            )}
          </aside>
        </div>

        <div className="mt-16 pt-8 border-t border-[#1a1410]/8">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#bf5030] hover:text-[#1a1410] transition-colors"
          >
            got a similar problem? let&apos;s talk →
          </Link>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#bf5030]/70 mb-3">{children}</div>
  );
}
