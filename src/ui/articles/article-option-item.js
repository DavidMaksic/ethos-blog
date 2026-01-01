import { useLocale, useTranslations } from 'next-intl';
import { TYPE_STYLES } from '@/src/utils/config';
import { useAuth } from '@/src/context/auth-context';
import { motion } from 'motion/react';
import clsx from 'clsx';

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
   const { loading } = useAuth();

   const isActive =
      (type === 'like' && isLiked) ||
      (type === 'bookmark' && isBookmarked) ||
      (type === 'comment' && (hasCommented || hasReplied));

   const styles = TYPE_STYLES[type] ?? {};
   const isDisabled = type !== 'link' && loading;

   return (
      <motion.div
         whileTap={{ scale: 0.9 }}
         transition={{ type: 'spring', stiffness: 500, damping: 30 }}
         onClick={handler}
         className={clsx(
            'flex flex-col items-center justify-center gap-0.5 md:gap-1.5 sm:gap-1',
            'border border-primary-300/70 dark:border-quaternary rounded-3xl',
            'dark:hover:shadow-none! cursor-pointer group transition-options will-change-transform md:min-h-34',
            'px-6 py-4 md:py-5 md:px-0',
            locale === 'en' && 'px-8!',
            styles.hover,
            isActive && styles.activeBorder,
            isDisabled && 'pointer-events-none'
         )}
      >
         {children}

         <span className="text-xl md:text-[1.4rem] font-medium md:font-semibold text-primary-400 select-none">
            {type === 'link' ? (
               <span className="uppercase text-base font-secondary">
                  {t('share')}
               </span>
            ) : count ? (
               <span
                  className={clsx(
                     'font-secondary tabular-nums transition-color',
                     isActive && styles.text,
                     styles.hoverText
                  )}
               >
                  {count}
               </span>
            ) : (
               <span
                  className={clsx(
                     'text-base font-sans font-bold md:text-2xl sm:text-lg transition-200',
                     styles.hoverText
                  )}
               >
                  --
               </span>
            )}
         </span>
      </motion.div>
   );
}

export default ArticleOptionItem;
