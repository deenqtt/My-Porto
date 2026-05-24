'use client';

import { Project } from '@/types';
import { Github, ExternalLink, ArrowRight, ArrowDown, Cpu, Network, Zap } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { motion } from 'framer-motion';

interface FeaturedCaseStudyProps {
  project: Project;
  architectureFlow: string[]; // e.g., ["ESP32", "MQTT", "Python Bridge", "Next.js"]
}

export default function FeaturedCaseStudy({ project, architectureFlow }: FeaturedCaseStudyProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="group relative bg-[#0d0d0d] border border-[#1f2937] rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500 mb-16"
    >
      {/* Visual background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/5 to-transparent pointer-events-none" />
      
      <div className="grid lg:grid-cols-5">
        
        {/* Left Section: Info & Narrative (3/5) */}
        <div className="lg:col-span-3 p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Badge variant="green">Featured Architecture</Badge>
            <span className="text-xs text-gray-600 font-mono tracking-widest uppercase">{project.year}</span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
            {project.title}
          </h3>

          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Architecture Flow Visualization */}
          <div className="mb-10 p-6 rounded-2xl bg-black/40 border border-[#1f2937] backdrop-blur-sm relative overflow-hidden">
            <h4 className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <Network size={14} />
              System Architecture Flow
            </h4>
            
            {/* Desktop Flow (Horizontal) */}
            <div className="hidden sm:flex flex-wrap items-center gap-3">
              {architectureFlow.map((step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#1f2937] text-gray-300 text-xs font-mono uppercase tracking-tighter shadow-xl">
                    {step}
                  </div>
                  {index < architectureFlow.length - 1 && (
                    <ArrowRight size={14} className="text-cyan-500/40" />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Flow (Vertical) */}
            <div className="flex sm:hidden flex-col items-start gap-3">
              {architectureFlow.map((step, index) => (
                <div key={step} className="flex flex-col items-center gap-3 w-full">
                  <div className="px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#1f2937] text-gray-300 text-xs font-mono uppercase tracking-tighter w-full text-center">
                    {step}
                  </div>
                  {index < architectureFlow.length - 1 && (
                    <ArrowDown size={14} className="text-cyan-500/40 my-1" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Key Engineering Challenges */}
          <div className="grid sm:grid-cols-2 gap-8 mb-10">
            <div>
              <h4 className="text-xs font-mono text-white mb-3 flex items-center gap-2 uppercase tracking-widest">
                <Cpu size={14} className="text-cyan-400" />
                Technical Challenge
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {project.process[0]?.description || "Optimizing real-time data flow and protocol interoperability."}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-mono text-white mb-3 flex items-center gap-2 uppercase tracking-widest">
                <Zap size={14} className="text-cyan-400" />
                Engineering Solution
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {project.process[1]?.description || "Implemented async bridging with custom protocol parsers."}
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white font-medium hover:text-cyan-400 transition-colors text-sm font-mono uppercase"
              >
                <Github size={16} />
                Source_Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white font-medium hover:text-cyan-400 transition-colors text-sm font-mono uppercase"
              >
                <ExternalLink size={16} />
                Live_Demo
              </a>
            )}
          </div>
        </div>

        {/* Right Section: Process Timeline (2/5) */}
        <div className="lg:col-span-2 bg-[#111] border-t lg:border-t-0 lg:border-l border-[#1f2937] p-8 md:p-12">
          <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] mb-10">
            Operational_Timeline
          </h4>
          <div className="space-y-8 relative">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-[#1f2937]" />
            
            {project.process.map((step, i) => (
              <div key={i} className="relative pl-6">
                <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-white uppercase tracking-tight">{step.phase}</span>
                  {step.duration && (
                    <span className="text-[9px] font-mono text-gray-600 uppercase">[{step.duration}]</span>
                  )}
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed font-mono">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
