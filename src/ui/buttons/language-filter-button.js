'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { switchLocale } from '@/src/utils/helpers';
import { useLanguage } from '@/src/context/language-context';
import { usePathname } from '@/src/i18n/navigation';
import { LANGUAGES } from '@/src/utils/config';
import { motion } from 'motion/react';

import srbFlag from '@/public/srb-flag.png';
import enFlag from '@/public/en-flag.png';
import Image from 'next/image';

function LanguageFilterButton({
   lang,
   styles,
   imageStyle,
   activeStyle,
   isMobile,
   children,
   isHovered,
   setIsHovered,
   pendingActive,
   setPendingActive,
}) {
   const { language } = useLanguage();
   const pathname = usePathname();
   const router = useRouter();
   const searchParams = useSearchParams();
   const paramLang = searchParams.get('lang');

   // Determine if this button is the currently active one
   const dataActive =
      lang === paramLang || (!paramLang && lang === language.code);

   // Which button the pill should be on: clicked || hover || active
   const pillTarget = pendingActive || isHovered || (dataActive ? lang : null);

   // Pill is visible if this button is the target
   const showPill = pillTarget === lang;

   function handleLang() {
      if (paramLang === lang) return;

      setPendingActive(lang);
      const params = new URLSearchParams(searchParams);

      const langCode =
         LANGUAGES.find((item) => item.code === lang)?.code || 'en';

      if (pathname.startsWith('/archive')) {
         params.set('lang', langCode);
         router.replace(`?${params.toString()}`, { scroll: false });
      }

      if (isMobile) {
         const mobileLangCode =
            LANGUAGES.find((item) => item.code === lang)?.code || 'en';
         return switchLocale(mobileLangCode);
      }

      params.delete('category');
      params.delete('sort');
      router.replace(`?${params.toString()}`, { scroll: false });
   }

   return (
      <motion.div
         className="relative cursor-pointer"
         onMouseEnter={() => setIsHovered(lang)}
         onMouseLeave={() => setIsHovered(null)}
         onClick={handleLang}
         role="button"
      >
         {showPill && (
            <motion.div
               layoutId="language-pill"
               className="absolute inset-0 rounded-xl bg-accent/20 dark:bg-accent-300/50"
               transition={{
                  type: 'spring',
                  stiffness: 1000,
                  damping: 60,
               }}
            />
         )}

         <div
            className={`relative z-10 flex items-center gap-2
                        py-0.5 px-2.5 rounded-xl
                        hover:text-accent-800 dark:hover:text-accent-100
                        ${activeStyle}
                        ${
                           dataActive &&
                           'text-accent-800 dark:text-accent-100 2xs:py-1'
                        }`}
         >
            <div className={`relative size-7 2xs:size-8 ${imageStyle}`}>
               <Image
                  className="border border-primary-300 dark:border-primary-300/50 rounded-full opacity-90"
                  src={lang === 'sr' ? srbFlag : enFlag}
                  alt="Language image"
                  unoptimized
                  fill
               />
            </div>

            <p className={`text-2xl md:text-2xl 2xs:text-[1.65rem] ${styles}`}>
               {children}
            </p>
         </div>
      </motion.div>
   );
}

export default LanguageFilterButton;
