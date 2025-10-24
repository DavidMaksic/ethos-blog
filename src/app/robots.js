import { WEBSITE_URL } from '@/src/utils/config';

export default function robots() {
   return {
      rules: {
         userAgent: '*',
         allow: '/',
         disallow: ['/user/', '/user/home', '/api/'],
      },
      sitemap: `${WEBSITE_URL}/sitemap.xml`,
   };
}
