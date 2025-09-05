import { getArticles } from '@/src/lib/data-service';
import { getLocale } from 'next-intl/server';

export const revalidate = 604800; // Revalidate once a week

export default async function sitemap() {
   const articles = await getArticles();
   const locale = await getLocale();

   return [
      {
         url: process.env.NEXT_PUBLIC_WEBSITE_URL,
         lastModified: new Date().toISOString(),
         alternates: {
            languages: {
               en: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/`,
               sr: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/sr`,
            },
         },
      },
      ...articles.map((item) => ({
         url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${locale}/${item.slug}`,
         lastModified: item.updatedAt ?? new Date().toISOString(),
      })),
   ];
}
