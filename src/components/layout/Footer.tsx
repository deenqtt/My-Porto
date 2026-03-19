import Link from 'next/link';
import { Github, Linkedin, Mail, Terminal } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1f2937] bg-[#0a0a0a] mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-mono text-cyan-400 font-bold text-base"
            >
              <Terminal size={16} />
              deenqtt
            </Link>
            <p className="text-sm text-gray-500">IoT Staff · R&amp;D @ PT GSPE</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/deenqtt"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-cyan-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/deden-hidayat-a0b08524a/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:deden@example.com"
              className="p-2 text-gray-500 hover:text-cyan-400 transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>

          <p className="text-xs text-gray-600 font-mono">
            © {year} Deden Hidayat · Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
