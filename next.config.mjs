/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
   images: {
      qualities: [60],
      minimumCacheTTL: 2678400, // 31 days
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
