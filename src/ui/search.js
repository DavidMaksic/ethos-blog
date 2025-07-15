'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSetParams } from '@/src/hooks/use-set-params';
import { CgSearch } from 'react-icons/cg';

function Search() {
   const [open, setOpen] = useState(false);
   const ref = useRef(null);

   const searchParams = useSearchParams();
   const query = searchParams.get('search') || '';

   const handler = useSetParams();

   useEffect(() => {
      if (open) ref.current.focus();

      const handleEnter = ({ key }) => {
         if (key === 'Enter') {
            setOpen((isOpen) => !isOpen);
         }
      };
      document.addEventListener('keydown', handleEnter, true);

      return () => {
         document.removeEventListener('keydown', handleEnter, true);
      };
   }, [open]);

   return (
      <div className="flex items-center">
         <label htmlFor="search">
            <CgSearch
               className={`size-11 text-accent-600/85 dark:text-accent-200/90 p-2 pt-2.5 pr-2.5 bg-white/60 dark:bg-primary-300/18 border border-quaternary dark:border-transparent rounded-full transition-bg_border cursor-pointer ${
                  open && 'rounded-r-none border-r-transparent'
               }`}
               onClick={() => setOpen((isOpen) => !isOpen)}
            />
         </label>

         {open && (
            <input
               ref={ref}
               id="search"
               type="text"
               value={query}
               placeholder="Search..."
               autoComplete="one-time-code"
               onChange={(e) => handler('search', e.target.value)}
               className={`h-11 py-4 px-1 w-[22rem] bg-white/60 dark:bg-primary-300/18 border border-quaternary dark:border-transparent rounded-full text-xl font-medium font-article outline-none transition-bg_border ${
                  open && 'rounded-l-none border-l-transparent'
               }`}
            />
         )}
      </div>
   );
}

export default Search;
