import Hero from '@/components/home/Hero';
import QuickStats from '@/components/home/QuickStats';
import { fetchGitHubStats } from '@/lib/github';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const revalidate = 3600;

export default async function Home() {
  const stats = await fetchGitHubStats();

  return (
    <>
      <Hero />
      <QuickStats stats={stats} />

      {/* Featured section */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              title: 'Projects',
              desc: 'IoT systems, web apps, and more — with full process breakdowns.',
              href: '/projects',
            },
            {
              title: 'Dev Dashboard',
              desc: 'Live GitHub stats, WakaTime coding hours, and Web Vitals.',
              href: '/dashboard',
            },
            {
              title: 'Guestbook',
              desc: 'Leave a message — I read every one!',
              href: '/guestbook',
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block p-6 bg-[#161616] border border-[#1f2937] rounded-xl hover:border-cyan-500/40 transition-all duration-300"
            >
              <h3 className="text-white font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              <ArrowRight
                size={14}
                className="text-cyan-400 mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
