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
    default: 'Deden Hidayat — IoT & Fullstack Developer',
    template: '%s | Deden Hidayat',
  },
  description:
    'Portfolio of Deden Hidayat — IoT & Fullstack Developer from Indonesia. Building end-to-end systems from ESP32 firmware to cloud dashboards.',
  keywords: ['IoT', 'Fullstack', 'ESP32', 'Next.js', 'TypeScript', 'Indonesia', 'Developer'],
  authors: [{ name: 'Deden Hidayat', url: 'https://github.com/deenqtt' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    title: 'Deden Hidayat — IoT & Fullstack Developer',
    description: 'Building end-to-end IoT systems from firmware to cloud dashboards.',
    siteName: 'Deden Hidayat Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deden Hidayat — IoT & Fullstack Developer',
    description: 'Building end-to-end IoT systems from firmware to cloud dashboards.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
