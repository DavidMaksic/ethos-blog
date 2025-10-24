import { getArticles } from '@/src/lib/data-service';
import { WEBSITE_URL } from '@/src/utils/config';
import { getLocale } from 'next-intl/server';

export const revalidate = 86400; // Revalidate once a day

export default async function sitemap() {
   const articles = await getArticles();
   const locale = await getLocale();
   const baseURL = WEBSITE_URL;
   const now = new Date().toISOString();

   return [
      {
         url: baseURL,
         lastModified: now,
         changeFrequency: 'daily',
         priority: 1.0,
      },
      {
         url: `${baseURL}/${locale}/archive`,
         lastModified: now,
         changeFrequency: 'weekly',
         priority: 0.6,
      },
      {
         url: `${baseURL}/${locale}/about`,
         lastModified: now,
         changeFrequency: 'monthly',
         priority: 0.5,
      },
      ...articles.map((item) => ({
         url: `${baseURL}/${locale}/${item.slug}`,
         lastModified: item.updatedAt
            ? new Date(item.updatedAt).toISOString()
            : now,
         changeFrequency: 'weekly',
         priority: 0.8,
         images: [item.image],
      })),
   ];
}
