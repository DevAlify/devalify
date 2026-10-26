import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/devalify',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
