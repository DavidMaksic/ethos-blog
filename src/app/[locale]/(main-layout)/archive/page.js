import { getArticles, getCategories } from '@/src/lib/data-service';
import { getTranslations } from 'next-intl/server';
import { WEBSITE_URL } from '@/src/utils/config';

import ArchiveHeading from '@/src/ui/archive-heading';
import Categories from '@/src/ui/categories/categories';
import Languages from '@/src/ui/languages';
import Articles from '@/src/ui/articles/articles';
import SortBy from '@/src/ui/operations/sort-by';

export const dynamic = 'force-static';
export const revalidate = 300;

export async function generateMetadata({ params }) {
   const [param, t] = await Promise.all([params, getTranslations()]);
   const { locale } = param;
   const prefix = locale === 'en' ? '' : `/${locale}`;

   return {
      title: t('Page-descriptions.archive-name'),
      alternates: {
         canonical: `${WEBSITE_URL}${prefix}/archive`,
         languages: {
            en: `${WEBSITE_URL}/archive`,
            sr: `${WEBSITE_URL}/sr/archive`,
         },
      },
   };
}

async function Page({ params, searchParams }) {
   const [param, searchParam, articles, categories, t] = await Promise.all([
      params,
      searchParams,
      getArticles(),
      getCategories(),
      getTranslations(),
   ]);

   const { locale } = param;
   const prefix = locale === 'en' ? '' : `/${locale}`;

   const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: t('Page-descriptions.archive-name'),
      description: t('Page-descriptions.archive'),
      url: `${WEBSITE_URL}${prefix}/archive`,
      inLanguage: locale,
      keywords: ['Ethos Blog', 'Archive', 'Blog posts', 'Articles'],
      mainEntityOfPage: {
         '@type': 'WebPage',
         '@id': `${WEBSITE_URL}${prefix}/archive`,
      },
   };

   return (
      <div className="grid grid-cols-[2fr_1fr] md:grid-cols-1 gap-10 xs:gap-14 2xl:mt-3">
         <h1 className="sr-only">{t('H1.archive-page')}</h1>

         <section className="space-y-7 lg:space-y-5 md:order-2">
            <div className="flex justify-between">
               <ArchiveHeading />

               <SortBy
                  options={[
                     {
                        value: 'created_at-asc',
                        label: t('Sort.latest'),
                     },
                     {
                        value: 'created_at-desc',
                        label: t('Sort.oldest'),
                     },
                     {
                        value: 'title-asc',
                        label: t('Sort.a-z'),
                     },
                     {
                        value: 'title-desc',
                        label: t('Sort.z-a'),
                     },
                  ]}
               />
            </div>

            <Articles
               isArchive={true}
               articles={articles}
               categories={categories}
               style="dark:bg-primary-300/15"
            />
         </section>

         <section className="space-y-12 md:order-1 md:flex md:flex-col md:gap-6">
            <Categories categories={categories} isArchive={true} />
            <Languages />
         </section>

         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
            }}
         />
      </div>
   );
}

export default Page;
