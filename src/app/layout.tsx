import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Deden Hidayat — Software Engineer',
    description:
      'Bridging factory-floor hardware and the cloud — industrial protocols, telemetry middleware, full-stack dashboards.',
    siteName: 'Deden Hidayat',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
