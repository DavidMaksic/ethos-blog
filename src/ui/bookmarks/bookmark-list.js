'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { getSortedItems } from '@/src/utils/helpers';

import BookmarkOptions from '@/src/ui/bookmarks/bookmark-options';
import BookmarkItem from '@/src/ui/bookmarks/bookmark-item';
import Pagination from '@/src/ui/pagination';

function BookmarkList({ bookmarkIDs, articles, categories, param }) {
   const [bookmarkedArticles, setBookmarkedArticles] = useState();
   const [sortedArticles, setSortedArticles] = useState();
   const t = useTranslations('Profile');

   useEffect(() => {
      setBookmarkedArticles(() =>
         bookmarkIDs.map((bookmarkID) =>
            articles.find((item) => item.id === bookmarkID)
         )
      );
   }, [bookmarkIDs, articles]);

   useEffect(() => {
      // - 1. Sort
      setSortedArticles(() => getSortedItems(param, bookmarkedArticles));

      // - 2. Pagination
      setSortedArticles(() => {
         const page = !param.page ? 1 : param.page;

         const from = (page - 1) * 3;
         const to = from + 3;

         return bookmarkedArticles?.slice(from, to);
      });

      // - 3. Search
      if (param.search) {
         const query = param.search;

         setSortedArticles(() =>
            bookmarkedArticles
               ?.filter(
                  (item) =>
                     item.title?.toLowerCase().includes(query) ||
                     item.title?.includes(query)
               )
               .slice(0, 3)
         );
      }
   }, [param, bookmarkedArticles]);

   if (!sortedArticles)
      return (
         <div className="relative h-[44rem] xl:h-[37.5rem] lg:h-[35rem] md:h-[51.5rem] max-w-full space-y-10.5 xl:space-y-9 lg:space-y-7 md:space-y-8 animate-skeleton">
            <div className="flex justify-between items-center">
               <span className="h-9 md:h-11 w-[14rem] bg-primary-300/40 rounded-2xl" />
               <span className="h-9 md:h-11 w-[10rem] bg-primary-300/40 rounded-2xl" />
            </div>

            <div className="space-y-4 lg:space-y-3">
               <div className="h-45.5 xl:h-46.5 lg:h-38 md:h-54 sm:h-58.5 xs:h-50 2xs:h-59 bg-primary-300/30 rounded-3xl" />
               <div className="h-45.5 xl:h-46.5 lg:h-38 md:h-54 sm:h-58.5 xs:h-50 2xs:h-59 bg-primary-300/20 rounded-3xl" />
               <div className="h-45.5 xl:h-46.5 lg:h-38 md:h-54 sm:h-58.5 xs:h-50 2xs:h-59 bg-primary-300/10 rounded-3xl" />
            </div>
         </div>
      );

   return (
      <>
         <div>
            <div className="flex justify-between mb-8.5 xl:mb-7 lg:mb-4.5 md:mb-7.5">
               <BookmarkOptions param={param} />
            </div>

            <div className="flex flex-col gap-4 lg:gap-3">
               {sortedArticles?.length ? (
                  sortedArticles?.map((item) => (
                     <BookmarkItem
                        article={item}
                        categories={categories}
                        key={item.id}
                     />
                  ))
               ) : (
                  <span className="self-center mt-41.5 sm:mt-56 sm:mb-60 text-primary-400 text-3xl border border-tertiary dark:border-primary-300/15 rounded-3xl py-8 px-12 bg-white dark:bg-primary-300/15">
                     {t('no-bookmarks')}
                  </span>
               )}
            </div>
         </div>

         {bookmarkedArticles?.length <= 3 ? (
            <div className="h-24" />
         ) : (
            <Pagination count={bookmarkedArticles?.length} isArchive={false} />
         )}
      </>
   );
}

export default BookmarkList;
