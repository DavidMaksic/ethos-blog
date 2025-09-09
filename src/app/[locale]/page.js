import {
   getArticles,
   getMainArticles,
   getCategories,
   getAuthors,
} from '@/src/lib/data-service';
import FeaturedArticles from '@/src/ui/articles/featured-articles';
import LatestArticles from '@/src/ui/articles/latest-articles';
import MainArticles from '@/src/ui/articles/main-articles';
import { getTranslations } from 'next-intl/server';

export default async function Home({ searchParams }) {
   const [param, articles, categories, mainArticles, authors, t] =
      await Promise.all([
         searchParams,
         getArticles(),
         getCategories(),
         getMainArticles(),
         getAuthors(),
         getTranslations('H1'),
      ]);

   return (
      <>
         <h1 className="sr-only">{t('main-page')}</h1>

         <MainArticles articles={mainArticles} />

         <div className="h-[1px] mt-2 sm:mt-12 bg-gradient-to-r from-primary-300 to-primary dark:to-transparent" />

         <FeaturedArticles
            articles={articles}
            categories={categories}
            authors={authors}
         />

         <div className="h-[1px] mt-2 sm:mt-12 bg-gradient-to-l from-primary-300 to-primary dark:to-transparent" />

         <LatestArticles
            articles={articles}
            categories={categories}
            param={param}
            authors={authors}
         />
      </>
   );
}
