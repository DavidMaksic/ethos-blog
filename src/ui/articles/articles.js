'use client';

import { applyPagination, getSortedItems } from '@/src/utils/helpers';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FUSE_ARTICLES } from '@/src/utils/config';
import { useLanguage } from '@/src/context/language-context';

import ArticleItem from '@/src/ui/articles/article-item';
import Pagination from '@/src/ui/operations/pagination';
import Fuse from 'fuse.js';

function Articles({ isArchive = false, articles, categories, style }) {
   const { language } = useLanguage();
   const t = useTranslations('Archive');
   const searchParams = useSearchParams();

   const [loading, setLoading] = useState(true);

   const sort = searchParams.get('sort');
   const search = searchParams.get('search');
   const lang = searchParams.get('lang');
   const category = searchParams.get('category');
   const page = Number(searchParams.get('page') || 1);

   useEffect(() => setLoading(false), []);

   // Loading skeleton
   if (loading) {
      const arr = [...Array(isArchive ? 6 : 3)];
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

   // Non-archive: simple preview of first 3 articles
   if (!isArchive) {
      return (
         <motion.div
            className="grid grid-rows-3 sm:flex sm:flex-col gap-6 lg:gap-4 md:gap-4 sm:gap-5 md:w-full"
            layout="position"
            transition={{ duration: 0.2 }}
         >
            <AnimatePresence mode="popLayout">
               {articles.slice(0, 3).map((item) => (
                  <ArticleItem article={item} key={item.id} style={style} />
               ))}
            </AnimatePresence>
         </motion.div>
      );
   }

   // Archive: search, filter, sort, paginate
   let filteredArticles = [...articles];

   // 1. Search (Fuse.js)
   if (search) {
      const fuse = new Fuse(articles, FUSE_ARTICLES);
      filteredArticles = fuse.search(search).map(({ item }) => item);
   }

   // 2. Filter language + category
   const current_category_id = categories.find(
      (item) =>
         item.category ===
         category?.charAt(0).toUpperCase() + category?.slice(1),
   )?.id;

   filteredArticles = filteredArticles.filter((item) => {
      const matchesCategory =
         !current_category_id || item.category_id === current_category_id;
      const matchesLanguage = lang
         ? item.code === lang
         : item.code === language.code;
      return matchesCategory && matchesLanguage;
   });

   // 3. Sort
   if (sort) filteredArticles = getSortedItems(sort, filteredArticles);

   // 4. Pagination
   const paginatedArticles = applyPagination(page, filteredArticles);

   return (
      <>
         <motion.div
            className="grid grid-rows-3 sm:flex sm:flex-col gap-6 lg:gap-4 md:gap-4 sm:gap-5 md:w-full"
            layout="position"
            transition={{ duration: 0.2 }}
         >
            <AnimatePresence mode="popLayout">
               {paginatedArticles.length ? (
                  paginatedArticles.map((item) => (
                     <ArticleItem article={item} key={item.id} style={style} />
                  ))
               ) : (
                  <motion.span
                     className="justify-self-center self-center text-center mt-55 2xl:mt-50 lg:mt-45 md:mt-34 sm:mt-30 text-primary-500/80 dark:text-primary-400 text-3xl md:text-4xl border border-quaternary dark:border-primary-300/15 rounded-2xl sm:rounded-3xl py-8 sm:py-12 px-12 bg-white dark:bg-primary-300/15 box-shadow sm:w-[70vw] 2xs:w-[80vw]"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.3 }}
                  >
                     {t('no-articles')}
                  </motion.span>
               )}
            </AnimatePresence>
         </motion.div>

         {filteredArticles.length >
            Number(process.env.NEXT_PUBLIC_PAGE_SIZE || 10) && (
            <Pagination count={filteredArticles.length} />
         )}
      </>
   );
}

export default Articles;
