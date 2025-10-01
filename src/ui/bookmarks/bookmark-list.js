'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { getSortedItems } from '@/src/utils/helpers';

import BookmarkItem from '@/src/ui/bookmarks/bookmark-item';
import Pagination from '@/src/ui/pagination';
import Fuse from 'fuse.js';

function BookmarkList({ usersBookmarks, param }) {
   const t = useTranslations('Profile');
   const articles = usersBookmarks.map((item) => item.articles);
   const [bookmarks, setBookmarks] = useState(articles);

   const displayedBookmarks = useMemo(() => {
      if (!bookmarks || bookmarks.length === 0) return [];

      let filtered = [...bookmarks];

      // 1. Search filtering
      if (param.search) {
         const fuse = new Fuse(filtered, {
            keys: ['title'],
            includeScore: true,
            threshold: 0.4,
         });

         const fuseResults = fuse.search(param.search);
         filtered = fuseResults.map((res) => res.item);
      }

      // 2. Sorting
      filtered = getSortedItems(param, filtered);

      // 3. Pagination
      const page = param.page ? Number(param.page) : 1;
      const itemsPerPage = 3;
      const from = (page - 1) * itemsPerPage;
      const to = from + itemsPerPage;

      return filtered.slice(from, to);
   }, [param, bookmarks]);

   return (
      <>
         <div
            className={`grid grid-rows-3 gap-4 2xl:gap-3 ${
               !displayedBookmarks.length && 'grid-rows-1!'
            }`}
         >
            {displayedBookmarks.length ? (
               displayedBookmarks.map((item) => (
                  <BookmarkItem bookmark={item} key={item.id} />
               ))
            ) : (
               <span className="self-center justify-self-center sm:mt-60 sm:mb-44 text-primary-400 text-3xl border border-tertiary dark:border-primary-300/15 rounded-3xl py-8 px-12 bg-white dark:bg-primary-300/15">
                  {t('no-bookmarks')}
               </span>
            )}
         </div>

         {displayedBookmarks.length <= 3 ? (
            <div className="h-24" />
         ) : (
            <Pagination count={displayedBookmarks.length} isArchive={false} />
         )}
      </>
   );
}

export default BookmarkList;
