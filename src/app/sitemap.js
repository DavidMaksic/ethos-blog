import { LOCALES, WEBSITE_URL, DEFAULT_LOCALE } from '@/src/utils/config';
import { getArticles } from '@/src/lib/data-service';

export const revalidate = 86400; // Revalidate once a day

function createAlternates(path) {
   return LOCALES.reduce((acc, locale) => {
      // Only add locale prefix if it's not the default locale
      const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
      acc[locale] = `${WEBSITE_URL}${prefix}${path}`;
      return acc;
   }, {});
}

export default async function sitemap() {
   const articles = await getArticles();
   const now = new Date().toISOString();
   const urls = [];

   // Static pages
   const staticPages = ['', '/archive', '/about'];
   staticPages.forEach((path) => {
      LOCALES.forEach((locale) => {
         const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
         urls.push({
            url: `${WEBSITE_URL}${prefix}${path}`,
            lastModified: now,
            changeFrequency:
               path === ''
                  ? 'daily'
                  : path === '/archive'
                  ? 'weekly'
                  : 'monthly',
            priority: path === '' ? 1.0 : path === '/archive' ? 0.6 : 0.5,
            alternates: createAlternates(path),
         });
      });
   });

   // Article pages
   articles.forEach((article) => {
      LOCALES.forEach((locale) => {
         const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
         urls.push({
            url: `${WEBSITE_URL}${prefix}/${article.slug}`,
            lastModified: article.updatedAt
               ? new Date(article.updatedAt).toISOString()
               : now,
            changeFrequency: 'weekly',
            priority: 0.8,
            images: article.image ? [article.image] : undefined,
            alternates: createAlternates(`/${article.slug}`),
         });
      });
   });

   return urls;
}
