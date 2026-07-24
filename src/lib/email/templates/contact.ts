import type { ContactPayload } from '../types';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function buildContactEmail(data: ContactPayload): { subject: string; text: string; html: string } {
  const { name, email, subject, message } = data;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message);

  return {
    subject: `[Portfolio] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#06b6d4;margin-bottom:4px;">${safeSubject}</h2>
        <p style="color:#6b7280;font-size:13px;margin-top:0;">via Portfolio Contact Form</p>
        <hr style="border:none;border-top:1px solid #1f2937;margin:16px 0;" />
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:4px 0;color:#6b7280;font-size:13px;">Name</td></tr>
          <tr><td style="padding:4px 0;color:#111827;font-size:14px;">${safeName}</td></tr>
          <tr><td style="padding:8px 0 4px;color:#6b7280;font-size:13px;">Email</td></tr>
          <tr><td style="padding:4px 0;font-size:14px;"><a href="mailto:${safeEmail}" style="color:#06b6d4;">${safeEmail}</a></td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #1f2937;margin:16px 0;" />
        <p style="white-space:pre-wrap;color:#111827;font-size:14px;line-height:1.6;">${safeMessage}</p>
      </div>
    `,
  };
}
