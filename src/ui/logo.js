'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import { Link } from '@/src/i18n/navigation';

function Logo() {
   const [isHovered, setIsHovered] = useState(false);

   const t = useTranslations();
   const locale = useLocale();

   const isMobile = useMediaQuery({ maxWidth: 768 });

   const glowStyle =
      isHovered && !isMobile
         ? {
              textShadow: `0 0 5px var(--color-accent-400)`,
           }
         : {};

   return (
      <Link
         href="/"
         className={`${locale === 'en' && `pt-1 font-logo`} ${
            locale === 'sr' && `pt-2 text-[2.8rem] font-logo-sr`
         }  styled_text text-center text-5xl bg-gradient-to-r from-accent-800/75 to-accent-600 dark:from-accent-800 dark:to-accent pr-1 pl-0.5 transition-75 outline-none ${
            isHovered && !isMobile
               ? 'hover:from-accent-700 hover:to-accent-700 dark:hover:from-white dark:hover:to-white'
               : ''
         }`}
         style={{ ...glowStyle }}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         {t('Logo')}
      </Link>
   );
}

export default Logo;
