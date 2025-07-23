'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Great_Vibes, Parisienne } from 'next/font/google';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from '@/src/i18n/navigation';

const parisienne = Parisienne({
   subsets: ['latin'],
   display: 'swap',
   weight: ['400'],
});

const greatVibes = Great_Vibes({
   subsets: ['cyrillic'],
   display: 'swap',
   weight: ['400'],
});

function Logo() {
   const [isHovered, setIsHovered] = useState(false);

   const t = useTranslations();
   const locale = useLocale();

   const isBellowMd = useMediaQuery({ maxWidth: 768 });

   const glowStyle =
      isHovered && !isBellowMd
         ? {
              textShadow: `0 0 5px var(--color-accent-400)`,
           }
         : {};

   return (
      <Link
         href="/"
         className={`${locale === 'en' && `pt-1 ${parisienne.className}`} ${
            locale === 'sr-cyrl' && `pt-2 text-[2.8rem] ${greatVibes.className}`
         }  styled_text text-center text-5xl bg-gradient-to-r from-accent-800/75 to-accent-600 dark:from-accent-800 dark:to-accent pr-1 pl-0.5 transition-75 outline-none ${
            isHovered && !isBellowMd
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
