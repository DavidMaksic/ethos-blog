import { getArticles, getCategories } from '@/src/lib/data-service';
import { getTranslations } from 'next-intl/server';
import { WEBSITE_URL } from '@/src/utils/config';

import ArchiveHeading from '@/src/ui/header/archive-heading';
import LanguageFilter from '@/src/ui/operations/language-filter';
import FilterDrawer from '@/src/ui/operations/filter-drawer';
import Categories from '@/src/ui/categories/categories';
import Articles from '@/src/ui/articles/articles';
import SortBy from '@/src/ui/operations/sort-by';
import Search from '@/src/ui/operations/search';
import { Cormorant_Garamond, Crimson_Text } from 'next/font/google';

/* Main font */
const crimsonText = Crimson_Text({
   subsets: ['latin'],
   style: ['normal', 'italic'],
   weight: ['400', '600', '700'],
   variable: '--font-crimsonText',
});

export const dynamic = 'force-static';
export const revalidate = 604800;

export async function generateMetadata({ params }) {
   const [param, t] = await Promise.all([params, getTranslations()]);
   const { locale } = param;
   const prefix = locale === 'en' ? '' : `/${locale}`;

   return {
      title: t('Page-descriptions.archive-name'),
      description: t('Page-descriptions.archive'),
      alternates: {
         canonical: `${WEBSITE_URL}${prefix}/archive`,
         languages: {
            en: `${WEBSITE_URL}/archive`,
            sr: `${WEBSITE_URL}/sr/archive`,
         },
      },
   };
}

async function Page({ params }) {
   const [param, articles, categories] = await Promise.all([
      params,
      getArticles(),
      getCategories(),
   ]);
   const { locale } = param;

   const t = await getTranslations();
   const prefix = locale === 'en' ? '' : `/${locale}`;

   const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: t('Page-descriptions.archive-name'),
      description: t('Page-descriptions.archive'),
      url: `${WEBSITE_URL}${prefix}/archive`,
      inLanguage: locale,
      mainEntityOfPage: {
         '@type': 'WebPage',
         '@id': `${WEBSITE_URL}${prefix}/archive`,
      },
   };

   const sortOptions = [
      { value: 'created_at-asc', label: t('Sort.latest') },
      { value: 'created_at-desc', label: t('Sort.oldest') },
      { value: 'title-asc', label: t('Sort.a-z') },
      { value: 'title-desc', label: t('Sort.z-a') },
   ];

   return (
      <div
         className={`grid grid-cols-[2fr_1fr] md:flex md:flex-col gap-10 xs:gap-14 2xl:mt-3 min-h-[152rem] md:min-h-[173rem] sm:min-h-[176rem] xs:min-h-[175rem] ${crimsonText.variable}`}
      >
         <h1 className="sr-only">{t('H1.archive-page')}</h1>

         <section className="space-y-7 lg:space-y-5 md:order-2 md:min-h-screen">
            <div className="flex justify-between md:hidden">
               <ArchiveHeading />
               <SortBy options={sortOptions} isArchive={true} />
            </div>

            {/* Mobile */}
            <div className="hidden md:flex items-center gap-3">
               <div className="flex-1 z-10">
                  <Search />
               </div>
               <FilterDrawer>
                  <Categories categories={categories} isArchive={true} />
                  <LanguageFilter inDrawer />
                  <SortBy options={sortOptions} isArchive={true} />
               </FilterDrawer>
            </div>

            <Articles
               isArchive={true}
               articles={articles}
               categories={categories}
               style="dark:bg-primary-300/15"
            />
         </section>

         {/* Desktop */}
         <section className="space-y-12 md:hidden" key={locale}>
            <Categories categories={categories} isArchive={true} />
            <LanguageFilter />
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
