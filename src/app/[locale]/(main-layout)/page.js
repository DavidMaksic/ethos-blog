import {
   getArticles,
   getMainArticles,
   getCategories,
   getAuthors,
} from '@/src/lib/data-service';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { filterCategories } from '@/src/utils/helpers';

import FeaturedArticles from '@/src/ui/articles/featured-articles';
import LatestArticles from '@/src/ui/articles/latest-articles';
import MainArticles from '@/src/ui/articles/main-articles';

export const dynamic = 'force-static';
export const revalidate = 3600;

export default async function Home({ params }) {
   const [param, articles, categories, mainArticles, authors] =
      await Promise.all([
         params,
         getArticles(),
         getCategories(),
         getMainArticles(),
         getAuthors(),
      ]);

   const t = await getTranslations('H1');
   const { locale } = param;
   setRequestLocale(locale);

   return (
      <>
         <h1 className="sr-only">{t('main-page')}</h1>

         <MainArticles articles={mainArticles} />

         <div className="h-[1px] mt-2 sm:mt-12 bg-gradient-to-r from-primary-300 to-primary dark:to-transparent" />

         <FeaturedArticles
            articles={articles}
            categories={categories}
            authors={authors}
            locale={locale}
         />

         <div className="h-[1px] mt-2 sm:mt-12 bg-gradient-to-l from-primary-300 to-primary dark:to-transparent" />

         <LatestArticles
            articles={articles}
            categories={categories}
            authors={authors}
         />
      </>
   );
}
