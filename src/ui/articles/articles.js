'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { getSortedItems } from '@/src/utils/helpers';
import { useLanguage } from '@/src/context/language-context';

import ArticleItem from '@/src/ui/articles/article-item';
import Pagination from '@/src/ui/pagination';

function Articles({
   isArchive = false,
   articles,
   categories,
   currentCategory,
   param,
   authors,
   style,
}) {
   const [allArticles, setAllArticles] = useState();
   const [finalArticles, setFinalArticles] = useState();
   const { language } = useLanguage();
   const t = useTranslations('Archive');

   useEffect(() => {
      if (!isArchive) return setFinalArticles(articles?.slice(0, 3));

      let sortedItems = articles;
      let searchedItems = articles;
      let filteredArticles = articles;
      let paginatedItems = articles;

      // 1. Sort
      if (param.sort) {
         sortedItems = getSortedItems(param, articles);
      }

      // 2. Search
      if (param.search) {
         const query = param.search;
         searchedItems = sortedItems.filter(
            (item) =>
               item.title?.toLowerCase().includes(query) ||
               item.title?.includes(query)
         );
      }

      // 3. Filter
      filteredArticles = searchedItems
         .filter((item) => {
            if (!currentCategory) return true;
            return item.categoryID === currentCategory?.id;
         })
         .filter((item) => {
            if (!param.lang) return item.language === language.language;
            return (
               item.language ===
               param.lang?.charAt(0).toUpperCase() + param.lang?.slice(1)
            );
         });

      setAllArticles(filteredArticles);

      // 4. Pagination
      const page = !param.page ? 1 : param.page;

      const from = (page - 1) * Number(process.env.NEXT_PUBLIC_PAGE_SIZE);
      const to = from + Number(process.env.NEXT_PUBLIC_PAGE_SIZE);

      paginatedItems = filteredArticles.slice(from, to);

      // 5. Set state
      setFinalArticles(paginatedItems);
   }, [isArchive, param, currentCategory, articles, language]);

   return (
      <>
         {finalArticles ? (
            <div className="grid grid-rows-3 sm:flex sm:flex-col gap-6 lg:gap-4 md:gap-5">
               {finalArticles.length ? (
                  finalArticles.map((item) => (
                     <ArticleItem
                        article={item}
                        categories={categories}
                        key={item.id}
                        style={style}
                        authors={authors}
                     />
                  ))
               ) : (
                  <span className="justify-self-center mt-25 xl:mt-29 lg:mt-27 md:mt-34 sm:mt-44 sm:mb-94 xs:mb-[26.3rem] 2xs:mb-[23.6rem] text-primary-400 text-3xl md:text-4xl border border-quaternary dark:border-primary-300/15 rounded-2xl py-8 px-12 bg-white dark:bg-primary-300/15 box-shadow">
                     {t('no-articles')}
                  </span>
               )}
            </div>
         ) : (
            <div className="flex flex-col mt-[-1.2px] md:w-full animate-skeleton">
               <div className="space-y-6 lg:space-y-4">
                  <div className="h-50.5 xl:h-55 lg:h-53 md:h-61 sm:h-50 xs:h-58 2xs:h-50 bg-primary-300/25 dark:bg-primary-300/18 rounded-3xl" />
                  <div className="h-50.5 xl:h-55 lg:h-53 md:h-61 sm:h-50 xs:h-58 2xs:h-50 bg-primary-300/25 dark:bg-primary-300/18 rounded-3xl" />
                  <div className="h-50.5 xl:h-55 lg:h-53 md:h-61 sm:h-50 xs:h-58 2xs:h-50 bg-primary-300/25 dark:bg-primary-300/18 rounded-3xl" />
               </div>
            </div>
         )}

         {isArchive ? (
            allArticles?.length <= process.env.NEXT_PUBLIC_PAGE_SIZE ? (
               <div className="h-24" />
            ) : (
               <Pagination count={allArticles?.length} />
            )
         ) : null}
      </>
   );
}

export default Articles;
