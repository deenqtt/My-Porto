import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: {
    default: 'Deden Hidayat — Full-Stack Systems Engineer',
    template: '%s | Deden Hidayat',
  },
  description:
    'Full-Stack Systems Engineer specializing in real-time telemetry, IoT architecture, and high-performance web applications. Bridging the gap between hardware and cloud.',
  keywords: [
    'Full-Stack Engineer',
    'Systems Architect',
    'IoT Telemetry',
    'Real-time Systems',
    'Next.js',
    'TypeScript',
    'Industrial IoT',
    'MQTT',
    'Protocol Bridging',
  ],
  authors: [{ name: 'Deden Hidayat', url: 'https://github.com/deenqtt' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Deden Hidayat — Full-Stack Systems Engineer',
    description: 'Engineering data-driven systems from low-level telemetry to modern SaaS dashboards.',
    siteName: 'Deden Hidayat Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deden Hidayat — Full-Stack Systems Engineer',
    description: 'Engineering data-driven systems from low-level telemetry to modern SaaS dashboards.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative overflow-x-hidden`}>
        <div className="scanline pointer-events-none fixed inset-0 z-50" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
