'use client';

import { forwardRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'motion/react';
import { format } from 'date-fns';
import { Link } from '@/src/i18n/navigation';
import RemoteImage from '@/src/ui/image/remote-image';

const ArticleItem = forwardRef(({ article, style }, ref) => {
   const date = format(new Date(article.created_at), 'MMM dd, yyyy');
   const category = article.categories;

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
         ref={ref}
         initial={{ opacity: 0, ease: 'easeOut' }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0, ease: 'easeIn' }}
         transition={{ duration: 0.2 }}
         layout
      >
         <Link
            href={`/${article.slug}`}
            prefetch
            className={`relative grid grid-cols-[0.4fr_1fr] lg:grid-cols-[0.3fr_1fr] rounded-2xl group cursor-pointer overflow-hidden border border-quaternary dark:border-primary-300/10 bg-white ${style} hover:translate-x-1.5 transition-[translate] duration-200 box-shadow md:min-h-61`}
         >
            <div className="relative h-50 2xl:h-54 lg:h-52 md:h-auto md:min-w-32">
               <RemoteImage
                  imageUrl={article.image}
                  alt="Article image"
                  styles="object-cover border-r border-r-primary-100 dark:border-r-primary-300/5"
                  opacity="opacity-90 dark:opacity-75"
               />
            </div>

            <div className="self-center py-2 md:py-10 sm:py-8 xs:pb-9 px-12 sm:px-11 space-y-1 md:space-y-1">
               <h2 className="text-primary-500 dark:text-primary-600/85 text-[1.7rem] lg:text-[1.65rem] md:text-[2.1rem] sm:text-[2rem] leading-8.5 lg:leading-8.5 md:leading-10 sm:leading-10 xs:leading-[2.45rem] font-semibold dark:font-normal font-title">
                  {article.title}
               </h2>

               <div className="space-x-2 text-primary-400 dark:text-primary-600/60 mb-4 lg:mb-3 md:mb-4 sm:mb-5 lg:text-base md:text-xl">
                  <span>{date}</span>
                  <span className="text-lg lg:text-base">•</span>
                  <span>{article.authors.full_name}</span>
               </div>

               <span
                  className="bg-accent-400/15 text-accent/75 px-3 md:pl-3.5 md:pr-[10px] py-1 pb-1.5 rounded-full font-semibold text-[1.2rem] lg:text-[1.1rem] md:text-2xl"
                  style={{
                     backgroundColor: `${bgColor}`,
                     color: `${textColor}`,
                  }}
               >
                  {category.category}
               </span>
            </div>
         </Link>
      </motion.div>
   );
});

ArticleItem.displayName = 'ArticleItem';

export default ArticleItem;
