'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Github, Mail, Linkedin, ArrowUpRight, Terminal, Download, Menu, X, Send, Check, Loader2 } from 'lucide-react';
import { projects, layerColor, type Proj } from '@/data/projects';
import { StatusBadge } from '@/components/project-bits';

// ─── Scramble text ────────────────────────────────────────────────────────────

const CHARS = 'ABCDEFabcdef0123456789!@#$%';

function useScramble(target: string, trigger: boolean) {
  const [text, setText] = useState(target);
  const raf = useRef(0);

  useEffect(() => {
    if (!trigger) {
      setText(target);
      return;
    }
    let iter = 0;
    const tick = () => {
      setText(
        target
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' ';
            if (i < iter) return target[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );
      iter += 0.5;
      if (iter < target.length) raf.current = requestAnimationFrame(tick);
      else setText(target);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [trigger, target]);

  return text;
}

function Scramble({ children, className = '' }: { children: string; className?: string }) {
  const [on, setOn] = useState(false);
  const t = useScramble(children, on);
  return (
    <span className={className} onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}>
      {t}
    </span>
  );
}

// ─── Typed text ───────────────────────────────────────────────────────────────

function Typed({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const [shown, setShown] = useState('');
  useEffect(() => {
    const t0 = setTimeout(() => {
      let i = 0;
      const id = setInterval(() => {
        setShown(text.slice(0, ++i));
        if (i >= text.length) clearInterval(id);
      }, 22);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(t0);
  }, [text, delay]);
  return (
    <span className={className}>
      {shown}
      {shown.length < text.length && <span className="animate-pulse text-[#bf5030]">▋</span>}
    </span>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-16 min-w-0">
      <span className="font-mono text-[10px] text-[#7a6e64] tracking-[0.2em] sm:tracking-[0.3em] uppercase whitespace-nowrap shrink-0">
        {index} &nbsp;/&nbsp; {label}
      </span>
      <div className="min-w-8 flex-1 h-px bg-[#1a1410]/10" />
    </div>
  );
}

// ─── Noise ────────────────────────────────────────────────────────────────────

function Noise() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.018]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '120px',
        mixBlendMode: 'multiply',
      }}
    />
  );
}

// ─── Cursor spotlight ─────────────────────────────────────────────────────────

function CursorSpot() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current) ref.current.style.transform = `translate(${e.clientX - 200}px,${e.clientY - 200}px)`;
    };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full z-0"
      style={{
        background: 'radial-gradient(circle, rgba(191,80,48,0.07) 0%, transparent 65%)',
        transition: 'transform 0.12s ease-out',
        willChange: 'transform',
      }}
    />
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

