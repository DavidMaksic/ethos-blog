'use client';

import { motion, LayoutGroup } from 'motion/react';
import { useEffect, useState } from 'react';
import { IoLanguageOutline } from 'react-icons/io5';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/src/context/language-context';
import { LANGUAGES } from '@/src/utils/config';
import LanguageFilterButton from '@/src/ui/buttons/language-filter-button';

function LanguageFilter({ inDrawer = false }) {
   const t = useTranslations('Archive');
   const { language } = useLanguage();
   const searchParams = useSearchParams();
   const paramLang = searchParams.get('lang');

   const [mounted, setMounted] = useState(false);
   useEffect(() => setMounted(true), []);

   return (
      <div className="space-y-6 md:order-2 md:self-start">
         <div className="flex gap-3 items-center md:self-start md:text-primary-500 md:dark:text-primary-600/70 md:font-semibold">
            <IoLanguageOutline className="size-7.5 md:size-5.5 stroke-[0.2px]" />
            <h2 className="text-4xl md:text-[1.7rem]">{t('lang-label')}</h2>
         </div>

         <div className="flex items-center gap-4 text-[1.35rem] md:justify-center">
            <LayoutGroup>
               <div className="relative flex gap-2 bg-white dark:bg-primary-300/15 md:dark:bg-primary-300/30 py-2 px-3 border border-tertiary dark:border-primary-300/15 rounded-xl md:rounded-2xl shadow-2xs transition-bg_color_border">
                  {LANGUAGES.map((item) => {
                     const active =
                        item.code === paramLang ||
                        (!paramLang && item.code === language.code);

                     return (
                        <div key={item.code} className="relative">
                           {mounted && active && (
                              <motion.div
                                 layoutId={
                                    inDrawer
                                       ? 'filter-pill-drawer'
                                       : 'filter-pill'
                                 }
                                 layoutDependency={paramLang}
                                 initial={false}
                                 className="absolute inset-0 bg-accent/20 dark:bg-accent-300/50 rounded-xl z-0"
                                 transition={{
                                    type: 'spring',
                                    stiffness: 1000,
                                    damping: 60,
                                 }}
                              />
                           )}

                           <LanguageFilterButton
                              lang={item.code}
                              isActive={active}
                           >
                              {item.lang}
                           </LanguageFilterButton>
                        </div>
                     );
                  })}
               </div>
            </LayoutGroup>
         </div>
      </div>
   );
}

export default LanguageFilter;
