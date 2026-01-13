'use client';

import { IoLanguageOutline } from 'react-icons/io5';
import { useTranslations } from 'next-intl';
import { LANGUAGES } from '@/src/utils/config';
import LanguageFilterButton from '@/src/ui/buttons/language-filter-button';

function LanguageFilter() {
   const t = useTranslations('Archive');

   return (
      <div className="space-y-6 md:order-2">
         <div className="flex gap-3 items-center md:justify-center">
            <IoLanguageOutline className="size-7.5 stroke-[0.2px]" />
            <h2 className="text-4xl">{t('lang-label')}</h2>
         </div>

         <div className="flex items-center gap-4 text-[1.35rem] md:justify-center">
            <div className="flex gap-2 bg-white dark:bg-primary-300/15 py-2 px-3 border border-tertiary dark:border-primary-300/15 rounded-xl shadow-2xs transition-bg_color_border">
               {LANGUAGES.map((item) => (
                  <LanguageFilterButton key={item.code} lang={item.code}>
                     {item.lang}
                  </LanguageFilterButton>
               ))}
            </div>
         </div>
      </div>
   );
}

export default LanguageFilter;
