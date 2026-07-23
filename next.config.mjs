/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  outputFileTracingIncludes: {
    '/api/**/*': ['./src/data/**/*.json'],
  },
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    localPatterns: [
      {
        pathname: '/api/temp-file*',
      },
      {
        pathname: '/img/**',
      },
    ],
  },
};

export default nextConfig;
