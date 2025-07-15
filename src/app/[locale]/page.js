import {
   getMainArticles,
   getCategories,
   getArticles,
   getAuthors,
} from '@/src/lib/data-service';
import FeaturedArticles from '@/src/ui/articles/featured-articles';
import LatestArticles from '@/src/ui/articles/latest-articles';
import MainArticles from '@/src/ui/articles/main-articles';

export default async function Home({ searchParams }) {
   const param = await searchParams;
   const articles = await getArticles();
   const categories = await getCategories();
   const mainArticles = await getMainArticles();
   const authors = await getAuthors();

   return (
      <>
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
