import type { Metadata } from 'next';
import { certificates } from '@/data/certs';
import { ExternalLink, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Certificates',
  description: 'Certifications earned by Deden Hidayat.',
};

const categoryColor: Record<string, string> = {
  IoT: 'text-cyan-400',
  Backend: 'text-purple-400',
  Frontend: 'text-blue-400',
  IT: 'text-green-400',
  Programming: 'text-yellow-400',
  Cloud: 'text-orange-400',
};

export default function CertsPage() {
  const categories = Array.from(new Set(certificates.map((c) => c.category)));

  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-20">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Award size={24} className="text-cyan-400" />
          <h1 className="text-4xl font-bold text-white">
            <span className="text-gradient">Certificates</span>
          </h1>
        </div>
        <div className="w-12 h-0.5 bg-cyan-500 rounded mb-4" />
        <p className="text-gray-400">
          {certificates.length} certifications across {categories.length} categories.
        </p>
      </div>

      {/* Filter categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <span
            key={cat}
            className={`text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 ${
              categoryColor[cat] || 'text-gray-400'
            }`}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-[#161616] border border-[#1f2937] rounded-xl p-5 hover:border-cyan-500/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span
                  className={`text-xs font-mono uppercase tracking-wider ${
                    categoryColor[cert.category] || 'text-gray-400'
                  }`}
                >
                  {cert.category}
                </span>
                <h3 className="text-white font-medium mt-1 mb-1 leading-snug">{cert.title}</h3>
                <p className="text-gray-500 text-sm">{cert.issuer}</p>
                <p className="text-gray-600 text-xs font-mono mt-2">
                  {new Date(cert.date + '-01').toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              {cert.url && cert.url !== '#' && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-500 hover:text-cyan-400 transition-colors shrink-0"
                  aria-label="View certificate"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
