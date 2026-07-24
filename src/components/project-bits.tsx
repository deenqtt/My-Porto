import { Lock, ArrowUpRight } from 'lucide-react';
import type { Proj } from '@/data/projects';

export function StatusBadge({ status }: { status: Proj['status'] }) {
  if (status === 'live') {
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase text-[#3d6b5a]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3d6b5a] animate-pulse" />
        live
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 font-mono text-[9px] tracking-widest uppercase text-[#7a6e64]">
      <Lock size={9} />
      private · commercial
    </span>
  );
}

export function TechChips({ tech }: { tech: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tech.map((t) => (
        <span
          key={t}
          className="font-mono text-[10px] text-[#7a6e64] px-2 py-0.5 bg-[#1a1410]/[0.05] border border-[#1a1410]/10"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export function ProjectLinks({ p }: { p: Proj }) {
  if (!p.demo && !p.repo) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
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
  );
}

// ─── Architecture diagrams (proof for headless / private work) ──────────────────

const DIA = {
  boxFill: 'rgba(26,20,16,0.03)',
  boxStroke: 'rgba(26,20,16,0.18)',
  accent: '#bf5030',
  ink: '#3d2e28',
  muted: '#7a6e64',
};

function ProtocolDiagram() {
  const rows = [
    { y: 34, t: 'SNMP · Modbus · BACnet' },
    { y: 62, t: 'PROFINET · GOOSE · OPC-UA' },
    { y: 90, t: 'EtherNet/IP · IEC104' },
    { y: 118, t: 'Sparkplug · OCPP · LoRa' },
  ];
  return (
    <svg viewBox="0 0 460 150" className="w-full h-auto font-mono" role="img" aria-label="Protocol OUT architecture: one data source fanned out to 11 protocol servers">
      <defs>
        <marker id="ah" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={DIA.muted} />
        </marker>
      </defs>
      <rect x="4" y="58" width="86" height="34" fill={DIA.boxFill} stroke={DIA.boxStroke} />
      <text x="47" y="72" textAnchor="middle" fontSize="8" fill={DIA.ink}>SHARED</text>
      <text x="47" y="83" textAnchor="middle" fontSize="8" fill={DIA.muted}>DATA</text>
      <line x1="90" y1="75" x2="120" y2="75" stroke={DIA.muted} strokeWidth="1" markerEnd="url(#ah)" />
      <rect x="122" y="52" width="92" height="46" fill="rgba(191,80,48,0.08)" stroke={DIA.accent} />
      <text x="168" y="72" textAnchor="middle" fontSize="9" fill={DIA.accent} fontWeight="700">PROTOCOL</text>
      <text x="168" y="84" textAnchor="middle" fontSize="9" fill={DIA.accent} fontWeight="700">OUT</text>
      <text x="168" y="94" textAnchor="middle" fontSize="6.5" fill={DIA.muted}>11 servers · systemd</text>
      {rows.map((r) => (
        <g key={r.y}>
          <path d={`M214,75 C236,75 236,${r.y} 258,${r.y}`} fill="none" stroke={DIA.boxStroke} strokeWidth="1" markerEnd="url(#ah)" />
          <text x="264" y={r.y + 3} fontSize="8.5" fill={DIA.ink}>{r.t}</text>
        </g>
      ))}
      <text x="264" y="140" fontSize="7" fill={DIA.muted}>→ NMS / SCADA / BMS / IED</text>
    </svg>
  );
}

function OtaDiagram() {
  const stages = [
    { x: 6, title: 'CI → GHCR', sub: 'image + digest' },
    { x: 122, title: 'RELEASE', sub: 'draft→beta→stable' },
    { x: 238, title: 'ROLLOUT', sub: '10→50→100%', accent: true },
    { x: 354, title: 'DEVICES', sub: 'reconcile 45s' },
  ];
  return (
    <svg viewBox="0 0 460 110" className="w-full h-auto font-mono" role="img" aria-label="OTA rollout pipeline: CI to GHCR, release promotion, staged rollout, device reconciliation">
      <defs>
        <marker id="ah2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={DIA.muted} />
        </marker>
      </defs>
      {stages.map((s, i) => (
        <g key={s.x}>
          <rect
            x={s.x}
            y="30"
            width="100"
            height="42"
            fill={s.accent ? 'rgba(191,80,48,0.08)' : DIA.boxFill}
            stroke={s.accent ? DIA.accent : DIA.boxStroke}
          />
          <text x={s.x + 50} y="50" textAnchor="middle" fontSize="9" fontWeight="700" fill={s.accent ? DIA.accent : DIA.ink}>
            {s.title}
          </text>
          <text x={s.x + 50} y="62" textAnchor="middle" fontSize="7" fill={DIA.muted}>
            {s.sub}
          </text>
          {i < stages.length - 1 && (
            <line x1={s.x + 100} y1="51" x2={s.x + 116} y2="51" stroke={DIA.muted} strokeWidth="1" markerEnd="url(#ah2)" />
          )}
        </g>
      ))}
      <text x="230" y="96" textAnchor="middle" fontSize="7.5" fill={DIA.muted}>
        pull-based · health-check · auto-rollback
      </text>
    </svg>
  );
}

function MlDiagram() {
  return (
    <svg viewBox="0 0 460 130" className="w-full h-auto font-mono" role="img" aria-label="ML sidecar flow: features from TypeScript over HTTP to Python inference returning predictions, with rule-based fallback">
      <defs>
        <marker id="ah3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={DIA.muted} />
        </marker>
      </defs>
      <rect x="6" y="34" width="118" height="44" fill={DIA.boxFill} stroke={DIA.boxStroke} />
      <text x="65" y="53" textAnchor="middle" fontSize="9" fill={DIA.ink} fontWeight="700">FEATURES</text>
      <text x="65" y="65" textAnchor="middle" fontSize="7" fill={DIA.muted}>TypeScript</text>
      <line x1="124" y1="56" x2="168" y2="56" stroke={DIA.muted} strokeWidth="1" markerEnd="url(#ah3)" />
      <text x="146" y="50" textAnchor="middle" fontSize="6.5" fill={DIA.muted}>HTTP</text>
      <rect x="170" y="30" width="120" height="52" fill="rgba(191,80,48,0.08)" stroke={DIA.accent} />
      <text x="230" y="49" textAnchor="middle" fontSize="9" fill={DIA.accent} fontWeight="700">ML ENGINE</text>
      <text x="230" y="60" textAnchor="middle" fontSize="7" fill={DIA.muted}>Python · FastAPI</text>
      <text x="230" y="72" textAnchor="middle" fontSize="6.5" fill={DIA.muted}>RUL · fault · SoH</text>
      <line x1="290" y1="56" x2="334" y2="56" stroke={DIA.muted} strokeWidth="1" markerEnd="url(#ah3)" />
      <rect x="336" y="34" width="118" height="44" fill={DIA.boxFill} stroke={DIA.boxStroke} />
      <text x="395" y="53" textAnchor="middle" fontSize="9" fill={DIA.ink} fontWeight="700">PREDICTION</text>
      <text x="395" y="65" textAnchor="middle" fontSize="7" fill={DIA.muted}>degraded-safe</text>
      <path d="M65,78 C65,110 395,110 395,80" fill="none" stroke={DIA.boxStroke} strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#ah3)" />
      <text x="230" y="122" textAnchor="middle" fontSize="7" fill={DIA.muted}>rule-based fallback if sidecar absent</text>
    </svg>
  );
}

export function ProjectDiagram({ id }: { id: NonNullable<Proj['diagram']> }) {
  const Comp = id === 'protocol' ? ProtocolDiagram : id === 'ota' ? OtaDiagram : MlDiagram;
  return (
    <div className="border border-[#1a1410]/8 bg-[#f0ede6] p-3">
      <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#7a6e64]/60 mb-2">how it works</div>
      <Comp />
    </div>
  );
}
