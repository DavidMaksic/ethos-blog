'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { getSortedItems } from '@/src/utils/helpers';
import { FUSE_OPTIONS } from '@/src/utils/config';
import { useMemo } from 'react';

import BookmarkItem from '@/src/ui/bookmarks/bookmark-item';
import Pagination from '@/src/ui/operations/pagination';
import Fuse from 'fuse.js';

function BookmarkList({ usersBookmarks, param }) {
   const t = useTranslations('Profile');

   const fuse = useMemo(() => {
      if (!param.search) return null;
      return new Fuse(usersBookmarks, FUSE_OPTIONS);
   }, [usersBookmarks, param.search]);

   // 1. Filter / Search Logic
   let filtered = [...usersBookmarks];

   if (fuse && param.search) {
      filtered = fuse.search(param.search).map((r) => r.item);
   }

   // 2. Sorting
   filtered = getSortedItems(param?.sort, filtered);

   // 3. Pagination
   const page = param.page ? Number(param.page) : 1;
   const itemsPerPage = 3;

   const maxPage = Math.ceil(filtered.length / itemsPerPage) || 1;
   const currentPage = page > maxPage ? 1 : page;

   const from = (currentPage - 1) * itemsPerPage;
   const to = from + itemsPerPage;
   const displayedBookmarks = filtered
      .slice(from, to)
      .flatMap((item) => item.articles);

   return (
      <>
         <motion.div
            className={`grid grid-rows-3 sm:flex sm:flex-col gap-4 2xl:gap-3 ${
               !displayedBookmarks.length && 'grid-rows-1!'
            }`}
            layout="position"
            transition={{ duration: 0.2 }}
         >
            <AnimatePresence mode="popLayout">
               {displayedBookmarks.length ? (
                  displayedBookmarks.map((item) => (
                     <BookmarkItem bookmark={item} key={item.id} />
                  ))
               ) : (
                  <motion.span
                     className="self-center justify-self-center sm:mt-60 sm:mb-44 text-primary-500/80 dark:text-primary-400 text-3xl border border-quaternary dark:border-primary-300/15 rounded-3xl py-8 px-12 bg-white dark:bg-primary-300/15 box-shadow -translate-y-[20%]"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.3 }}
                  >
                     {t('no-bookmarks')}
                  </motion.span>
               )}
            </AnimatePresence>
         </motion.div>

         <motion.div
            className={`${
               filtered.length <= itemsPerPage &&
               'invisible pointer-events-none'
            }`}
            layout="position"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
         >
            <Pagination count={usersBookmarks.length} isArchive={false} />
         </motion.div>
      </>
   );
}

export default BookmarkList;