const navItems: [string, string][] = [
  ['work', '#projects'],
  ['stack', '#stack'],
  ['exp', '#experience'],
  ['contact', '#contact'],
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || open ? 'border-b border-[#1a1410]/8 bg-[#f0ede6]/90 backdrop-blur-sm' : ''
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-10 h-14 flex items-center justify-between">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="font-mono text-[10px] sm:text-[11px] text-[#7a6e64] tracking-widest min-w-0 truncate"
        >
          deden@sys:~$
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(([l, h]) => (
            <a
              key={l}
              href={h}
              className="font-mono text-[11px] text-[#7a6e64] hover:text-[#1a1410] transition-colors tracking-widest uppercase"
            >
              {l}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download
            className="font-mono text-[11px] text-[#bf5030] hover:text-[#1a1410] transition-colors tracking-widest uppercase border border-[#bf5030]/30 px-2.5 py-1"
          >
            cv
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
          className="md:hidden inline-flex h-10 w-10 shrink-0 items-center justify-center border border-[#1a1410]/15 text-[#7a6e64] transition-colors hover:border-[#bf5030]/40 hover:text-[#bf5030]"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t border-[#1a1410]/8 bg-[#f0ede6]/95 px-4 py-3 shadow-[0_18px_40px_rgba(26,20,16,0.08)] backdrop-blur-sm"
        >
          <div className="max-w-5xl mx-auto grid grid-cols-2 gap-2">
            {navItems.map(([l, h]) => (
              <a
                key={l}
                href={h}
                onClick={() => setOpen(false)}
                className="font-mono text-[11px] text-[#7a6e64] hover:text-[#1a1410] transition-colors tracking-widest uppercase border border-[#1a1410]/10 px-3 py-3"
              >
                {l}
              </a>
            ))}
            <a
              href="/resume.pdf"
              download
              onClick={() => setOpen(false)}
              className="col-span-2 font-mono text-[11px] text-[#bf5030] hover:text-[#1a1410] transition-colors tracking-widest uppercase border border-[#bf5030]/30 px-3 py-3"
            >
              cv
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

// NOTE: every stat is backed by what's shown on this page — safe to be counted.
const heroStats: [string, string][] = [
  ['11', 'protocols served'],
  ['6', 'production systems'],
  ['5', 'layers (hw → ml)'],
  ['3+', 'live deployments'],
];

const recruiterSnapshot: [string, string][] = [
  ['role', 'Full-Stack Software Engineer'],
  ['focus', 'Industrial IoT / Realtime Systems'],
  ['stack', 'Next.js · Python · MQTT'],
  ['status', 'Open to Remote / Freelance'],
];

function Hero() {
  return (
    <section className="relative min-h-[92svh] sm:min-h-screen flex flex-col justify-center px-4 sm:px-10 pt-20 pb-14 max-w-5xl mx-auto">
      <div className="mb-4 sm:mb-5">
        <span className="font-mono text-[11px] text-[#7a6e64]">
          <Typed text="// initializing portfolio.exe" delay={300} />
        </span>
      </div>

      <div className="mb-5 sm:mb-6">
        <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.25em] text-[#bf5030] uppercase mb-4 max-w-[22rem] sm:max-w-none leading-relaxed">
          Software Engineer — IoT · Industrial Protocols · Fullstack
        </p>
        <h1 className="font-[family-name:var(--font-rajdhani)] font-bold leading-[0.88] text-[#1a1410]" style={{ letterSpacing: '-0.02em' }}>
          <span className="block text-[clamp(3rem,17vw,8rem)] sm:text-[clamp(3.5rem,12vw,8rem)]">DEDEN</span>
          <span className="block text-[clamp(3rem,17vw,8rem)] sm:text-[clamp(3.5rem,12vw,8rem)] text-[#bf5030]">HIDAYAT</span>
        </h1>
      </div>

      <div className="mt-6 sm:mt-8 max-w-[460px]">
        <p className="font-[family-name:var(--font-outfit)] text-[#7a6e64] text-sm leading-[1.85]">
          I build systems that bridge factory-floor hardware and the cloud. Polling industrial
          protocols, piping telemetry over MQTT, then surfacing it on Next.js control centers.
          Firmware → middleware → API → frontend. The whole chain.
        </p>
      </div>

      <div
        aria-label="Recruiter Snapshot"
        className="mt-8 grid max-w-3xl grid-cols-1 border border-[#1a1410]/10 bg-[#1a1410]/[0.03] min-[480px]:grid-cols-2 lg:grid-cols-4"
      >
        {recruiterSnapshot.map(([label, value], index) => (
          <div
            key={label}
            className={`min-w-0 border-[#1a1410]/10 bg-[#f0ede6]/80 px-4 py-3 ${
              index < recruiterSnapshot.length - 1 ? 'border-b' : ''
            } ${index % 2 === 0 ? 'min-[480px]:border-r' : ''} ${
              index < 2 ? 'min-[480px]:border-b' : 'min-[480px]:border-b-0'
            } ${index < recruiterSnapshot.length - 1 ? 'lg:border-r' : 'lg:border-r-0'} lg:border-b-0`}
          >
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#bf5030]/70">{label}</div>
            <div className="mt-1 font-mono text-[10px] leading-relaxed text-[#3d2e28]">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-6">
        <a
          href="#projects"
          className="group flex w-full sm:w-auto items-center justify-center gap-2 font-mono text-[11px] tracking-widest text-[#1a1410] uppercase border border-[#1a1410]/20 px-5 py-3 hover:border-[#bf5030] hover:text-[#bf5030] transition-all"
        >
          see the work
          <ArrowUpRight
            size={11}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </a>
        <a
          href="mailto:dedenh842@gmail.com"
          className="font-mono text-[11px] tracking-widest text-[#7a6e64] hover:text-[#1a1410] transition-colors uppercase break-all"
        >
          dedenh842@gmail.com
        </a>
      </div>

      <div className="mt-12 sm:mt-20 grid grid-cols-2 gap-x-6 gap-y-6 sm:flex sm:flex-wrap sm:items-end sm:gap-10">
        {heroStats.map(([num, label]) => (
          <div key={label}>
            <div className="font-[family-name:var(--font-rajdhani)] font-bold text-2xl text-[#1a1410]">{num}</div>
            <div className="font-mono text-[10px] text-[#7a6e64] tracking-widest mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 right-10 hidden md:flex flex-col items-end gap-1">
        <span className="font-mono text-[9px] text-[#1a1410]/15 tracking-widest uppercase">scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#1a1410]/15 to-transparent" />
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

const quickFacts: [string, string][] = [
  ['role', 'R&D @ PT GSPE'],
  ['based', 'Jakarta Barat, ID · UTC+7'],
  ['very into', 'making hw talk to sw'],
  ['protocols', 'Modbus, BACnet, SNMP, OPC-UA'],
  ['backend', 'Python, Flask, Node'],
  ['frontend', 'Next.js / React — ship it'],
  ['started on', 'panel schematics & PCB'],
];

function About() {
  return (
    <section className="py-16 sm:py-28 px-4 sm:px-10 max-w-5xl mx-auto border-t border-[#1a1410]/8">
      <SectionLabel index="01" label="who" />
      <div className="grid md:grid-cols-[1fr_300px] gap-10 md:gap-16">
        <div>
          <p className="font-[family-name:var(--font-outfit)] text-[#3d2e28] text-[15px] sm:text-base leading-[1.85] sm:leading-[1.9] mb-5">
            I&apos;m a software engineer who lives where hardware meets the cloud. Started with
            industrial-electronics foundations at SMK Negeri Jawa Tengah (2023) — panel schematics and
            PCB design — which gave me the structural logic for complex systems. Now in R&amp;D, I architect
            middleware for 10+ industrial protocols and the dashboards that make their data useful.
          </p>
          <p className="font-[family-name:var(--font-outfit)] text-[#7a6e64] text-sm leading-[1.85]">
            The thing I actually care about: systems that work outside the lab. In the factory. On the
            data-center floor. I&apos;ve wired the panels and shipped the dashboards, so I know what that
            means for design decisions.
          </p>
        </div>

        <div className="bg-[#e8e4db] border border-[#1a1410]/8 p-4 sm:p-5 min-w-0">
          <div className="font-mono text-[10px] text-[#bf5030]/70 tracking-widest mb-4 flex items-center gap-2">
            <Terminal size={10} /> quick_facts
          </div>
          {quickFacts.map(([k, v]) => (
            <div
              key={k}
              className="grid grid-cols-[5.75rem_1fr] gap-3 py-1.5 border-b border-[#1a1410]/6 last:border-0 text-xs min-w-0"
            >
              <span className="font-mono text-[#bf5030]/60">{k}</span>
              <span className="font-mono text-[#3d2e28]/70 min-w-0 break-words">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function FeaturedCard({ p }: { p: Proj }) {
  const color = layerColor[p.layer] ?? '#bf5030';
  return (
    <Link
      href={`/work/${p.slug}`}
      className="group flex flex-col border border-[#1a1410]/10 bg-[#f0ede6] p-5 sm:p-6 transition-colors hover:border-[#bf5030]/40 min-w-0"
      style={{ borderTopColor: color, borderTopWidth: 2 }}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="font-mono text-[10px] text-[#7a6e64]/50">{p.n}</span>
        <StatusBadge status={p.status} />
      </div>
      <Scramble className="font-[family-name:var(--font-rajdhani)] font-bold text-xl sm:text-2xl leading-tight text-[#1a1410] group-hover:text-[#bf5030] transition-colors">
        {p.title}
      </Scramble>
      <span
        className="mt-2 self-start font-mono text-[10px] tracking-widest uppercase px-1.5 py-0.5 border"
        style={{ color, borderColor: `${color}40`, background: `${color}10` }}
      >
        {p.layer}
      </span>
      <p className="mt-4 font-[family-name:var(--font-outfit)] text-[#3d2e28] text-[13px] sm:text-sm leading-[1.7] font-medium">
        {p.impact}
      </p>
      <div className="mt-5 pt-4 border-t border-[#1a1410]/8 flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] tracking-widest uppercase text-[#7a6e64] group-hover:text-[#bf5030] transition-colors inline-flex items-center gap-1">
          view project
          <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
        {p.demo && <span className="font-mono text-[9px] tracking-widest uppercase text-[#bf5030]">live demo</span>}
      </div>
    </Link>
  );
}

function ProjectRow({ p }: { p: Proj }) {
  const color = layerColor[p.layer] ?? '#bf5030';
  return (
    <Link href={`/work/${p.slug}`} className="block border-b border-[#1a1410]/8 group">
      <div className="grid grid-cols-[2rem_1fr] gap-x-3 gap-y-2 py-5 px-1 sm:px-2 hover:bg-[#1a1410]/[0.02] transition-colors sm:flex sm:items-start sm:gap-5">
        <span className="font-mono text-[10px] text-[#7a6e64]/50 pt-1 sm:pt-0.5 w-7 shrink-0">{p.n}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start sm:items-baseline gap-2 sm:gap-3 flex-wrap min-w-0">
            <span className="font-[family-name:var(--font-rajdhani)] font-bold text-lg sm:text-xl leading-tight text-[#1a1410] group-hover:text-[#bf5030] transition-colors">
              {p.title}
            </span>
            <span
              className="font-mono text-[10px] tracking-widest uppercase px-1.5 py-0.5 border break-words"
              style={{ color, borderColor: `${color}40`, background: `${color}10` }}
            >
              {p.layer}
            </span>
          </div>
          <p className="mt-2 font-[family-name:var(--font-outfit)] text-[#7a6e64] text-[13px] leading-[1.7] max-w-2xl">
            {p.impact}
          </p>
        </div>
        <div className="hidden sm:flex flex-col items-end gap-1 shrink-0 pt-0.5">
          <StatusBadge status={p.status} />
          <span className="font-mono text-[10px] text-[#7a6e64]/40 group-hover:text-[#bf5030] transition-colors">→</span>
        </div>
      </div>
    </Link>
  );
}

function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return (
    <section id="projects" className="py-16 sm:py-28 px-4 sm:px-10 max-w-5xl mx-auto border-t border-[#1a1410]/8">
      <SectionLabel index="02" label="selected work" />
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {featured.map((p) => (
          <FeaturedCard key={p.n} p={p} />
        ))}
      </div>
      {rest.length > 0 && (
        <>
          <div className="font-mono text-[10px] text-[#7a6e64]/60 tracking-[0.25em] uppercase mb-2">
            more work
          </div>
          <div className="border-t border-[#1a1410]/8">
            {rest.map((p) => (
              <ProjectRow key={p.n} p={p} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}


// ─── Stack ────────────────────────────────────────────────────────────────────

const stackGroups = [
  { label: 'embedded', items: ['C / C++', 'ESP32', 'Raspberry Pi', 'Arduino', 'PCB Design', 'Panel Wiring'] },
  {
    label: 'protocols',
    items: ['Modbus RTU/TCP', 'BACnet/IP', 'SNMP', 'EtherNet/IP', 'OPC-UA', 'MQTT', 'IEC 61850', 'Sparkplug B'],
  },
  { label: 'backend', items: ['Python', 'Flask', 'Node.js', 'PostgreSQL', 'Prisma', 'Supabase', 'Docker'] },
  { label: 'frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WebSocket', 'Flutter'] },
];

function Stack() {
  return (
    <section id="stack" className="py-16 sm:py-20 px-4 sm:px-10 max-w-5xl mx-auto border-t border-[#1a1410]/8">
      <SectionLabel index="03" label="stack" />
      <div className="grid grid-cols-1 min-[380px]:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
        {stackGroups.map((g) => (
          <div key={g.label} className="min-w-0">
            <div className="font-mono text-[10px] tracking-[0.3em] text-[#bf5030]/70 uppercase mb-4">{g.label}</div>
            <ul className="space-y-2">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="font-mono text-[11px] text-[#7a6e64] hover:text-[#1a1410] transition-colors flex items-start gap-2 break-words"
                >
                  <span className="text-[#bf5030]/30 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────

// NOTE: verify dates/titles against your real record before publishing.
const exps = [
  {
    period: '2023 — now',
    role: 'R&D Engineer',
    co: 'PT GSPE',
    note: 'Built a protocol gateway that serves 11 industrial protocols from one source, shipped a fleet OTA control plane with staged rollout + auto-rollback, and designed access-control hardware end to end (PCB → firmware → software). Also delivered the SMARTRACK DCIM control center.',
    tags: ['Python', 'C/C++', 'MQTT', 'Modbus', 'Next.js', 'Docker'],
  },
  {
    period: '2024 — now',
    role: 'Freelance / Independent',
    co: 'Self',
    note: 'Deployed IoT + web systems for clients — dashboards, protocol bridges, and an on-prem AI vision monitor running across production machines. First client 2024.',
    tags: ['IoT', 'Next.js', 'Python', 'AI'],
  },
  {
    period: '2020 — 2023',
    role: 'Teknik Elektronika Industri (SMK)',
    co: 'SMK Negeri Jawa Tengah',
    note: 'Industrial electronics — panel schematics, PCB design, and microcontrollers. The structural logic behind how I approach hardware-software systems today.',
    tags: ['PCB Design', 'Panel Wiring', 'C++', 'Electronics'],
  },
];

function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-28 px-4 sm:px-10 max-w-5xl mx-auto border-t border-[#1a1410]/8">
      <SectionLabel index="04" label="experience" />
      <div className="space-y-10 sm:space-y-12">
        {exps.map((e, i) => (
          <div key={i} className="grid sm:grid-cols-[150px_1fr] gap-4 sm:gap-10">
            <div className="font-mono text-[11px] text-[#7a6e64] tracking-wider pt-0.5">{e.period}</div>
            <div>
              <div className="flex items-baseline gap-3 flex-wrap mb-1">
                <span className="font-[family-name:var(--font-rajdhani)] font-bold text-lg text-[#1a1410]">{e.role}</span>
                <span className="font-mono text-[11px] text-[#bf5030]/70">@ {e.co}</span>
              </div>
              <p className="font-[family-name:var(--font-outfit)] text-[#7a6e64] text-sm leading-[1.8] mb-3 max-w-xl">{e.note}</p>
              <div className="flex flex-wrap gap-2">
                {e.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-2 py-0.5 text-[#7a6e64] bg-[#1a1410]/[0.04] border border-[#1a1410]/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

type FormState = 'idle' | 'sending' | 'sent' | 'error';

const inputCls =
  'w-full bg-[#f0ede6] border border-[#1a1410]/12 px-3 py-2.5 font-mono text-[12px] text-[#1a1410] placeholder:text-[#7a6e64]/50 focus:border-[#bf5030] focus:outline-none transition-colors';

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [state, setState] = useState<FormState>('idle');
  const [error, setError] = useState('');

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? 'Failed to send message.');
        setState('error');
        return;
      }
      setState('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setError('Network error. Try again.');
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div className="bg-[#e8e4db] border border-[#1a1410]/8 p-6 flex flex-col items-start gap-3 min-w-0">
        <div className="flex items-center gap-2 text-[#3d6b5a]">
          <Check size={16} />
          <span className="font-mono text-[12px] tracking-wider uppercase">message sent</span>
        </div>
        <p className="font-mono text-[11px] text-[#7a6e64] leading-relaxed">
          Thanks — landed in my inbox. I&apos;ll reply to {form.email || 'your email'} soon.
        </p>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="font-mono text-[10px] tracking-widest uppercase text-[#bf5030] hover:text-[#1a1410] transition-colors"
        >
          send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-[#e8e4db] border border-[#1a1410]/8 p-4 sm:p-6 space-y-4 min-w-0"
    >
      <div className="font-mono text-[10px] text-[#bf5030]/70 tracking-widest uppercase flex items-center gap-2">
        <Terminal size={10} /> send_message
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          aria-label="Your name"
          className={inputCls}
          placeholder="name"
          value={form.name}
          onChange={set('name')}
          maxLength={100}
          required
        />
        <input
          aria-label="Your email"
          type="email"
          className={inputCls}
          placeholder="email"
          value={form.email}
          onChange={set('email')}
          maxLength={200}
          required
        />
      </div>
      <input
        aria-label="Subject"
        className={inputCls}
        placeholder="subject"
        value={form.subject}
        onChange={set('subject')}
        maxLength={200}
        required
      />
      <textarea
        aria-label="Message"
        className={`${inputCls} resize-none`}
        placeholder="message"
        rows={5}
        value={form.message}
        onChange={set('message')}
        maxLength={2000}
        required
      />
      {state === 'error' && (
        <p className="font-mono text-[11px] text-[#bf5030] break-words">{error}</p>
      )}
      <button
        type="submit"
        disabled={state === 'sending'}
        className="group flex items-center justify-center gap-2 w-full font-mono text-[11px] tracking-widest uppercase text-[#1a1410] border border-[#bf5030]/40 bg-[#bf5030]/10 px-5 py-3 hover:border-[#bf5030] hover:text-[#bf5030] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state === 'sending' ? (
          <>
            <Loader2 size={12} className="animate-spin" /> sending
          </>
        ) : (
          <>
            send message <Send size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-28 px-4 sm:px-10 max-w-5xl mx-auto border-t border-[#1a1410]/8">
      <SectionLabel index="05" label="contact" />
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        <div className="min-w-0">
          <h2
            className="font-[family-name:var(--font-rajdhani)] font-bold text-[clamp(2.35rem,12vw,4.5rem)] sm:text-[clamp(2.5rem,7vw,4.5rem)] text-[#1a1410] leading-tight mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            GOT A REAL
            <br />
            <span className="text-[#bf5030]">PROBLEM?</span>
          </h2>
          <p className="font-[family-name:var(--font-outfit)] text-[#7a6e64] text-sm leading-[1.85] max-w-sm mb-6">
            Need someone who can walk from the hardware abstraction layer to the user dashboard?
            Industrial protocols, telemetry middleware, control centers — that&apos;s home.
          </p>

          <div className="mb-8 border border-[#1a1410]/10 bg-[#1a1410]/[0.03] p-4 max-w-sm">
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#bf5030]/70 mb-3">
              what i build for you
            </div>
            <ul className="space-y-2">
              {[
                'Industrial protocol middleware & gateways (Modbus, MQTT, BACnet, OPC-UA…)',
                'IoT telemetry pipelines & realtime control dashboards (Next.js)',
                'Firmware + hardware + fullstack — the whole chain, one hand',
              ].map((s) => (
                <li key={s} className="font-mono text-[11px] text-[#3d2e28]/80 leading-relaxed flex items-start gap-2">
                  <span className="text-[#bf5030]/40 shrink-0">—</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            {[
              { icon: <Mail size={13} />, label: 'dedenh842@gmail.com', href: 'mailto:dedenh842@gmail.com', ext: false },
              { icon: <Github size={13} />, label: 'github.com/deenqtt', href: 'https://github.com/deenqtt', ext: true },
              {
                icon: <Linkedin size={13} />,
                label: 'linkedin.com/in/deden-hidayat',
                href: 'https://www.linkedin.com/in/deden-hidayat-a0b08524a/',
                ext: true,
              },
              { icon: <Download size={13} />, label: 'download cv (pdf)', href: '/resume.pdf', ext: false },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.ext ? '_blank' : undefined}
                rel={c.ext ? 'noreferrer' : undefined}
                className="flex items-center gap-3 text-[#7a6e64] hover:text-[#1a1410] transition-colors group"
              >
                <span className="text-[#bf5030]/50 group-hover:text-[#bf5030] transition-colors shrink-0">{c.icon}</span>
                <span className="font-mono text-[11px] min-w-0 break-all">{c.label}</span>
              </a>
            ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-[#1a1410]/8 py-8 px-4 sm:px-10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <span className="font-mono text-[10px] text-[#7a6e64] tracking-widest break-words">DEDEN HIDAYAT · 2026 · JAKARTA</span>
        <span className="font-mono text-[10px] text-[#7a6e64]/50 break-words">built with next.js — real systems, real data</span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3d6b5a] animate-pulse" />
          <span className="font-mono text-[10px] text-[#7a6e64]">sys.status: online</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-[#f0ede6] text-[#1a1410]" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
      <Noise />
      <CursorSpot />
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Stack />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
