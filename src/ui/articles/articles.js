'use client';

import { applyPagination, getSortedItems } from '@/src/utils/helpers';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/src/context/language-context';
import { useMemo } from 'react';

import ArticleItem from '@/src/ui/articles/article-item';
import Pagination from '@/src/ui/pagination';
import Fuse from 'fuse.js';

function Articles({
   isArchive = false,
   articles,
   currentCategory,
   param,
   style,
}) {
   const {
      language: { language },
   } = useLanguage();
   const t = useTranslations('Archive');

   // Derive filtered & paginated articles
   const { filteredArticles, paginatedArticles } = useMemo(() => {
      if (!isArchive) {
         return {
            filteredArticles: articles,
            paginatedArticles: articles?.slice(0, 3),
         };
      }

      let result = [...articles];

      // 1. Sort
      if (param.sort) {
         result = getSortedItems(param, result);
      }

      // 2. Search
      if (param.search) {
         const fuse = new Fuse(result, {
            keys: ['title'],
            includeScore: true,
            threshold: 0.4,
         });

         const fuseResults = fuse.search(param.search);
         result = fuseResults.map((res) => res.item);
      }

      // 3. Filter (category + language)
      const category_id = currentCategory?.id;

      result = result.filter((item) => {
         const matchesCategory =
            !currentCategory || item.category_id === category_id;
         const matchesLanguage = !param.lang
            ? item.language === language
            : item.language ===
              param.lang.charAt(0).toUpperCase() + param.lang.slice(1);
         return matchesCategory && matchesLanguage;
      });

      // 4. Pagination
      const paginatedResult = applyPagination(param, result);

      return {
         filteredArticles: result,
         paginatedArticles: paginatedResult,
      };
   }, [articles, param, currentCategory, language, isArchive]);

   return (
      <>
         {paginatedArticles && (
            <div className="grid grid-rows-3 sm:flex sm:flex-col gap-6 lg:gap-4 md:gap-4 sm:gap-5 md:w-full">
               {paginatedArticles.length ? (
                  paginatedArticles.map((item) => (
                     <ArticleItem article={item} key={item.id} style={style} />
                  ))
               ) : (
                  <span className="justify-self-center text-center mt-25 2xl:mt-29 lg:mt-27 md:mt-34 sm:mt-44 sm:mb-94 xs:mb-[26.3rem] 2xs:mb-[23.6rem] text-primary-400 text-3xl md:text-4xl border border-quaternary dark:border-primary-300/15 rounded-2xl sm:rounded-3xl py-8 sm:py-12 px-12 bg-white dark:bg-primary-300/15 box-shadow">
                     {t('no-articles')}
                  </span>
               )}
            </div>
         )}

         {isArchive &&
            filteredArticles.length >
               Number(process.env.NEXT_PUBLIC_PAGE_SIZE || 10) && (
               <Pagination count={filteredArticles.length} />
            )}
      </>
   );
}

export default Articles;
