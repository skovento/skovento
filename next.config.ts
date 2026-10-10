import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/industries',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/industries/:slug',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/solutions/local-business',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/audit',
        destination: '/contact',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
