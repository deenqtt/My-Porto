import type { Metadata } from 'next';
import { Linkedin, Github, Mail, MapPin, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Deden Hidayat — IoT Staff & Developer at R&D Division, Semarang.',
};

const techStack = [
  {
    category: 'Embedded & Hardware',
    items: ['ESP32', 'Raspberry Pi 4/5', 'C++', 'PCB Design', 'Schematic Diagram', 'Panel Wiring'],
    color: 'text-cyan-400',
    border: 'border-cyan-500/20',
    bg: 'bg-cyan-500/5',
  },
  {
    category: 'Industrial Protocols',
    items: ['BACnet/IP', 'Modbus RTU/TCP', 'SNMP', 'EtherNet/IP', 'PROFINET', 'IEC 60870-5-104', 'IEC 61850 / GOOSE', 'OPC-UA', 'Sparkplug B', 'OCPP', 'LoRa', 'MQTT'],
    color: 'text-orange-400',
    border: 'border-orange-500/20',
    bg: 'bg-orange-500/5',
  },
  {
    category: 'Languages & Frameworks',
    items: ['Python', 'Dart / Flutter', 'TypeScript', 'C#', 'C++', 'Vue.js', 'React', 'Next.js'],
    color: 'text-blue-400',
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/5',
  },
  {
    category: 'Backend & Middleware',
    items: ['Flask', 'Node.js', 'REST API', 'Middleware Architecture', 'Supervisord', 'Systemd'],
    color: 'text-purple-400',
    border: 'border-purple-500/20',
    bg: 'bg-purple-500/5',
  },
  {
    category: 'Robotics & AI',
    items: ['ROS2 Humble', 'Gazebo', 'Nav2', 'SLAM', 'MediaPipe', 'Ollama', 'Qwen2.5VL', 'WebRTC'],
    color: 'text-pink-400',
    border: 'border-pink-500/20',
    bg: 'bg-pink-500/5',
  },
  {
    category: 'DevOps & Tools',
    items: ['Docker', 'Git', 'Linux / Ubuntu', 'Raspberry Pi OS', 'Tailwind CSS', 'Supabase'],
    color: 'text-green-400',
    border: 'border-green-500/20',
    bg: 'bg-green-500/5',
  },
];

