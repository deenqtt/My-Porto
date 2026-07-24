import type { Metadata } from 'next';
import { Rajdhani, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const siteUrl = 'https://my-porto-coral.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Deden Hidayat — Software Engineer',
  description:
    'Software engineer bridging industrial hardware and the cloud — IoT protocols, telemetry middleware, and full-stack control centers. Firmware → middleware → API → frontend.',
  keywords: [
    'Software Engineer',
    'Industrial IoT',
    'Protocol Middleware',
    'MQTT',
    'Modbus',
    'BACnet',
    'Next.js',
    'TypeScript',
    'Embedded',
  ],
  authors: [{ name: 'Deden Hidayat', url: 'https://github.com/deenqtt' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Deden Hidayat — Software Engineer',
    description:
      'Bridging factory-floor hardware and the cloud — industrial protocols, telemetry middleware, full-stack dashboards.',
    siteName: 'Deden Hidayat',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deden Hidayat — Software Engineer',
    description:
      'Bridging factory-floor hardware and the cloud — industrial protocols, telemetry middleware, full-stack dashboards.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
