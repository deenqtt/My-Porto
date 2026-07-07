'use client';

import { useState, useEffect, useRef } from 'react';
import { Github, Mail, Linkedin, ArrowUpRight, Terminal, Download, Menu, X } from 'lucide-react';

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

// NOTE: stats below are real & defensible — adjust the numbers as your work grows.
const heroStats: [string, string][] = [
  ['28', 'projects shipped'],
  ['10+', 'protocols spoken'],
  ['2', 'live demos'],
  ['6', 'certifications'],
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
        <h1 className="font-['Rajdhani'] font-bold leading-[0.88] text-[#1a1410]" style={{ letterSpacing: '-0.02em' }}>
          <span className="block text-[clamp(3rem,17vw,8rem)] sm:text-[clamp(3.5rem,12vw,8rem)]">DEDEN</span>
          <span className="block text-[clamp(3rem,17vw,8rem)] sm:text-[clamp(3.5rem,12vw,8rem)] text-[#bf5030]">HIDAYAT</span>
        </h1>
      </div>

      <div className="mt-6 sm:mt-8 max-w-[460px]">
        <p className="font-['Outfit'] text-[#7a6e64] text-sm leading-[1.85]">
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
            <div className="font-['Rajdhani'] font-bold text-2xl text-[#1a1410]">{num}</div>
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
          <p className="font-['Outfit'] text-[#3d2e28] text-[15px] sm:text-base leading-[1.85] sm:leading-[1.9] mb-5">
            I&apos;m a software engineer who lives where hardware meets the cloud. Started with
            industrial-electronics foundations at SMK Negeri Jawa Tengah (2023) — panel schematics and
            PCB design — which gave me the structural logic for complex systems. Now in R&amp;D, I architect
            middleware for 10+ industrial protocols and the dashboards that make their data useful.
          </p>
          <p className="font-['Outfit'] text-[#7a6e64] text-sm leading-[1.85]">
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

interface Proj {
  n: string;
  title: string;
  layer: string;
  blurb: string;
  tech: string[];
  stat: string;
  demo?: string;
  repo?: string;
}

const projects: Proj[] = [
  {
    n: '001',
    title: 'SMARTRACK — DCIM Platform',
    layer: 'Fullstack',
    blurb:
      'Full-stack data-center management platform. Real-time MQTT/WebSocket monitoring, multi-protocol IoT (Modbus, SNMP), AI analytics, drag-and-drop automation, RBAC + AES-256, PUE/carbon tracking.',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'MQTT', 'Docker'],
    stat: 'live demo',
    demo: 'https://smartrack-software.vercel.app/',
    repo: 'https://github.com/deenqtt/smartrack-software',
  },
  {
    n: '002',
    title: 'IoT BOM List v2',
    layer: 'Fullstack + Infra',
    blurb:
      'Enterprise BOM and inventory platform for IoT hardware teams. Models components, PCB assemblies, sellable product sets, and deployment projects with supplier pricing, Excel import/export, audit logs, backup scheduler, and Docker/nginx deployment.',
    tech: ['Next.js', 'TypeScript', 'Hono', 'Prisma', 'PostgreSQL', 'Docker', 'nginx'],
    stat: 'multi-service',
    repo: 'https://github.com/deenqtt/IOTBomlist-v2',
  },
  {
    n: '003',
    title: 'Industrial Telemetry & Protocol Bridge',
    layer: 'Firmware + Middleware',
    blurb:
      'Real-time poller for industrial devices — Modbus, SNMP — publishing to an MQTT broker with bidirectional reverse flow. Runs on Raspberry Pi + ESP32 nodes.',
    tech: ['Python', 'MQTT', 'Modbus', 'SNMP', 'Raspberry Pi', 'ESP32'],
    stat: 'bidirectional',
    repo: 'https://github.com/deenqtt',
  },
  {
    n: '004',
    title: 'AGV Simulation & Web Control',
    layer: 'Robotics + Fullstack',
    blurb:
      'ROS2 Humble + Gazebo autonomous guided vehicle with a Vue 3 control UI. Nav2 navigation, SLAM mapping, auto-docking, keepout-zone costmaps, live camera feed.',
    tech: ['ROS2', 'Gazebo', 'Nav2', 'SLAM', 'Vue 3', 'Docker'],
    stat: 'Nav2 + SLAM',
    repo: 'https://github.com/deenqtt',
  },
  {
    n: '005',
    title: 'Production Machine Monitor (AI Vision)',
    layer: 'Fullstack + AI',
    blurb:
      'Real-deployed monitor for CNC/laser machines. A silent C# screenshot agent feeds a Flask server running Qwen2.5VL locally, generating automated daily activity reports.',
    tech: ['Python', 'Flask', 'C#', 'Ollama', 'Qwen2.5VL'],
    stat: '3 machines live',
    repo: 'https://github.com/deenqtt',
  },
  {
    n: '006',
    title: 'Bubble Arena',
    layer: 'Fullstack',
    blurb:
      'Browser game controlled entirely by hand gestures via MediaPipe. Real-time P2P multiplayer over WebRTC, face-detection lobby, custom canvas engine.',
    tech: ['React', 'TypeScript', 'MediaPipe', 'WebRTC', 'PeerJS'],
    stat: 'live demo',
    demo: 'https://bubble-pop-web-new.vercel.app/',
    repo: 'https://github.com/deenqtt',
  },
  {
    n: '007',
    title: 'AI Meeting Assistant (STT/TTS)',
    layer: 'Middleware + AI',
    blurb:
      'Real-time speech-to-text, automated meeting summaries, and voice-controlled smart-room automation via custom wake-word detection.',
    tech: ['Python', 'STT', 'NLP', 'MQTT', 'IoT'],
    stat: 'real-time STT',
    repo: 'https://github.com/deenqtt',
  },
];

