import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://my-porto-coral.vercel.app'; // Replace with actual domain if changed

  const routes = [
    '',
    '/projects',
    '/dashboard',
    '/about',
    '/contact',
    '/guestbook',
    '/achievements',
    '/certs',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}
