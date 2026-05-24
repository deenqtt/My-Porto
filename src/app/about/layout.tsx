import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personnel Dossier',
  description: 'Technical personnel dossier // Deden Hidayat — Full-Stack Systems Engineer.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
