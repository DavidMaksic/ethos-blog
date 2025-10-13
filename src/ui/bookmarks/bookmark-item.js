'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'motion/react';
import { format } from 'date-fns';
import { Link } from '@/src/i18n/navigation';
import RemoteImage from '@/src/ui/remote-image';

function BookmarkItem({ bookmark }) {
   const date = format(new Date(bookmark.created_at), 'MMM dd, yyyy');
   const category = bookmark.categories;

   const [bgColor, setBgColor] = useState('');
   const [textColor, setTextColor] = useState('');
   const { resolvedTheme } = useTheme();

   useEffect(() => {
      if (!category) return;
      if (resolvedTheme === 'dark') {
         setBgColor(category.bg_dark);
         setTextColor(category.text_dark);
      } else {
         setBgColor(category.bg_light);
         setTextColor(category.text_light);
      }
   }, [resolvedTheme, category]);

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.3 }}
      >
         <Link
            href={`/${bookmark.slug}`}
            className="relative grid grid-cols-[2fr_0.8fr] xl:grid-cols-[2fr_0.3fr] h-full sm:min-h-[18vh] xs:min-h-[20vh] rounded-2xl group cursor-pointer overflow-hidden border border-quaternary dark:border-primary-300/15 bg-white dark:bg-primary-300/15 hover:translate-x-1.5 transition-[translate] duration-200 select-none box-shadow"
         >
            <div className="self-center py-2 px-12 xs:px-12 md:pr-0 space-y-5 2xl:space-y-5 lg:space-y-4 z-20">
               <h2
                  className={`text-primary-500 dark:text-primary-600/85 text-3xl xl:text-[2.1rem] lg:text-[1.8rem] md:text-[1.85rem] xs:text-[2rem] font-medium dark:font-normal lg:font-semibold lg:dark:font-normal md:dark:font-medium 2xl:leading-9 xl:leading-10.5 lg:leading-10  font-title leading-8.5 ${
                     bookmark.title.length >= 48 &&
                     'text-[1.8rem]! lg:text-[1.7rem]! md:text-[1.6rem]! sm:text-[1.4rem]! xs:text-[1.55rem]! leading-[2.5rem]! 2xl:leading-[2.4rem]! lg:leading-[2.2rem]! md:leading-[2.1rem]! sm:leading-[2rem]! xs:leading-[1.98rem]!'
                  }`}
               >
                  {bookmark.title}
               </h2>

               <div className="space-x-3 text-primary-400 dark:text-primary-600/60">
                  <span
                     className="bg-accent-400/15 text-accent/75 px-3 pl-3.5 py-1 pb-1.5 rounded-full font-semibold text-[1.2rem]"
                     style={{
                        backgroundColor: `${bgColor}`,
                        color: `${textColor}`,
                     }}
                  >
                     {category.category}
                  </span>
                  <span className="text-lg">•</span>
                  <span>{date}</span>
               </div>
            </div>

            <RemoteImage
               imageUrl={bookmark.image}
               alt="bookmark image"
               styles="rounded-xl opacity-100 dark:opacity-70 absolute translate-x-[30%] xs:translate-x-[45%] object-cover mask-l-from-0%"
            />
         </Link>
      </motion.div>
   );
}

export default BookmarkItem;
