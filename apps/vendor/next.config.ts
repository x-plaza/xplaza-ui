import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@xplaza/ui', 'recharts'],
  },
  transpilePackages: ['@xplaza/ui', '@xplaza/utils', '@xplaza/types', '@xplaza/api-client'],
};

export default nextConfig;