const timeline = [
  {
    period: '2020 – 2023',
    duration: '3 years',
    title: 'SMK Negeri Jawa Tengah, Semarang',
    desc: 'Vocational high school focused on electrical engineering — studied electrical panel schematics, RF motors, and PCB design & fabrication from scratch. Graduated with a score of 86.',
    tag: 'Education',
    tagColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  },
  {
    period: 'Jul – Oct 2023',
    duration: '3 months',
    title: 'PT Adhimix',
    desc: 'First work experience after graduating. Gained exposure to industrial operations and field engineering.',
    tag: 'Work',
    tagColor: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  },
  {
    period: 'Nov 2023',
    duration: '1 month',
    title: 'PT GSPE — Production Division',
    desc: 'Joined PT Graha Sumber Prima Elektronik (GSPE), starting in the production division.',
    tag: 'Work',
    tagColor: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  },
  {
    period: 'Dec 2023 – Present',
    duration: '~1.5 years',
    title: 'PT GSPE — R&D IoT Staff',
    desc: 'Moved to R&D division as IoT Staff. Build firmware, industrial middleware (10+ protocols: BACnet, Modbus, EtherNet/IP, PROFINET, OPC-UA, IEC 61850, Sparkplug B, OCPP), web dashboards, and mobile apps. Work directly with real devices on the production floor.',
    tag: 'Current',
    tagColor: 'text-green-400 bg-green-500/10 border-green-500/20',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-20">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          About <span className="text-gradient">Me</span>
        </h1>
        <div className="w-12 h-0.5 bg-cyan-500 rounded" />
      </div>

      {/* Bio Card */}
      <div className="bg-[#161616] border border-[#1f2937] rounded-xl p-8 mb-10">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Avatar placeholder */}
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-3xl shrink-0 select-none">
            🧑‍💻
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-1">Deden Hidayat</h2>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="flex items-center gap-1.5 text-sm text-cyan-400 font-mono">
                <Briefcase size={13} />
                IoT Staff · R&amp;D Division
              </span>
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <MapPin size={13} />
                Semarang, Indonesia
              </span>
            </div>

            <div className="space-y-3 text-gray-400 leading-relaxed text-sm">
              <p>
                Vocational school graduate turned{' '}
                <span className="text-gray-200">industrial IoT developer</span>, currently working
                in R&D. I bridge the gap between hardware and software — from reading schematic
                diagrams and wiring panels at school, to building production-grade middleware that
                speaks 10+ industrial protocols today.
              </p>
              <p>
                Day-to-day I work on{' '}
                <span className="text-cyan-400">
                  protocol pollers & servers (BACnet, Modbus, EtherNet/IP, PROFINET, OPC-UA, IEC
                  60870-5-104, GOOSE, Sparkplug B, OCPP, LoRa)
                </span>
                , firmware for ESP32 & Raspberry Pi, and full-stack dashboards for monitoring
                industrial systems.
              </p>
              <p>
                Outside of work, I build things I find interesting — a{' '}
                <span className="text-gray-200">gesture-controlled multiplayer browser game</span>{' '}
                using MediaPipe & WebRTC, an{' '}
                <span className="text-gray-200">AGV simulation with ROS2 & Gazebo</span>, and an{' '}
                <span className="text-gray-200">AI vision monitor</span> running locally on
                Ollama. I&apos;m also open for freelance work in IoT, embedded systems, and web
                development.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 mt-5">
              <a
                href="https://github.com/deenqtt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Github size={14} />
                deenqtt
              </a>
              <a
                href="https://www.linkedin.com/in/deden-hidayat-a0b08524a/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Linkedin size={14} />
                deden-hidayat
              </a>
              <a
                href="mailto:deden@gspe.co.id"
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Mail size={14} />
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Status badges */}
        <div className="mt-6 pt-5 border-t border-[#1f2937] flex flex-wrap gap-3">
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Full-time · R&D IoT Staff
          </span>
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Open for Freelance
          </span>
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs">
            25+ Projects Shipped
          </span>
        </div>
      </div>

      {/* Background highlight */}
      <div className="bg-[#161616] border border-[#1f2937] rounded-xl p-6 mb-10">
        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-3">
          Technical Background
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          Started hands-on with hardware at vocational school — reading{' '}
          <span className="text-gray-200">electrical panel schematics</span>, understanding{' '}
          <span className="text-gray-200">RF motors</span>, and{' '}
          <span className="text-gray-200">designing & fabricating PCBs from scratch</span>. That
          foundation makes me comfortable in IoT roles that require understanding both the hardware
          side and the software that runs on top of it. Now working across the full stack: from
          bare-metal firmware to cloud-connected dashboards and production middleware deployed on
          Raspberry Pi.
        </p>
      </div>

      {/* Tech Stack */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Tech Stack</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {techStack.map((group) => (
            <div
              key={group.category}
              className={`border rounded-xl p-5 ${group.border} ${group.bg}`}
            >
              <h3 className={`text-xs font-mono uppercase tracking-wider mb-3 ${group.color}`}>
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-xs rounded-lg bg-black/30 border border-white/10 text-gray-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Career Timeline */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Journey</h2>
        <div className="relative pl-6">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500 via-cyan-500/30 to-transparent" />

          <div className="space-y-8">
            {timeline.map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full border-2 border-cyan-500 bg-[#0a0a0a]" />
                <div className="pl-3">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-medium ${item.tagColor}`}
                    >
                      {item.tag}
                    </span>
                    <span className="text-xs font-mono text-gray-500">{item.period}</span>
                    <span className="text-xs text-gray-700">· {item.duration}</span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
