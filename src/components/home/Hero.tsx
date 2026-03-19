'use client';

import Link from 'next/link';
import { Github, ArrowRight, Cpu, Globe, Code2, Radio } from 'lucide-react';
import TypewriterText from '@/components/ui/TypewriterText';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 grid-bg overflow-hidden">
      {/* Glow blob */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 py-20">
        <div className="max-w-3xl">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-sm font-mono mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow" />
            Available for freelance projects
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            <span className="text-white">Hi, I&apos;m </span>
            <span className="text-gradient">Deden Hidayat</span>
          </h1>

          {/* Typewriter */}
          <div className="text-2xl sm:text-3xl font-mono text-gray-300 mb-6 h-10">
            <TypewriterText
              texts={[
                'IoT Staff @ R&D Division',
                'Industrial Protocol Engineer',
                'Middleware Developer',
                'Firmware & Embedded Systems',
                'Flutter & Web Developer',
                'Open for Freelance',
              ]}
            />
          </div>

          {/* Description */}
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-2xl">
            IoT Staff in R&D, based in Semarang. I build firmware, middleware, and software
            for industrial IoT systems — from low-level protocol pollers (BACnet, Modbus,
            EtherNet/IP, IEC 61850) to web dashboards and mobile apps. 25+ projects shipped.
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {[
              { icon: Cpu, label: 'ESP32 / Raspberry Pi' },
              { icon: Radio, label: 'BACnet / Modbus / IEC' },
              { icon: Code2, label: 'Python / Flutter / Next.js' },
              { icon: Globe, label: 'ROS2 / Docker / MQTT' },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-sm"
              >
                <Icon size={14} className="text-cyan-400" />
                {label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/20"
            >
              View Projects
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://github.com/deenqtt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-[#1f2937] hover:border-cyan-500/40 text-gray-300 hover:text-white rounded-lg transition-all duration-200"
            >
              <Github size={16} />
              GitHub
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-6 py-3 border border-[#1f2937] hover:border-cyan-500/40 text-gray-300 hover:text-white rounded-lg transition-all duration-200"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
