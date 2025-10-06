/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
   images: {
      qualities: [60],
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
