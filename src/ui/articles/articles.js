'use client';

import { applyPagination, getSortedItems } from '@/src/utils/helpers';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FUSE_OPTIONS } from '@/src/utils/config';
import { useLanguage } from '@/src/context/language-context';

import ArticleItem from '@/src/ui/articles/article-item';
import Pagination from '@/src/ui/pagination';
import Fuse from 'fuse.js';

function Articles({ isArchive = false, articles, categories, style }) {
   const { language } = useLanguage();
   const t = useTranslations('Archive');
   const searchParams = useSearchParams();

   const [loading, setLoading] = useState(true);

   // Extract client-side params
   const sort = searchParams.get('sort');
   const search = searchParams.get('search');
   const lang = searchParams.get('lang');
   const category = searchParams.get('category');
   const page = Number(searchParams.get('page') || 1);

   useEffect(() => setLoading(false), []);

   // Find active category
   const currentCategory = categories.find(
      (item) =>
         item.category ===
         category?.charAt(0).toUpperCase() + category?.slice(1)
   );

   const fuse = useMemo(
      () => (search ? new Fuse(articles, FUSE_OPTIONS) : null),
      [articles, search]
   );

   // Sort, search, filter, pagination
   const { filteredArticles, paginatedArticles } = useMemo(() => {
      if (!isArchive) {
         return {
            filteredArticles: articles,
            paginatedArticles: articles?.slice(0, 3),
         };
      }

      let result = [...articles];

      // 1. Sort
      if (sort) result = getSortedItems(sort, result);

      // 2. Search (Fuse.js)
      if (fuse && search) result = fuse.search(search).map(({ item }) => item);

      // 3. Filter language + category
      const category_id = currentCategory?.id;

      result = result.filter((item) => {
         const matchesCategory =
            !currentCategory || item.category_id === category_id;

         const matchesLanguage = lang
            ? item.code === lang
            : item.code === language.code;

         return matchesCategory && matchesLanguage;
      });

      // 4. Pagination
      const paginatedResult = applyPagination(page, result);

      return {
         filteredArticles: result,
         paginatedArticles: paginatedResult,
      };
   }, [
      articles,
      sort,
      search,
      lang,
      page,
      currentCategory,
      language,
      isArchive,
      fuse,
   ]);

   const arr = isArchive ? [...Array(6)] : [...Array(3)];

   if (loading) {
      return (
         <div className="flex flex-col mt-[-1.2px] md:w-full animate-skeleton">
            <div className="space-y-6 lg:space-y-4">
               {arr.map((_, i) => (
                  <div
                     key={i}
                     className="h-50.5 2xl:h-55 lg:h-53 md:h-61 bg-primary-300/35 dark:bg-primary-300/18 rounded-3xl"
                  />
               ))}
            </div>
         </div>
      );
   }

   return (
      <>
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

         {isArchive &&
            filteredArticles.length >
               Number(process.env.NEXT_PUBLIC_PAGE_SIZE || 10) && (
               <Pagination count={filteredArticles.length} />
            )}
      </>
   );
}

export default Articles;
