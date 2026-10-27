import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/devalify',
  images: { unoptimized: true },
  trailingSlash: true,
  // One root layout per route (fonts, CSS and head script differ), so the 404 needs its own document.
  experimental: { globalNotFound: true },
};

export default nextConfig;
