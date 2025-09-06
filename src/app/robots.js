import { WEBSITE_URL } from '@/src/utils/config';

export default function robots() {
   const locales = ['en', 'sr'];

   return {
      rules: {
         userAgent: '*',
         allow: '/',
         disallow: ['/user/', '/_next/', '/api/'],
      },
      sitemap: locales.map((locale) => `${WEBSITE_URL}/${locale}/sitemap.xml`),
   };
}
