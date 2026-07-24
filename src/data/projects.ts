// Single source of truth for projects — read by the homepage cards and the
// /work/[slug] detail pages. Keep `impact` code-verified; add real deploy
// numbers as they're confirmed.

export interface Proj {
  slug: string;
  n: string;
  title: string;
  layer: string;
  impact: string; // one-line hook — the outcome
  blurb: string;
  tech: string[];
  status: 'live' | 'private';
  role?: string; // set when it's a team project — be honest about scope
  hard?: string; // the hard technical part — for engineers
  diagram?: 'protocol' | 'ota' | 'ml'; // architecture proof for headless work
  demo?: string;
  repo?: string;
  featured?: boolean;
}

export const layerColor: Record<string, string> = {
  'DCIM · Fullstack': '#bf5030',
  'Industrial Middleware': '#3d6b5a',
  'Firmware · Full-Stack': '#8b6914',
  'AI · ML · MLOps': '#5a3d7a',
  'Fleet Infra · DevOps': '#2f5f6f',
  Robotics: '#3d2e28',
};

export const projects: Proj[] = [
  {
    slug: 'smartrack',
    n: '001',
    title: 'SMARTRACK — DCIM Platform',
    layer: 'DCIM · Fullstack',
    impact: 'Real-time data-center control center — monitors power, cooling and multi-protocol IoT with PUE/carbon tracking.',
    blurb:
      'Full-stack DCIM platform. Real-time MQTT/WebSocket telemetry, multi-protocol IoT (Modbus, SNMP), drag-and-drop automation, RBAC + AES-256.',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'MQTT', 'Docker'],
    status: 'live',
    hard: 'Fanning real-time telemetry out to many live dashboards over WebSocket without state drift between clients.',
    demo: 'https://smartrack-software.vercel.app/',
    repo: 'https://github.com/deenqtt/smartrack-software',
    featured: true,
  },
  {
    slug: 'protocol-out',
    n: '002',
    title: 'Protocol OUT — Industrial Gateway',
    layer: 'Industrial Middleware',
    impact: 'One gateway serves 11 industrial protocols in parallel — SNMP, Modbus, BACnet, PROFINET, GOOSE, OPC-UA, IEC104, Sparkplug.',
    blurb:
      'Protocol middleware exposing one shared data source through 11 protocol servers at once. Multi-threaded, MQTT-configurable, deployed via systemd. PROFINET runs on a native C core.',
    tech: ['Python', 'C', 'Modbus', 'BACnet', 'PROFINET', 'GOOSE / IEC 61850', 'OPC-UA', 'SNMP', 'Sparkplug B', 'systemd'],
    status: 'private',
    hard: '11 protocol stacks in one process reading one source without races — PROFINET needed a native C core for real-time timing; GOOSE runs raw L2 multicast.',
    diagram: 'protocol',
    featured: true,
  },
  {
    slug: 'lockaccesscontroller',
    n: '003',
    title: 'LockAccessController',
    layer: 'Firmware · Full-Stack',
    impact: 'ESP32 access controller — firmware + software. One controller drives up to 10 locks over RS485/Modbus, reachable over three channels at once.',
    blurb:
      'Door access-control system. ESP32 Modbus master over RS485, dry-contact sensors, offline-safe logging (RTC + EEPROM). Reachable over three independent channels: embedded web UI, WebSocket, and MQTT.',
    tech: ['ESP32', 'C++', 'ESP-IDF', 'Modbus RTU', 'RS485', 'MQTT', 'WebSocket', 'W5500'],
    status: 'private',
    hard: 'One ESP32 acting as Modbus master to 10 locks while serving HTTP + WebSocket + MQTT in parallel, with offline-safe logging via RTC + EEPROM.',
    featured: true,
  },
  {
    slug: 'ml-predictive-maintenance',
    n: '004',
    title: 'ML Predictive-Maintenance Engine',
    layer: 'AI · ML · MLOps',
    impact: 'Predictive-maintenance ML engine — bearing-fault (CWRU), remaining-useful-life (FEMTO), battery SoH, vibration anomaly. Runs as a Docker sidecar.',
    blurb:
      'Stateless FastAPI ML service for an industrial IoT platform. Trained models for RUL, fault classification, thermal and energy forecasting; degraded rule-based fallback so the app never hard-fails when ML is absent.',
    tech: ['Python', 'FastAPI', 'scikit-learn', 'LightGBM', 'NumPy', 'Docker'],
    status: 'private',
    hard: 'Clean split — feature-engineering in TypeScript, model inference in Python — plus a degraded rule-based fallback so the app never hard-fails when the ML sidecar is absent.',
    diagram: 'ml',
    featured: true,
  },
  {
    slug: 'ota-central',
    n: '005',
    title: 'OTA Central — Fleet Update Control Plane',
    layer: 'Fleet Infra · DevOps',
    impact: 'Updates remote devices with zero site visits — CI→GHCR releases, staged rollout 10→50→100%, health-checked auto-rollback.',
    blurb:
      'OTA control plane. GitHub Actions registers GHCR images as releases; operator promotes and rolls out to the fleet; pull-based agents reconcile desired state every 45s, health-check, and roll back on failure.',
    tech: ['Next.js', 'React 19', 'Prisma', 'PostgreSQL', 'GitHub Actions', 'GHCR', 'Docker'],
    status: 'private',
    hard: 'Pull-based, not push — the server only writes each device its desired version; agents reconcile, health-check, and roll back on their own. Idempotent CI so release calls are safe to retry.',
    diagram: 'ota',
  },
  {
    slug: 'amr',
    n: '006',
    title: 'AMR — Autonomous Robot + Web Control',
    layer: 'Robotics',
    impact: 'Browser-controlled autonomous mobile robot — SLAM mapping, Nav2 navigation, auto-docking. Ran in simulation and on real hardware.',
    blurb:
      'ROS2 Humble + Gazebo AMR with a Vue 3 control UI. SLAM, Nav2, waypoint missions, keepout zones, auto-docking, live map and camera — all from the browser.',
    tech: ['ROS2', 'Gazebo', 'Nav2', 'SLAM', 'Vue 3', 'FastAPI', 'Docker'],
    status: 'private',
    role: 'Team project — I owned the web control UI + simulation stack.',
  },
];

export function getProject(slug: string): Proj | undefined {
  return projects.find((p) => p.slug === slug);
}
