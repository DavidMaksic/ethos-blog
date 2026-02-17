'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSetParams } from '@/src/hooks/use-set-params';
import { CgSearch } from 'react-icons/cg';
import useDebounce from '@/src/hooks/use-debounce';

function Search({ isArchive = false }) {
   const t = useTranslations();
   const locale = useLocale();

   const searchParams = useSearchParams();
   const handler = useSetParams();

   const initialQuery = searchParams.get('search') || '';
   const [inputValue, setInputValue] = useState(initialQuery);
   const debouncedInput = useDebounce(inputValue, 200);

   // - Update URL param only when debounced input changes
   useEffect(() => {
      const trimmed = debouncedInput?.trim() || '';
      const current = searchParams.get('search') || '';

      if (trimmed === current) return;

      handler('search', trimmed || null);
   }, [debouncedInput]); // eslint-disable-line

   // Sync input with URL changes (browser navigation)
   useEffect(() => {
      if (initialQuery !== inputValue) {
         setInputValue(initialQuery);
      }
   }, [initialQuery]); // eslint-disable-line

   return (
      <div className="flex items-center z-10">
         <label htmlFor="search">
            <CgSearch className="size-11 md:size-12 text-accent-600/85 dark:text-accent-200/90 p-2 pt-2.5 pr-2.5 bg-white dark:bg-primary-300/18 shadow-2xs border border-tertiary dark:border-transparent rounded-full rounded-tr-none rounded-br-none transition-bg_border select-none" />
         </label>

         <input
            id="search"
            type="text"
            value={inputValue}
            placeholder={t('Search-placeholder')}
            autoComplete="one-time-code"
            onChange={(e) => setInputValue(e.target.value)}
            className={`h-11 py-4 px-1 md:h-12 md:py-4 md:px-1 3xs:w-[11rem] w-[22rem] lg:w-[14rem] bg-white dark:bg-primary-300/18 shadow-2xs border border-tertiary dark:border-transparent rounded-full rounded-tl-none rounded-bl-none text-xl md:text-2xl font-medium outline-none transition-bg_border ${
               locale === 'en' ? 'md:w-[14rem]' : 'md:w-[12.5rem]'
            } ${isArchive ? `md:w-[10.5rem]` : 'md:w-[7rem]'}`}
         />
      </div>
   );
}

export default Search;
