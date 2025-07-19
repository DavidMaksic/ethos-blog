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
   const initialQuery = searchParams.get('search') || '';
   const [inputValue, setInputValue] = useState(initialQuery);

   const handler = useSetParams();
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
      handler('search', debouncedInput);
   }, [debouncedInput]); // eslint-disable-line

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
      <div className="flex items-center">
         <label htmlFor="search">
            <CgSearch
               className={`size-11 md:size-12 text-accent-600/85 dark:text-accent-200/90 p-2 pt-2.5 pr-2.5 bg-white/60 md:bg-white dark:bg-primary-300/18 md:dark:bg-primary-300/18 border border-quaternary dark:border-transparent rounded-full transition-bg_border cursor-pointer ${
                  open && 'rounded-r-none border-r-transparent'
               }`}
               onClick={() => setOpen((isOpen) => !isOpen)}
            />
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
               className={`xs:placeholder-transparent h-11 md:h-12 py-4 px-1 w-[22rem] lg:w-[14rem] bg-white/60 md:bg-white dark:bg-primary-300/18 md:dark:bg-primary-300/18 border border-quaternary dark:border-transparent rounded-full text-xl md:text-2xl font-medium font-article outline-none transition-bg_border ${
                  open && 'rounded-l-none border-l-transparent'
               } ${
                  isArchive
                     ? `md:w-[18rem] sm:w-[10.5rem] ${
                          locale === 'en' ? 'xs:w-[8rem]' : 'xs:w-[6.5rem]'
                       }`
                     : 'md:w-[9.5rem] sm:w-[7rem]'
               }`}
            />
         )}
      </div>
   );
}

export default Search;
