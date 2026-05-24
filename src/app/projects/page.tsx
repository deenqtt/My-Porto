'use client';

import { useState, useMemo } from 'react';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/projects/ProjectCard';
import FeaturedCaseStudy from '@/components/projects/FeaturedCaseStudy';
import { Search } from 'lucide-react';

const tabs = [
  { key: 'all',          label: 'All Systems',          desc: 'Full directory' },
  { key: 'protocol-in',  label: 'Protocol IN',  desc: 'Industrial pollers' },
  { key: 'protocol-out', label: 'Protocol OUT', desc: 'Protocol servers' },
  { key: 'mobile',       label: 'Mobile',       desc: 'Control apps' },
  { key: 'other',        label: 'Others',       desc: 'AI & Robotics' },
] as const;

type TabKey = (typeof tabs)[number]['key'];

const FEATURED_IDS = ['telemetry-bridge', 'dynamic-dashboard', 'ai-meeting-assistant'];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Filter out featured projects for the main list
  const featuredProjects = useMemo(() => {
    return FEATURED_IDS.map(id => projects.find(p => p.id === id)).filter(Boolean);
  }, []);

  // 2. Filter the archive list
  const archiveProjects = useMemo(() => {
    let filtered = projects.filter(p => !FEATURED_IDS.includes(p.id));
    
    if (activeTab !== 'all') {
      filtered = filtered.filter(p => p.category === activeTab);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return filtered;
  }, [activeTab, searchQuery]);

  // Specific architecture flows for featured projects
  const getFlow = (id: string) => {
    switch(id) {
      case 'telemetry-bridge': return ['Industrial Devices', 'MQTT Bridge', 'Real-time Pipeline', 'Monitoring App'];
      case 'dynamic-dashboard': return ['Telemetry Streams', 'Data Bus', 'Widget Engine', 'Custom UI'];
      case 'ai-meeting-assistant': return ['Speech Input', 'STT Pipeline', 'AI Summarizer', 'Automation Controller'];
      default: return [];
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Engineering <span className="text-gradient">Showcase</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
            A deep dive into system architectures, industrial protocols, and real-time data orchestration.
          </p>
        </div>

        {/* SECTION 1: Featured Architectures */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-sm font-mono text-cyan-400 uppercase tracking-[0.3em]">
              01 // Featured Architectures
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/20 to-transparent" />
          </div>

          <div className="space-y-24">
            {featuredProjects.map((project) => (
              project && <FeaturedCaseStudy 
                key={project.id} 
                project={project} 
                architectureFlow={getFlow(project.id)} 
              />
            ))}
          </div>
        </section>

        {/* SECTION 2: Systems Archive */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <h2 className="text-sm font-mono text-cyan-400 uppercase tracking-[0.3em] mb-4">
                02 // Systems Archive
              </h2>
              <p className="text-gray-500 text-sm">Industrial modules, protocol bridges, and experimental research.</p>
            </div>

            {/* Search & Filter UI */}
            <div className="flex flex-wrap items-center gap-4">
               <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input 
                    type="text"
                    placeholder="Search systems..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-[#161616] border border-[#1f2937] rounded-lg text-sm text-gray-300 focus:outline-none focus:border-cyan-500/50 w-64"
                  />
               </div>
            </div>
          </div>

          {/* Archive Tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {tabs.map((tab) => {
              const count = tab.key === 'all' 
                ? projects.filter(p => !FEATURED_IDS.includes(p.id)).length
                : projects.filter(p => p.category === tab.key && !FEATURED_IDS.includes(p.id)).length;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200 border flex items-center gap-2 ${
                    isActive
                      ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400'
                      : 'bg-[#161616] border-[#1f2937] text-gray-500 hover:text-gray-200'
                  }`}
                >
                  {tab.label}
                  <span className="opacity-40">[{count}]</span>
                </button>
              );
            })}
          </div>

          {/* Archive Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archiveProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {archiveProjects.length === 0 && (
            <div className="text-center py-24 border border-dashed border-[#1f2937] rounded-3xl">
               <p className="text-gray-600 font-mono">No systems found matching your search parameters.</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
