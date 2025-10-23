import { WEBSITE_URL } from '@/src/utils/config';

export default function robots() {
   return {
      rules: {
         userAgent: '*',
         allow: '/',
         disallow: ['/user/', '/_next/', '/api/'],
      },
      sitemap: `${WEBSITE_URL}/sitemap.xml`,
   };
}
