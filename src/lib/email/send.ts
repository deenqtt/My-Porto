import type { ContactPayload, SendEmailResult } from './types';
import { getEmailClient } from './client';
import { buildContactEmail } from './templates/contact';

export async function sendContactEmail(data: ContactPayload): Promise<SendEmailResult> {
  const client = getEmailClient();
  const { subject, text, html } = buildContactEmail(data);

  const { error } = await client.emails.send({
    from: process.env.EMAIL_FROM ?? 'Portfolio Contact <onboarding@resend.dev>',
    to: process.env.EMAIL_TO ?? 'dedenh842@gmail.com',
    replyTo: data.email,
    subject,
    text,
    html,
  });

  if (error) {
    console.error('sendContactEmail error:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
