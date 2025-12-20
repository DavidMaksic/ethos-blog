/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
   reactCompiler: true,
   images: {
      qualities: [60],
      minimumCacheTTL: 2629746, // 6 months
      deviceSizes: [640, 750, 828, 1080, 1200, 1920],
      remotePatterns: [
         {
            protocol: 'https',
            hostname: '**',
         },
      ],
   },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
