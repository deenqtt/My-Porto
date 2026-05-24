'use client';

import Link from 'next/link';
import { ArrowRight, Cpu, Network, Database, Terminal } from 'lucide-react';
import TypewriterText from '@/components/ui/TypewriterText';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Hero-specific focused glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 w-full">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          
          {/* Left Column: Copy & Identity */}
          <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
            {/* System Status Badge */}
            <motion.div variants={item} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 border border-[#1f2937] backdrop-blur-sm text-sm font-mono text-gray-400 mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <span>System: <span className="text-gray-200">Online</span></span>
              <span className="text-[#1f2937] mx-1">|</span>
              <span className="text-cyan-400/80">Available for remote</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={item} className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="text-white block pb-2">Full-Stack</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Systems Engineer
              </span>
            </motion.h1>

            {/* Focused Typewriter */}
            <motion.div variants={item} className="text-xl sm:text-2xl font-mono text-gray-400 mb-8 h-8">
              <TypewriterText
                texts={[
                  '> Bridging Hardware & Software',
                  '> Building Realtime Telemetry',
                  '> Architecting Dashboards',
                ]}
              />
            </motion.div>

            {/* Refined Description */}
            <motion.p variants={item} className="text-gray-400/90 text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              I build complex data-driven systems. From polling low-level industrial protocols (MQTT, Modbus) to architecting high-performance Next.js control centers.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
              <Link
                href="/projects"
                className="group flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Explore Systems
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-6 py-3 bg-[#161616] border border-[#1f2937] hover:border-cyan-500/40 text-gray-300 hover:text-white rounded-lg transition-all duration-200"
              >
                <Terminal size={16} className="text-cyan-400" />
                View Telemetry
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Technical Abstraction (The "Complex but Clean" visual) */}
          <motion.div 
            variants={item}
            className="hidden lg:flex flex-col gap-4 pl-12"
          >
             {/* This acts as a visual teaser for your engineering mindset */}
             <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-[#1f2937] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Network size={100} className="text-cyan-500" />
                </div>
                <Cpu size={24} className="text-cyan-400 mb-4" />
                <h3 className="text-white font-semibold mb-2 text-lg">Hardware to Cloud Pipeline</h3>
                <p className="text-sm text-gray-500 font-mono mb-4">ESP32 • Raspberry Pi • MQTT • API</p>
                <div className="h-1 w-full bg-[#1f2937] rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-1/3 animate-pulse"></div>
                </div>
             </div>

             <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-[#1f2937] relative overflow-hidden group translate-x-8">
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Database size={100} className="text-blue-500" />
                </div>
                <Terminal size={24} className="text-blue-400 mb-4" />
                <h3 className="text-white font-semibold mb-2 text-lg">Interactive Dashboards</h3>
                <p className="text-sm text-gray-500 font-mono mb-4">Next.js • TypeScript • Tailwind</p>
                <div className="h-1 w-full bg-[#1f2937] rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 w-2/3 animate-pulse"></div>
                </div>
             </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
