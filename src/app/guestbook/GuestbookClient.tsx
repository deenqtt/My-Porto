'use client';

import { useState } from 'react';
import { GuestbookMessage } from '@/types';
import { Send, MessageSquare } from 'lucide-react';

interface Props {
  initialMessages: GuestbookMessage[];
}

export default function GuestbookClient({ initialMessages }: Props) {
  const [messages, setMessages] = useState<GuestbookMessage[]>(initialMessages);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const supabaseConfigured =
    typeof window !== 'undefined' &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/guestbook/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      setMessages((prev) => [data, ...prev]);
      setName('');
      setMessage('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError('Network error, please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="bg-[#161616] border border-[#1f2937] rounded-xl p-6">
        {!supabaseConfigured && (
          <div className="mb-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm">
            <strong>Supabase not configured.</strong> Add{' '}
            <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
            <code className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to{' '}
            <code className="font-mono">.env.local</code>.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={50}
              required
              className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#1f2937] rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Say something..."
              rows={3}
              maxLength={500}
              required
              className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#1f2937] rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
            />
            <div className="text-right text-xs text-gray-600 mt-1">{message.length}/500</div>
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          {success && (
            <p className="text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
              Message sent! Thanks for signing the guestbook 🎉
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !name.trim() || !message.trim()}
            className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold text-sm rounded-lg transition-colors"
          >
            <Send size={14} />
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      {/* Messages */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare size={16} className="text-cyan-400" />
          <span className="text-sm font-mono text-gray-400 uppercase tracking-wider">
            {messages.length} {messages.length === 1 ? 'message' : 'messages'}
          </span>
        </div>

        {messages.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            <MessageSquare size={32} className="mx-auto mb-3 opacity-30" />
            <p>No messages yet. Be the first!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-[#161616] border border-[#1f2937] rounded-xl p-4 hover:border-cyan-500/20 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white text-sm">{msg.name}</span>
                  <span className="text-xs text-gray-600 font-mono">
                    {new Date(msg.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
