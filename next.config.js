// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/client', // ✅ ضروری
  assetPrefix: '/client/', // ✅ ضروری
  images: {
    unoptimized: true,
  },
  trailingSlash: true, // ✅ برای Nginx بهتره
};

module.exports = nextConfig;