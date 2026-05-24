'use client';

import Hero from '@/components/home/Hero';
import QuickStats from '@/components/home/QuickStats';
import { fetchGitHubStats } from '@/lib/github';
import Link from 'next/link';
import { ArrowRight, LayoutDashboard, Cpu, Network, Database, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { GitHubStats } from '@/types';

export default function Home() {
  const [stats, setStats] = useState<GitHubStats | null>(null);

  useEffect(() => {
    fetchGitHubStats().then(setStats);
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      
      {/* Global Background Atmosphere */}
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a] pointer-events-none" />

      {/* Identitity Layer */}
      <Hero />

      {/* SECTION 01: System Capabilities Matrix */}
      <section className="relative max-w-6xl mx-auto px-4 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
               <div className="h-px w-8 bg-cyan-500/50" />
               <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.3em]">01 // System Capabilities</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Robust Architecture</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl">
              Specializing in the intersection of hardware telemetry and high-scale web systems. 
              From Bare-Metal polling to Cloud-Native visualization.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Network, title: 'Real-time Telemetry', desc: 'MQTT & WebSocket Pipelines' },
                { icon: Database, title: 'Protocol Bridging', desc: 'Modbus, SNMP, BACnet' },
                { icon: Cpu, title: 'Edge Computing', desc: 'ESP32 & Raspberry Pi Nodes' },
                { icon: LayoutDashboard, title: 'Control Centers', desc: 'Next.js & React Dashboards' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-colors group">
                  <item.icon size={18} className="text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-sm font-semibold text-white mb-1 uppercase tracking-tight">{item.title}</h3>
                  <p className="text-[11px] text-gray-500 font-mono">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Abstract Visual / Schematic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
             <div className="aspect-square rounded-full border border-cyan-500/10 flex items-center justify-center relative">
                <div className="absolute inset-0 animate-pulse-slow">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent" />
                   <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
                </div>
                <div className="w-2/3 h-2/3 rounded-full border border-cyan-500/5 flex items-center justify-center">
                   <Terminal size={40} className="text-cyan-500/30" />
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 02: Real-time System Status */}
      <section className="relative py-32 bg-[#0d0d0d]/40 border-y border-white/[0.02]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-blue-500/50" />
                <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em]">02 // Operational Data</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Live System <span className="text-cyan-400">Telemetry</span></h2>
              <p className="text-gray-500 text-sm font-mono uppercase tracking-tighter">Aggregated metrics from source control and active coding sessions.</p>
            </motion.div>
            <Link 
              href="/dashboard"
              className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all uppercase tracking-widest"
            >
              Access Full Terminal ➔
            </Link>
          </div>
          
          {stats && <QuickStats stats={stats} />}
        </div>
      </section>

      {/* SECTION 03: Operational Access Points */}
      <section className="relative max-w-6xl mx-auto px-4 py-32">
        <div className="flex items-center gap-3 mb-16">
          <div className="h-px w-8 bg-purple-500/50" />
          <span className="text-[10px] font-mono text-purple-500 uppercase tracking-[0.3em]">03 // System Navigation</span>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Systems Archive',
              desc: 'Detailed case studies of industrial protocol modules and full-stack ecosystems.',
              href: '/projects',
              label: 'EXPLORE_ARCHIVE',
              color: 'hover:border-cyan-500/30'
            },
            {
              title: 'Technical Wiki',
              desc: 'Field notes, architectural logs, and engineering documentation hub.',
              href: '/notes',
              label: 'READ_DOCUMENTATION',
              color: 'hover:border-blue-500/30'
            },
            {
              title: 'Personnel File',
              desc: 'Professional history, deployment milestones, and verified certifications.',
              href: '/about',
              label: 'VIEW_DOSSIER',
              color: 'hover:border-purple-500/30'
            },
          ].map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={`group block p-8 bg-[#111] border border-[#1f2937] rounded-3xl transition-all duration-500 relative overflow-hidden ${item.color}`}
              >
                {/* Background Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 h-12">
                  {item.desc}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gray-600 group-hover:text-white transition-colors uppercase tracking-widest">
                    {item.label}
                  </span>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}
