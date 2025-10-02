import { getArticles } from '@/src/lib/data-service';
import { WEBSITE_URL } from '@/src/utils/config';
import { getLocale } from 'next-intl/server';

export const revalidate = 604800; // Revalidate once a week

export default async function sitemap() {
   const articles = await getArticles();
   const locale = await getLocale();
   const baseURL = WEBSITE_URL;

   return [
      {
         url: baseURL,
         lastModified: new Date().toISOString(),
         alternates: {
            languages: {
               en: `${baseURL}/`,
               sr: `${baseURL}/sr`,
            },
         },
      },
      {
         url: `${baseURL}/${locale}/archive`,
         lastModified: new Date().toISOString(),
      },
      {
         url: `${baseURL}/${locale}/about`,
         lastModified: new Date().toISOString(),
      },
      ...articles.map((item) => ({
         url: `${baseURL}/${locale}/${item.slug}`,
         lastModified: item.updatedAt ?? new Date().toISOString(),
      })),
   ];
}
