import type { Metadata } from 'next';
import GuestbookClient from './GuestbookClient';
import { supabase } from '@/lib/supabase';
import { GuestbookMessage } from '@/types';

export const metadata: Metadata = {
  title: 'Guestbook',
  description: 'Leave a message for Deden Hidayat.',
};

export const revalidate = 0;

async function getMessages(): Promise<GuestbookMessage[]> {
  if (!supabase) return [];

  const { data } = await supabase
    .from('guestbook')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  return data || [];
}

export default async function GuestbookPage() {
  const messages = await getMessages();

  return (
    <div className="max-w-2xl mx-auto px-4 pt-28 pb-20">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">
          <span className="text-gradient">Guestbook</span>
        </h1>
        <div className="w-12 h-0.5 bg-cyan-500 rounded mb-4" />
        <p className="text-gray-400">Leave a message, say hi, or drop a thought.</p>
      </div>

      <GuestbookClient initialMessages={messages} />
    </div>
  );
}
