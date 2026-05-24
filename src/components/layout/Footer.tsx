import Link from 'next/link';
import { Github, Linkedin, Mail, Terminal, Database } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1f2937] bg-[#0a0a0a] mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          
          {/* Identity & Registry */}
          <div className="flex flex-col gap-6">
            <div>
              <Link
                href="/"
                className="flex items-center gap-2 font-mono text-cyan-400 font-bold text-lg mb-2"
              >
                <Terminal size={20} />
                <span>deenqtt</span>
              </Link>
              <p className="text-sm text-gray-500 font-mono uppercase tracking-tighter">
                Full-Stack Systems Engineer // R&D
              </p>
            </div>
            
            <Link 
              href="/guestbook"
              className="inline-flex items-center gap-2 text-[10px] font-mono text-gray-600 hover:text-cyan-500 transition-colors uppercase tracking-[0.2em] border border-white/5 px-3 py-1.5 rounded-lg bg-white/[0.02]"
            >
              <Database size={12} />
              [SYSTEM_REGISTRY]
            </Link>
          </div>

          {/* Socials & Legal */}
          <div className="flex flex-col md:items-end gap-6">
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/deenqtt"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#161616] border border-[#1f2937] text-gray-500 hover:text-cyan-400 hover:border-cyan-500/20 transition-all"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/deden-hidayat-a0b08524a/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#161616] border border-[#1f2937] text-gray-500 hover:text-blue-400 hover:border-blue-500/20 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:deden@gspe.co.id"
                className="p-2.5 rounded-xl bg-[#161616] border border-[#1f2937] text-gray-500 hover:text-cyan-400 hover:border-cyan-500/20 transition-all"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>

            <div className="text-right">
              <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
                © {year} ARCHIVE_DATA // SEMARANG, ID
              </p>
              <p className="text-[9px] text-gray-700 font-mono mt-1 uppercase">
                Built with Next.js • Tailwind • Supabase
              </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