const layerColor: Record<string, string> = {
  Fullstack: '#bf5030',
  'Fullstack + Infra': '#2f5f6f',
  'Firmware + Middleware': '#3d6b5a',
  'Robotics + Fullstack': '#8b6914',
  'Fullstack + AI': '#5a3d7a',
  'Middleware + AI': '#3d2e28',
};

function ProjectRow({ p }: { p: Proj }) {
  const [open, setOpen] = useState(false);
  const color = layerColor[p.layer] ?? '#bf5030';

  return (
    <div className="border-b border-[#1a1410]/8 cursor-pointer group" onClick={() => setOpen(!open)}>
      <div className="grid grid-cols-[2rem_1fr] gap-x-3 gap-y-3 py-5 px-1 sm:px-2 hover:bg-[#1a1410]/[0.02] transition-colors sm:flex sm:items-start sm:gap-5">
        <span className="font-mono text-[10px] text-[#7a6e64]/50 pt-1 sm:pt-0.5 w-7 shrink-0">{p.n}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start sm:items-baseline gap-2 sm:gap-3 flex-wrap min-w-0">
            <Scramble className="font-['Rajdhani'] font-bold text-lg sm:text-xl leading-tight text-[#1a1410] group-hover:text-[#bf5030] transition-colors">
              {p.title}
            </Scramble>
            <span
              className="font-mono text-[10px] tracking-widest uppercase px-1.5 py-0.5 border break-words"
              style={{ color, borderColor: `${color}40`, background: `${color}10` }}
            >
              {p.layer}
            </span>
            <span className="font-mono text-[10px] sm:hidden pt-0.5" style={{ color }}>
              {p.stat}
            </span>
          </div>
          {open && (
            <div className="mt-4 mb-2">
              <p className="font-['Outfit'] text-[#7a6e64] text-sm leading-[1.8] max-w-xl mb-4">{p.blurb}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] text-[#7a6e64] px-2 py-0.5 bg-[#1a1410]/[0.05] border border-[#1a1410]/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3" onClick={(e) => e.stopPropagation()}>
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-[#bf5030] hover:text-[#1a1410] transition-colors"
                  >
                    live demo
                    <ArrowUpRight size={10} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                )}
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-[#7a6e64] hover:text-[#1a1410] transition-colors"
                  >
                    source
                    <ArrowUpRight size={10} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
        <span className="hidden sm:block font-mono text-[11px] shrink-0 pt-0.5" style={{ color }}>
          {p.stat}
        </span>
        <span className="font-mono text-[10px] text-[#7a6e64]/40 pt-0.5 shrink-0 hidden sm:block">
          {open ? '↑' : '↓'}
        </span>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-28 px-4 sm:px-10 max-w-5xl mx-auto border-t border-[#1a1410]/8">
      <SectionLabel index="02" label="selected work" />
      <div className="border-t border-[#1a1410]/8">
        {projects.map((p) => (
          <ProjectRow key={p.n} p={p} />
        ))}
      </div>
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
    note: 'Bridging bare-metal firmware and cloud telemetry. Middleware for 10+ industrial protocols, real-time MQTT pipelines, and full-stack control centers (SMARTRACK DCIM).',
    tags: ['Python', 'MQTT', 'Modbus', 'Next.js', 'Docker'],
  },
  {
    period: '2023 — now',
    role: 'Freelance / Independent',
    co: 'Self',
    note: 'IoT and web projects for freelance clients — dashboards, protocol bridges, mobile control apps. First freelance client 2024.',
    tags: ['IoT', 'Next.js', 'Flutter', 'Supabase'],
  },
  {
    period: '2020 — 2023',
    role: 'Teknik Elektronika Industri (SMK)',
    co: 'SMK Negeri Jawa Tengah',
    note: 'Industrial electronics — panel schematics, PCB design, and microcontrollers. The structural logic that underpins how I approach complex hardware-software systems today.',
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
                <span className="font-['Rajdhani'] font-bold text-lg text-[#1a1410]">{e.role}</span>
                <span className="font-mono text-[11px] text-[#bf5030]/70">@ {e.co}</span>
              </div>
              <p className="font-['Outfit'] text-[#7a6e64] text-sm leading-[1.8] mb-3 max-w-xl">{e.note}</p>
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

function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-28 px-4 sm:px-10 max-w-5xl mx-auto border-t border-[#1a1410]/8">
      <SectionLabel index="05" label="contact" />
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        <div className="min-w-0">
          <h2
            className="font-['Rajdhani'] font-bold text-[clamp(2.35rem,12vw,4.5rem)] sm:text-[clamp(2.5rem,7vw,4.5rem)] text-[#1a1410] leading-tight mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            GOT A REAL
            <br />
            <span className="text-[#bf5030]">PROBLEM?</span>
          </h2>
          <p className="font-['Outfit'] text-[#7a6e64] text-sm leading-[1.85] max-w-sm mb-8">
            Need someone who can walk from the hardware abstraction layer to the user dashboard?
            Industrial protocols, telemetry middleware, control centers — that&apos;s home.
          </p>
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

        <div className="font-mono text-[11px] text-[#7a6e64] leading-[1.9] bg-[#e8e4db] border border-[#1a1410]/8 p-4 sm:p-6 min-w-0">
          <div className="mb-3 text-[#bf5030]/70">
            <Typed text="$ cat availability.txt" delay={400} />
          </div>
          {[
            '> open to remote engineering roles',
            '> open to freelance (IoT / web)',
            '> based in Semarang, Indonesia',
            '> UTC+7, flexible hours',
            '',
            '> specialties:',
            '  - industrial protocol middleware',
            '  - IoT telemetry pipelines',
            '  - firmware + fullstack combo',
            '  - Next.js control centers',
          ].map((line, i) => (
            <div key={i} className={`${line.startsWith('>') ? 'text-[#3d2e28]' : 'text-[#7a6e64]'} break-words`}>
              {line || <br />}
            </div>
          ))}
          <div className="mt-2 text-[#bf5030]/60 animate-pulse">▋</div>
        </div>
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
    <div id="top" className="min-h-screen bg-[#f0ede6] text-[#1a1410]" style={{ fontFamily: "'Outfit', sans-serif" }}>
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
