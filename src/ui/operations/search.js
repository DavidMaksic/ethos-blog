'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useSetParams } from '@/src/hooks/use-set-params';
import { CgSearch } from 'react-icons/cg';
import useDebounce from '@/src/hooks/use-debounce';

function Search({ isArchive = false }) {
   const t = useTranslations();
   const locale = useLocale();

   const [open, setOpen] = useState(false);
   const inputRef = useRef(null);

   const searchParams = useSearchParams();
   const handler = useSetParams();

   const lang = searchParams.get('lang') || '';
   const langString = lang.charAt(0).toLowerCase() + lang.slice(1);

   // - When language is switched, remove input
   useEffect(() => setInputValue(''), [langString]);

   const initialQuery = searchParams.get('search') || '';
   const [inputValue, setInputValue] = useState(initialQuery);
   const debouncedInput = useDebounce(inputValue, 200);

   // - Open search if there's an existing query
   useEffect(() => {
      if (initialQuery) setOpen(true);
   }, []); // eslint-disable-line

   // - Set focus when search opens
   useEffect(() => {
      if (open && inputRef.current) {
         inputRef.current.focus();
      }
   }, [open]);

   // - Update URL param only when debounced input changes
   useEffect(() => {
      const trimmed = debouncedInput?.trim() || '';
      const current = searchParams.get('search') || '';

      if (trimmed === current) return;

      handler('search', trimmed || null);
   }, [debouncedInput, handler, searchParams]);

   // - Toggle open on Enter key
   useEffect(() => {
      const handleEnter = ({ key }) => {
         if (key === 'Enter') {
            setOpen((isOpen) => !isOpen);
         }
      };
      document.addEventListener('keydown', handleEnter, true);

      return () => {
         document.removeEventListener('keydown', handleEnter, true);
      };
   }, []);

   return (
      <div className="flex items-center z-10">
         <label htmlFor="search">
            <CgSearch
               className={`md:hidden size-11 text-accent-600/85 dark:text-accent-200/90 p-2 pt-2.5 pr-2.5 bg-white dark:bg-primary-300/18 shadow-2xs border border-tertiary dark:border-transparent rounded-full transition-bg_border cursor-pointer ${
                  open && 'rounded-r-none border-r-transparent'
               }`}
               onClick={() => setOpen((isOpen) => !isOpen)}
            />

            <CgSearch className="hidden md:block size-12 text-accent-600/85 dark:text-accent-200/90 p-2 pt-2.5 pr-2.5 bg-white dark:bg-primary-300/18 shadow-2xs border border-tertiary dark:border-transparent rounded-full transition-bg_border cursor-pointer rounded-r-none border-r-transparent" />
         </label>

         {open && (
            <input
               ref={inputRef}
               id="search"
               type="text"
               value={inputValue}
               placeholder={t('Search-placeholder')}
               autoComplete="one-time-code"
               onChange={(e) => setInputValue(e.target.value)}
               className={`md:hidden h-11 py-4 px-1 w-[22rem] lg:w-[14rem] bg-white dark:bg-primary-300/18 shadow-2xs border border-tertiary dark:border-transparent rounded-full text-xl font-medium outline-none transition-bg_border ${
                  open && 'rounded-l-none border-l-transparent'
               } ${
                  isArchive
                     ? `md:w-[18rem] sm:w-[10.5rem]`
                     : 'lg:w-[20rem] md:w-[9.5rem] sm:w-[7rem]'
               }`}
            />
         )}

         <input
            ref={inputRef}
            id="search"
            type="text"
            value={inputValue}
            placeholder={t('Search-placeholder')}
            autoComplete="one-time-code"
            onChange={(e) => setInputValue(e.target.value)}
            className={`hidden md:block h-12 py-4 px-1 3xs:w-[11rem] bg-white dark:bg-primary-300/18 shadow-2xs border border-tertiary dark:border-transparent rounded-full text-2xl font-medium outline-none transition-bg_border rounded-l-none border-l-transparent ${
               locale === 'en' ? 'w-[14rem]' : 'w-[12.5rem]'
            } ${isArchive ? `w-[10.5rem]` : 'w-[7rem]'}`}
         />
      </div>
   );
}

export default Search;
