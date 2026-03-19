import type { Metadata } from 'next';
import ContactForm from './ContactForm';
import { Github, Linkedin, Mail, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Deden Hidayat.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-20">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">
          Get in <span className="text-gradient">Touch</span>
        </h1>
        <div className="w-12 h-0.5 bg-cyan-500 rounded mb-4" />
        <p className="text-gray-400">
          Have a project idea? Want to collaborate? Or just want to say hi?
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Contact info */}
        <div className="md:col-span-2 space-y-5">
          <div className="bg-[#161616] border border-[#1f2937] rounded-xl p-6">
            <h2 className="text-white font-semibold mb-4">Connect</h2>
            <div className="space-y-3">
              {[
                {
                  icon: Github,
                  label: 'GitHub',
                  value: '@deenqtt',
                  href: 'https://github.com/deenqtt',
                },
                {
                  icon: Linkedin,
                  label: 'LinkedIn',
                  value: 'deden-hidayat',
                  href: 'https://www.linkedin.com/in/deden-hidayat-a0b08524a/',
                },
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'dedenh842@gmail.com',
                  href: 'mailto:dedenh842@gmail.com',
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.03] transition-colors group"
                >
                  <Icon size={16} className="text-cyan-400 shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500">{label}</div>
                    <div className="text-sm text-gray-300 group-hover:text-white transition-colors">
                      {value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-[#161616] border border-[#1f2937] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow" />
              <span className="text-sm text-gray-300">Available for freelance</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              Currently open for IoT projects, web development, and technical consulting.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-3">
          <div className="bg-[#161616] border border-[#1f2937] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare size={16} className="text-cyan-400" />
              <h2 className="text-white font-semibold">Send a Message</h2>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
