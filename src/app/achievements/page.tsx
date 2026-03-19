import type { Metadata } from 'next';
import { achievements } from '@/data/achievements';

export const metadata: Metadata = {
  title: 'Achievements',
  description: 'Milestones and achievements of Deden Hidayat.',
};

const categoryColor: Record<string, string> = {
  Project: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  'Open Source': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  GitHub: 'text-gray-400 bg-gray-500/10 border-gray-500/20',
  Skill: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  Career: 'text-green-400 bg-green-500/10 border-green-500/20',
  Personal: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
};

export default function AchievementsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-20">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">
          <span className="text-gradient">Achievements</span>
        </h1>
        <div className="w-12 h-0.5 bg-cyan-500 rounded mb-4" />
        <p className="text-gray-400">Milestones along the journey.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {achievements.map((item) => (
          <div
            key={item.id}
            className="bg-[#161616] border border-[#1f2937] rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl shrink-0">{item.icon}</div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                      categoryColor[item.category] || categoryColor.Personal
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-600 font-mono">
                    {new Date(item.date + '-01').toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
