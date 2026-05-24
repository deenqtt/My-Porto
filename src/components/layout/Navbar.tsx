'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Terminal, ArrowRight, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home', code: '00' },
  { href: '/projects', label: 'Projects', code: '01' },
  { href: '/notes', label: 'Notes', code: '02' },
  { href: '/dashboard', label: 'Dashboard', code: '03' },
  { href: '/about', label: 'Personnel', code: '04' },
  { href: '/contact', label: 'Contact', code: '05' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          scrolled || isOpen ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1f2937]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-mono text-cyan-400 font-bold text-lg hover:text-cyan-300 transition-colors z-[70]"
            >
              <Terminal size={20} />
              <span>deenqtt</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? 'text-cyan-400 bg-cyan-400/10'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-gray-200 transition-colors z-[70]"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col pt-24 px-6 overflow-hidden md:hidden"
          >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
            
            {/* Menu Header Metadata */}
            <div className="flex items-center justify-between border-b border-[#1f2937] pb-6 mb-8 relative z-10">
              <div className="flex items-center gap-2">
                 <Shield size={14} className="text-cyan-500" />
                 <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Command_Access_Node</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-500/50 italic">SYS_REV: 8.0.1</span>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.2 }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all"
                  >
                    <div className="flex items-center gap-4">
                       <span className="text-[10px] font-mono text-gray-600 group-hover:text-cyan-500 transition-colors">[{link.code}]</span>
                       <span className={`text-xl font-bold ${pathname === link.href ? 'text-cyan-400' : 'text-white'}`}>
                          {link.label.toUpperCase()}
                       </span>
                    </div>
                    <ArrowRight size={18} className="text-gray-700 group-hover:text-cyan-400 transition-colors" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Menu Footer */}
            <div className="mt-auto mb-10 pt-10 border-t border-[#1f2937] relative z-10">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
                     <Terminal size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-tight">Deden Hidayat</div>
                    <div className="text-[9px] font-mono text-gray-500 uppercase">Systems Engineer // Semarang, ID</div>
                  </div>
               </div>
               <p className="text-[9px] font-mono text-gray-700 leading-relaxed uppercase tracking-tighter">
                  AUTHORIZED ACCESS ONLY. ALL SESSIONS LOGGED VIA TELEMETRY NODE.
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
