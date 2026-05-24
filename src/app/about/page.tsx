'use client';

import { Linkedin, Github, Mail, MapPin, Briefcase, Award, Milestone, Cpu, ShieldCheck } from 'lucide-react';
import { certificates } from '@/data/certs';
import { achievements } from '@/data/achievements';
import { motion } from 'framer-motion';

const techStack = [
  {
    category: 'Hardware & RTOS',
    items: ['ESP32', 'Raspberry Pi', 'C++', 'PCB Design', 'Panel Wiring'],
    color: 'text-cyan-400',
  },
  {
    category: 'Industrial Protocols',
    items: ['BACnet', 'Modbus', 'SNMP', 'EtherNet/IP', 'OPC-UA', 'MQTT', 'IEC 61850'],
    color: 'text-orange-400',
  },
  {
    category: 'Software Architecture',
    items: ['Next.js', 'TypeScript', 'Python', 'Flask', 'Flutter', 'ROS2'],
    color: 'text-blue-400',
  },
];

export default function PersonnelDossier() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 md:pt-32 pb-20 font-sans text-gray-300">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        
        {/* Dossier Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-12 md:mb-20 p-6 md:p-12 bg-[#161616] border border-[#1f2937] rounded-2xl md:rounded-3xl overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 text-center md:text-left">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-28 h-28 md:w-40 md:h-44 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/5 flex items-center justify-center text-4xl md:text-5xl grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl"
            >
              🧑‍💻
            </motion.div>
            
            <div className="flex-1">
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] md:text-[10px] font-mono uppercase tracking-widest mb-4"
              >
                <ShieldCheck size={10} />
                Verified Personnel Log
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight uppercase"
              >
                Deden Hidayat
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-base md:text-lg text-gray-500 font-mono mb-6 uppercase tracking-tighter"
              >
                Systems Engineer // ID_0923
              </motion.p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 text-xs md:text-sm text-gray-400">
                <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-lg border border-white/5 font-mono">
                  <Briefcase size={14} className="text-cyan-500" />
                  R&D @ PT GSPE
                </span>
                <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-lg border border-white/5 font-mono">
                  <MapPin size={14} className="text-gray-600" />
                  Semarang, ID
                </span>
              </div>
            </div>
            
            <div className="flex flex-row md:flex-col gap-3">
              <a href="https://github.com/deenqtt" target="_blank" className="p-2.5 md:p-3 rounded-xl bg-black/40 border border-[#1f2937] text-gray-500 hover:text-white transition-colors hover:border-cyan-500/30"><Github size={20} /></a>
              <a href="https://www.linkedin.com/in/deden-hidayat-a0b08524a/" target="_blank" className="p-2.5 md:p-3 rounded-xl bg-black/40 border border-[#1f2937] text-gray-500 hover:text-white transition-colors hover:border-cyan-500/30"><Linkedin size={20} /></a>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 text-gray-400">
          
          {/* Main Dossier Content (2/3) */}
          <div className="lg:col-span-2 space-y-16 md:space-y-20">
            
            {/* Section 01: Narrative Journey */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <Milestone size={14} />
                01 // Operational History
              </h2>
              <div className="space-y-6 text-gray-400 leading-relaxed text-sm md:text-base font-mono uppercase tracking-tighter">
                <p>
                  Started with <span className="text-white font-medium underline underline-offset-4 decoration-cyan-500/30">Electrical Engineering Foundations</span> at SMKN Jateng. Focused on industrial panel schematics and PCB design. This provided the structural logic required for complex systems.
                </p>
                <p>
                  Now operating in <span className="text-white font-medium">R&D</span>, specializing in bridging bare-metal firmware and cloud telemetry. Architecting middleware for 10+ industrial protocols.
                </p>
              </div>
            </motion.section>

            {/* Section 02: Operational Milestones (Achievements) */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <Milestone size={14} />
                02 // Deployment Milestones
              </h2>
              <div className="space-y-4">
                {achievements.slice(0, 4).map((m) => (
                  <div key={m.id} className="group flex items-start gap-4 md:gap-6 p-4 rounded-2xl border border-white/[0.03] hover:bg-white/[0.02] transition-colors hover:border-cyan-500/10">
                    <span className="text-[9px] font-mono text-gray-600 mt-1 uppercase tracking-tighter shrink-0 w-14">
                      {new Date(m.date + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </span>
                    <div>
                      <h3 className="text-white font-semibold text-xs md:text-sm mb-1 group-hover:text-cyan-400 transition-colors font-mono uppercase tracking-tight">{m.title}</h3>
                      <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed font-mono">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Section 03: Professional Validations (Certs) */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <Award size={14} />
                03 // Technical Validations
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {certificates.slice(0, 6).map((c) => (
                  <div key={c.id} className="p-4 rounded-xl bg-[#161616] border border-[#1f2937] hover:border-white/10 transition-all">
                    <span className="text-[8px] font-mono text-gray-600 uppercase tracking-widest">{c.category}</span>
                    <h3 className="text-[11px] md:text-xs font-medium text-gray-300 mt-1 font-mono uppercase tracking-tight leading-tight">{c.title}</h3>
                    <p className="text-[9px] text-gray-500 mt-1 uppercase font-mono tracking-tighter">{c.issuer}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar Inventory (1/3) */}
          <div className="space-y-8 md:space-y-12">
            
            {/* Technical Stack Inventory */}
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-[#0d0d0d] border border-[#1f2937]"
            >
              <h2 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                <Cpu size={14} />
                System Inventory
              </h2>
              <div className="space-y-8">
                {techStack.map((group) => (
                  <div key={group.category}>
                    <h3 className={`text-[9px] font-mono uppercase mb-3 ${group.color} tracking-[0.15em]`}>{group.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span key={item} className="px-2 py-1 rounded text-[9px] bg-white/5 border border-white/5 text-gray-400 font-mono uppercase tracking-tighter">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Availability Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 text-center"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse mx-auto mb-3" />
              <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-1">Status: Open_Channel</p>
              <p className="text-[9px] text-gray-500 font-mono uppercase tracking-tighter">Available for remote engineering.</p>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
