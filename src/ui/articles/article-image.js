import { HiOutlineUserCircle } from 'react-icons/hi2';
import { getLocale } from 'next-intl/server';

import MainImage from '@/src/ui/main-image';
import Category from '@/src/ui/categories/category';
import Image from 'next/image';

async function ArticleImage({ article, author, date, children }) {
   const locale = await getLocale();

   return (
      <div className="flex flex-col border bg-white/50 dark:bg-primary-300/5 border-primary-300/70 dark:border-primary-300/15 rounded-3xl mt-3 shadow-article dark:shadow-menu-dark transition-bg_border">
         <MainImage article={article} />

         <div className="flex items-center justify-between gap-6 px-6 py-4 2xl:py-3 font-title">
            <div className="flex gap-4 2xl:gap-3.5 items-center">
               <div className="relative size-12 2xl:size-10 md:size-12 sm:size-11">
                  {author?.profile_image ? (
                     <Image
                        className="block aspect-square object-cover object-center rounded-full dark:opacity-80"
                        fill
                        src={author.profile_image}
                        alt="User image"
                        priority={true}
                        quality={60}
                        sizes="(max-width: 768px) 100vw, 1920px"
                     />
                  ) : (
                     <HiOutlineUserCircle className="size-12 2xl:size-10 md:size-12 sm:size-11 stroke-[0.5px] text-primary-400 dark:text-primary-300" />
                  )}
               </div>

               <div className="font-secondary flex flex-col font-medium leading-6 self-center sm:gap-1">
                  <div className="space-x-1.5">
                     {locale === 'en' && <span className="md:hidden">By</span>}
                     <span className="text-accent-500 dark:text-accent-200/90 font-semibold 2xl:text-[1.2rem] md:text-[1.3rem]">
                        {author.full_name}
                     </span>
                  </div>

                  <span className="text-base 2xl:text-sm md:text-base md:mt-[-2px] sm:mt-[-3px] text-primary-400">
                     {date}
                  </span>
               </div>
            </div>

            <span className="flex items-center gap-6 md:gap-4.5">
               {children}

               <div className="pointer-events-none">
                  <Category
                     category={article.categories}
                     customStyles="text-xl! md:text-[1.4rem]! sm:text-[1.2rem]! !font-bold pb-[8px]! sm:pb-[6px]!"
                  />
               </div>
            </span>
         </div>
      </div>
   );
}

export default ArticleImage;
