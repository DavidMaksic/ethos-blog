import { getArticles } from '@/src/lib/data-service';

export const revalidate = 604800; // Revalidate once a week

export default async function sitemap() {
   const articles = await getArticles();

   return [
      {
         url: process.env.WEBSITE_URL,
         lastModified: new Date().toISOString(),
         alternates: {
            languages: {
               en: `${process.env.WEBSITE_URL}/`,
               sr: `${process.env.WEBSITE_URL}/sr`,
            },
         },
      },
      ...articles.map((item) => ({
         url: `${process.env.WEBSITE_URL}/${item.slug}`,
         lastModified: item.updatedAt ?? new Date().toISOString(),
      })),
   ];
}
