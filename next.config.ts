import type { NextConfig } from 'next';

// Export estático: o MVP não tem backend e é servido como arquivos (Amplify Hosting).
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
