import { LOCALES, WEBSITE_URL } from '@/src/utils/config';
import { getArticles } from '@/src/lib/data-service';

export const revalidate = 86400; // Revalidate once a day

export default async function sitemap() {
   const articles = await getArticles();
   const now = new Date().toISOString();

   const urls = [];

   for (const locale of LOCALES) {
      // Static pages
      urls.push(
         {
            url: `${WEBSITE_URL}/${locale}`,
            lastModified: now,
            changeFrequency: 'daily',
            priority: 1.0,
         },
         {
            url: `${WEBSITE_URL}/${locale}/archive`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.6,
         },
         {
            url: `${WEBSITE_URL}/${locale}/about`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.5,
         }
      );

      // Article pages
      articles.forEach((item) => {
         urls.push({
            url: `${WEBSITE_URL}/${locale}/${item.slug}`,
            lastModified: item.updatedAt
               ? new Date(item.updatedAt).toISOString()
               : now,
            changeFrequency: 'weekly',
            priority: 0.8,
            images: item.image ? [item.image] : undefined,
         });
      });
   }

   return urls;
}
