'use client';

import { HiOutlineUserCircle } from 'react-icons/hi2';
import { useLocale } from 'next-intl';
import { motion } from 'motion/react';

import ArticleOptions from '@/src/ui/articles/article-options';
import RemoteImage from '@/src/ui/remote-image';
import MainImage from '@/src/ui/main-image';
import Category from '@/src/ui/categories/category';

function ArticleImage({
   article,
   author,
   user,
   session,
   hasReplied,
   hasCommented,
   category,
   date,
}) {
   const locale = useLocale();

   return (
      <motion.div
         className="flex flex-col border bg-white/50 dark:bg-primary-300/5 border-primary-300/70 dark:border-primary-300/15 rounded-3xl mt-3 shadow-article dark:shadow-menu-dark transition-bg_border"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.3 }}
      >
         <MainImage article={article} />

         <div className="flex items-center justify-between gap-6 px-6 py-4 2xl:py-3 font-title">
            <div className="flex gap-4 2xl:gap-3.5 items-center">
               <div className="relative size-12 2xl:size-10 md:size-12 sm:size-11">
                  {author?.profile_image ? (
                     <RemoteImage
                        imageUrl={author.profile_image}
                        alt="User image"
                        styles="block aspect-square object-cover object-center rounded-full dark:opacity-80"
                     />
                  ) : (
                     <HiOutlineUserCircle className="size-12 2xl:size-10 md:size-12 sm:size-11 stroke-[0.5px] text-primary-400 dark:text-primary-300" />
                  )}
               </div>

               <div className="flex flex-col font-medium leading-6 self-center">
                  <div className="space-x-1.5">
                     {locale === 'en' && <span className="md:hidden">By</span>}
                     <span className="text-accent-500 dark:text-accent-200/90 font-semibold 2xl:text-[1.2rem] md:text-2xl sm:text-[1.3rem] md:font-bold">
                        {author.full_name}
                     </span>
                  </div>
                  <span className="text-base 2xl:text-sm md:text-base md:mt-[-2px] sm:mt-[-3px]">
                     {date}
                  </span>
               </div>
            </div>

            <span className="flex items-center gap-6 md:gap-4.5">
               <ArticleOptions
                  articleID={article.id}
                  count={article.likes}
                  session={session}
                  user={user}
                  hasCommented={hasCommented}
                  hasReplied={hasReplied}
               />

               <div className="pointer-events-none">
                  <Category
                     category={category}
                     isArticle={true}
                     customStyles="text-xl! md:text-[1.4rem]! sm:text-[1.2rem]! !font-bold pb-[8px]! sm:pb-[6px]!"
                  />
               </div>
            </span>
         </div>
      </motion.div>
   );
}

export default ArticleImage;
