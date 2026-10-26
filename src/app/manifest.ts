import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Skovento — Software & Digital Engineering Studio',
    short_name: 'Skovento',
    description: 'Websites, web platforms, mobile apps, AI automation and business software.',
    start_url: '/',
    display: 'standalone',
    background_color: '#060a13',
    theme_color: '#060a13',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
