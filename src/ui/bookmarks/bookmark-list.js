'use client';

import { useEffect, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { getSortedItems } from '@/src/utils/helpers';

import BookmarkItem from '@/src/ui/bookmarks/bookmark-item';
import Pagination from '@/src/ui/pagination';

function BookmarkList({ bookmarkIDs, articles, categories, param }) {
   const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
   const t = useTranslations('Profile');

   useEffect(() => {
      const bookmarked = bookmarkIDs
         .map((bookmarkID) => articles.find((item) => item.id === bookmarkID))
         .filter(Boolean);

      setBookmarkedArticles(bookmarked);
   }, [bookmarkIDs, articles]);

   const displayedArticles = useMemo(() => {
      if (!bookmarkedArticles || bookmarkedArticles.length === 0) return [];

      let filtered = [...bookmarkedArticles];

      // 1. Search filtering
      if (param.search) {
         const query = param.search.toLowerCase();
         filtered = filtered.filter((item) =>
            item.title?.toLowerCase().includes(query)
         );
      }

      // 2. Sorting
      filtered = getSortedItems(param, filtered);

      // 3. Pagination
      const page = param.page ? Number(param.page) : 1;
      const itemsPerPage = 3;
      const from = (page - 1) * itemsPerPage;
      const to = from + itemsPerPage;

      return filtered.slice(from, to);
   }, [param, bookmarkedArticles]);

   return (
      <>
         <div
            className={`grid grid-rows-3 gap-4 2xl:gap-3 ${
               !displayedArticles.length && 'grid-rows-1!'
            }`}
         >
            {displayedArticles.length ? (
               displayedArticles.map((item) => (
                  <BookmarkItem
                     article={item}
                     categories={categories}
                     key={item.id}
                  />
               ))
            ) : (
               <span className="self-center justify-self-center sm:mt-60 sm:mb-44 text-primary-400 text-3xl border border-tertiary dark:border-primary-300/15 rounded-3xl py-8 px-12 bg-white dark:bg-primary-300/15">
                  {t('no-bookmarks')}
               </span>
            )}
         </div>

         {bookmarkedArticles.length <= 3 ? (
            <div className="h-24" />
         ) : (
            <Pagination count={bookmarkedArticles.length} isArchive={false} />
         )}
      </>
   );
}

export default BookmarkList;
