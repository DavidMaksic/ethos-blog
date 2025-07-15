'use client';

import { useTranslations } from 'next-intl';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from '@/src/i18n/navigation';

import useFilterArticle from '@/src/hooks/use-filter-article';
import Categories from '@/src/ui/categories/categories';
import Articles from '@/src/ui/articles/articles';

function LatestArticles({ articles, categories, param, authors }) {
   const { filteredArray: filteredArticles } = useFilterArticle(articles);

   const currentCategory = categories.find(
      (item) =>
         item.category ===
         param.category?.charAt(0).toUpperCase() + param.category?.slice(1)
   );

   const finalArticles = filteredArticles?.filter((item) => {
      if (!currentCategory) return true;
      return item.categoryID === currentCategory?.id;
   });

   const t = useTranslations('HomePage');

   return (
      <div className="grid grid-cols-[2fr_1fr] md:grid-cols-1 gap-10 lg:gap-y-7 my-14 lg:mb-10">
         <div className="md:flex md:flex-col md:items-center space-y-10 lg:space-y-7 md:order-2">
            <h1 className="text-4xl lg:text-3xl md:text-4xl md:hidden">
               <span>{t('latest')}</span>
            </h1>

            <Articles
               articles={finalArticles}
               categories={categories}
               currentCategory={currentCategory}
               authors={authors}
               style="dark:bg-primary-200 md:dark:bg-primary-300/15"
            />
         </div>

         <Categories
            categories={categories}
            currentCategory={currentCategory}
         />

         <Link
            href="/archive"
            className="md:order-3 md:mt-1 md:justify-self-center flex gap-2 items-center py-2 md:py-3.5 pr-5 pl-6.5 md:pl-7 w-fit rounded-full shadow-2xs text-[1.65rem] lg:text-2xl md:text-3xl font-medium border border-quaternary bg-white/60 dark:bg-primary md:dark:bg-primary/15 hover:bg-accent-400 dark:hover:bg-accent-300/60 hover:text-white hover:shadow-link-btn dark:hover:shadow-link-btn-dark hover:border-accent-400 dark:hover:border-accent-300/20 transition"
         >
            {t('latest-btn')}
            <FiChevronRight />
         </Link>
      </div>
   );
}

export default LatestArticles;
