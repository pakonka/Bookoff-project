/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dt-bookmax.myshopify.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'production-image-proxy.reproio.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'content.bookoff.co.jp',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'shopping.bookoff.co.jp',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.shinchosha.co.jp',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'my.bookoff.co.jp',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.fril.jp',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ogre.natalie.mu',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'shogakukan-comic.jp',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'yt3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'thicc-uwu.mywaifulist.moe',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

