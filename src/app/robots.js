import { WEBSITE_URL } from '@/src/utils/config';

export default function robots() {
   return {
      rules: [
         // Block AI dataset crawlers
         {
            userAgent: 'GPTBot',
            disallow: '/',
         },
         {
            userAgent: 'CCBot',
            disallow: '/',
         },
         {
            userAgent: 'ClaudeBot',
            disallow: '/',
         },
         {
            userAgent: 'Google-Extended',
            disallow: '/',
         },
         {
            userAgent: 'Amazonbot',
            disallow: '/',
         },
         {
            userAgent: 'Bytespider',
            disallow: '/',
         },

         // Allow normal crawlers (Google Search, Bing, etc.)
         {
            userAgent: '*',
            allow: '/',
            disallow: ['/user/', '/_next/', '/api/'],
         },
      ],
      sitemap: `${WEBSITE_URL}/sitemap.xml`,
   };
}
