'use client';

import { useState } from 'react';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/projects/ProjectCard';

const tabs = [
  { key: 'all',          label: 'All',          desc: 'All projects' },
  { key: 'protocol-in',  label: 'Protocol IN',  desc: 'Industrial protocol pollers' },
  { key: 'protocol-out', label: 'Protocol OUT', desc: 'Industrial protocol servers & publishers' },
  { key: 'mobile',       label: 'Mobile',       desc: 'Mobile applications' },
  { key: 'other',        label: 'Others',       desc: 'Web, AI, robotics, and more' },
] as const;

type TabKey = (typeof tabs)[number]['key'];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('all');

  const filtered =
    activeTab === 'all'
      ? projects
      : projects.filter((p) => p.category === activeTab);

  const completed = filtered.filter((p) => p.status === 'completed');
  const inProgress = filtered.filter((p) => p.status === 'in-progress');

  return (
    <div className="max-w-5xl mx-auto px-4 pt-28 pb-20">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">
          <span className="text-gradient">Projects</span>
        </h1>
        <div className="w-12 h-0.5 bg-cyan-500 rounded mb-4" />
        <p className="text-gray-400 max-w-2xl">
          Each project includes a process breakdown — not just the result, but how I got there.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => {
          const count =
            tab.key === 'all'
              ? projects.length
              : projects.filter((p) => p.category === tab.key).length;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-200 border ${
                isActive
                  ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400'
                  : 'bg-[#161616] border-[#1f2937] text-gray-400 hover:border-gray-600 hover:text-gray-200'
              }`}
            >
              {tab.label}
              <span
                className={`ml-2 text-xs px-1.5 py-0.5 rounded font-mono ${
                  isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-gray-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Stats */}
      <div className="flex gap-4 mb-10">
        {[
          { label: 'Showing', value: filtered.length },
          { label: 'Completed', value: completed.length },
          { label: 'In Progress', value: inProgress.length },
        ].map((s) => (
          <div
            key={s.label}
            className="px-4 py-2 bg-[#161616] border border-[#1f2937] rounded-lg"
          >
            <span className="text-white font-bold font-mono">{s.value}</span>
            <span className="text-gray-500 text-sm ml-2">{s.label}</span>
          </div>
        ))}
      </div>

      {/* In Progress */}
      {inProgress.length > 0 && (
        <section className="mb-12">
          <h2 className="text-sm font-mono text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            In Progress
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {inProgress.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <section>
          <h2 className="text-sm font-mono text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            Completed
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {completed.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-600 font-mono">No projects in this category.</div>
      )}
    </div>
  );
}
