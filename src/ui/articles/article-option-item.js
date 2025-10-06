import { useLocale, useTranslations } from 'next-intl';

function ArticleOptionItem({
   isBookmarked,
   hasCommented,
   hasReplied,
   isLiked,
   type,
   handler,
   count,
   children,
}) {
   const t = useTranslations('Article');
   const locale = useLocale();

   return (
      <div
         className={`grid grid-rows-[1fr_0.1fr] justify-items-center items-center sm:gap-1.5 border border-primary-300/70 dark:border-quaternary px-6 md:px-8! sm:px-0! py-4 md:py-6.5 sm:py-5! rounded-3xl hover:bg-white dark:hover:bg-primary-300/30 cursor-pointer transition-bg_border group ${
            locale === 'en' && 'px-8 md:px-10!'
         } ${
            type === 'like' &&
            'hover:border-red-400/50! dark:hover:border-red-400/20! hover:bg-red-400/5!'
         } ${
            type === 'comment' &&
            'hover:border-amber-400/80! dark:hover:border-amber-400/20! hover:bg-amber-400/5!'
         } ${
            type === 'bookmark' &&
            'hover:border-cyan-400/70! dark:hover:border-cyan-400/20! hover:bg-cyan-400/5!'
         } ${
            type === 'link' &&
            'hover:bg-secondary! dark:hover:bg-primary-400/10!'
         } ${
            isLiked &&
            'border-red-400/20! dark:border-red-400/10! bg-red-400/5!'
         } ${
            isBookmarked &&
            'border-cyan-400/30! dark:border-cyan-400/10! bg-cyan-400/5!'
         } ${
            hasCommented &&
            'border-amber-400/40! dark:border-amber-400/10! bg-amber-400/5!'
         } ${
            hasReplied &&
            'border-amber-400/40! dark:border-amber-400/10! bg-amber-400/5!'
         }`}
         onClick={handler}
      >
         {children}
         <span className="text-xl md:text-[1.4rem] md:font-semibold text-primary-400 select-none">
            {type === 'link' ? (
               <span className="uppercase text-base font-secondary">
                  {t('share')}
               </span>
            ) : count ? (
               <span
                  className={`transition-color font-secondary ${
                     isLiked && 'text-red-600/55 dark:text-red-300/80'
                  } ${
                     isBookmarked && 'text-cyan-600/80 dark:text-cyan-300/70'
                  } ${
                     hasCommented && 'text-amber-600/80 dark:text-amber-300/70'
                  } ${
                     hasReplied && 'text-amber-600/80 dark:text-amber-300/70'
                  }  ${
                     type === 'like' &&
                     'group-hover:text-red-600/55 dark:group-hover:text-red-300/80'
                  }  ${
                     type === 'comment' &&
                     'group-hover:text-amber-600/80 dark:group-hover:text-amber-300/70'
                  } ${
                     type === 'bookmark' &&
                     'group-hover:text-cyan-600/80 dark:group-hover:text-cyan-300/70'
                  }`}
               >
                  {count}
               </span>
            ) : (
               <span
                  className={`text-base font-sans font-bold transition-200 ${
                     type === 'like' &&
                     'group-hover:text-red-600/55 dark:group-hover:text-red-300/80'
                  } ${
                     type === 'comment' &&
                     'group-hover:text-amber-600/80 dark:group-hover:text-amber-300/70'
                  }
                  ${
                     type === 'bookmark' &&
                     'group-hover:text-cyan-600/80 dark:group-hover:text-cyan-300/70'
                  }`}
               >
                  --
               </span>
            )}
         </span>
      </div>
   );
}

export default ArticleOptionItem;
