/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
   reactCompiler: true,
   images: {
      qualities: [60],
      minimumCacheTTL: 31556952, // 1 year
      deviceSizes: [640, 750, 828, 1080, 1200, 1920],
      remotePatterns: [
         {
            protocol: 'https',
            hostname: '**',
         },
      ],
   },
   // async redirects() {
   //    return [
   //       {
   //          source: '/:path*',
   //          has: [{ type: 'host', value: 'www.ethos-blog.com' }],
   //          destination: 'https://ethos-blog.com/:path*',
   //          permanent: true,
   //       },
   //    ];
   // },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
