'use client';

import { useEffect, useState } from 'react';
import { Cormorant_SC } from 'next/font/google';
import { useTheme } from 'next-themes';
import { format } from 'date-fns';
import { motion } from 'motion/react';
import { Link } from '@/src/i18n/navigation';
import RemoteImage from '@/src/ui/remote-image';

const cormorantSC = Cormorant_SC({
   subsets: ['latin'],
   display: 'swap',
   weight: ['300', '400', '500', '600', '700'],
});

function ArticleItem({ article, categories, style, authors }) {
   const date = format(new Date(article.created_at), 'MMM dd, yyyy');
   const category = categories?.find((item) => item.id === article?.categoryID);

   const [bgColor, setBgColor] = useState('');
   const [textColor, setTextColor] = useState('');
   const { resolvedTheme } = useTheme();

   const author = authors?.find((item) => item.id === article.author_id);

   useEffect(() => {
      if (!category) return;
      if (resolvedTheme === 'dark') {
         setBgColor(category.bgDark);
         setTextColor(category.textDark);
      } else {
         setBgColor(category.bgLight);
         setTextColor(category.textLight);
      }
   }, [resolvedTheme, category]);

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.3 }}
      >
         <Link
            href={`/${article.id}`}
            className={`relative grid grid-cols-[0.4fr_1fr] lg:grid-cols-[0.3fr_1fr] sm:grid-cols-1 rounded-2xl group cursor-pointer overflow-hidden border border-quaternary dark:border-primary-300/10 bg-white ${style} hover:translate-x-1.5 transition-[translate] duration-200 select-none box-shadow sm:h-fit`}
         >
            <div className="relative h-50 xl:h-54 lg:h-52 md:h-61 sm:hidden">
               <RemoteImage
                  imageUrl={article.image}
                  alt="Article image"
                  styles="object-cover opacity-90 dark:opacity-75 border-r border-r-primary-100 dark:border-r-primary-300/5"
               />
            </div>

            <div className="self-center py-2 md:py-10 sm:py-8 xs:pb-9 px-12 sm:px-13 space-y-1 md:space-y-1">
               <h2
                  className={`text-primary-500 dark:text-primary-600/85 text-[1.7rem] lg:text-[1.65rem] md:text-[2.1rem] sm:text-[2rem] leading-8.5 lg:leading-8.5 md:leading-10 sm:leading-10 xs:leading-[2.45rem] font-semibold dark:font-normal ${
                     cormorantSC.className
                  } ${
                     article.title.length >= 48 &&
                     'xl:text-[1.7rem]! md:text-[2rem]! sm:text-[2rem]! lg:leading-8.5! md:leading-[2.5rem]! sm:leading-[2.55rem]! xs:leading-[2.45rem]!'
                  }  `}
               >
                  {article.title}
               </h2>

               <div className="space-x-2 text-primary-400 dark:text-primary-600/60 mb-4 lg:mb-3 md:mb-4 sm:mb-5 lg:text-base md:text-xl">
                  <span>{date}</span>
                  <span className="text-lg lg:text-base">•</span>
                  <span>{author.full_name}</span>
               </div>

               <span
                  className="bg-accent-400/15 text-accent/75 px-3 pl-3.5 py-1 pb-1.5 rounded-full font-semibold md:font-bold text-[1.2rem] lg:text-[1.1rem] md:text-2xl"
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
}

export default ArticleItem;
