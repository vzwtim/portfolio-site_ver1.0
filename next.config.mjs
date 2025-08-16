// next.config.mjs（ESM）
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'via.placeholder.com', pathname: '/**' },
    ],
  },
};
export default nextConfig;
