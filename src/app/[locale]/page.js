import {
   getMainArticles,
   getCategories,
   getArticles,
   getAuthors,
} from '@/src/lib/data-service';
import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';

const FeaturedArticles = dynamic(
   () => import('@/src/ui/articles/featured-articles'),
   {
      ssr: true,
      loading: () => <div>Loading...</div>,
   }
);
const LatestArticles = dynamic(
   () => import('@/src/ui/articles/latest-articles'),
   {
      ssr: true,
      loading: () => <div>Loading...</div>,
   }
);
const MainArticles = dynamic(() => import('@/src/ui/articles/main-articles'), {
   ssr: true,
   loading: () => <div>Loading...</div>,
});

export default async function Home() {
   const [articles, categories, mainArticles, authors, t] = await Promise.all([
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
            authors={authors}
         />
      </>
   );
}
