'use client';

import { useState } from 'react';
import { Project } from '@/types';
import Badge from '@/components/ui/Badge';
import { Github, ExternalLink, ChevronDown, ChevronUp, CheckCircle, Clock, Circle } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const statusConfig = {
  completed: { label: 'Completed', color: 'green' as const, icon: CheckCircle },
  'in-progress': { label: 'In Progress', color: 'yellow' as const, icon: Clock },
  planned: { label: 'Planned', color: 'gray' as const, icon: Circle },
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const [showProcess, setShowProcess] = useState(false);
  const status = statusConfig[project.status];
  const StatusIcon = status.icon;

  return (
    <div className="bg-[#161616] border border-[#1f2937] rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-semibold text-white leading-tight">{project.title}</h3>
          <Badge variant={status.color}>
            <StatusIcon size={10} className="mr-1" />
            {status.label}
          </Badge>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded bg-white/5 border border-white/10 text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Github size={14} />
              Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <ExternalLink size={14} />
              Demo
            </a>
          )}
          <span className="text-xs text-gray-600 ml-auto font-mono">{project.year}</span>
        </div>
      </div>

      {/* Process toggle */}
      <div className="border-t border-[#1f2937]">
        <button
          onClick={() => setShowProcess(!showProcess)}
          className="w-full flex items-center justify-between px-6 py-3 text-sm text-gray-400 hover:text-gray-200 hover:bg-white/[0.02] transition-colors"
        >
          <span className="font-mono text-xs uppercase tracking-wider">Show Process</span>
          {showProcess ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {showProcess && (
          <div className="px-6 pb-6">
            <div className="relative pl-4">
              {/* Timeline line */}
              <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500 to-transparent" />

              <div className="space-y-5">
                {project.process.map((step, i) => (
                  <div key={i} className="relative">
                    {/* Dot */}
                    <div className="absolute -left-[17px] top-1.5 w-2 h-2 rounded-full bg-cyan-500" />

                    <div className="pl-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-cyan-400">{step.phase}</span>
                        {step.duration && (
                          <span className="text-xs text-gray-600 font-mono">{step.duration}</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
