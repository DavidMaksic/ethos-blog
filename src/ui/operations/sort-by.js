'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useOutsideClick } from '@/src/hooks/use-outside-click';
import { useSearchParams } from 'next/navigation';
import { useSetParams } from '@/src/hooks/use-set-params';
import { TbArrowsSort } from 'react-icons/tb';
import { FaCaretDown } from 'react-icons/fa';
import { useLocale } from 'next-intl';
import { useState } from 'react';

function SortBy({ options, isBookmarks = false }) {
   const [open, setOpen] = useState();
   const ref = useOutsideClick(() => setOpen((isOpen) => !isOpen), false);
   const locale = useLocale();

   const searchParams = useSearchParams();
   const sort = searchParams.get('sort');

   const [currentLabel, setCurrentLabel] = useState(() => {
      if (sort) return options.find((item) => item.value === sort).label;
      return options.at(0).label;
   });
   const handler = useSetParams();

   return (
      <div className="flex items-center gap-2.5 select-none md:text-2xl">
         <TbArrowsSort className="size-5 text-accent/80 dark:text-accent-200/90" />

         <div
            className={`relative ${
               locale === 'en' ? 'w-32 md:w-34' : 'w-38 md:w-42'
            }`}
         >
            <div
               className="relative px-3 py-[0.5rem] xs:py-[5px] pl-5 cursor-pointer rounded-xl bg-white dark:bg-primary-300/15 dark:hover:bg-primary-300/10 text-primary-500 border border-tertiary dark:border-primary-300/10 shadow-2xs transition-200"
               onClick={(e) => {
                  e.stopPropagation();
                  setOpen((isOpen) => !isOpen);
               }}
            >
               {currentLabel}
               <FaCaretDown className="absolute 4k:top-[24px]! top-[11px] md:top-3.5 xs:top-4 right-4 size-4.5 text-md text-primary-400 mb-0.5" />
            </div>

            <AnimatePresence>
               {open && (
                  <motion.ul
                     className={`absolute z-10 mt-2 p-1 max-h-52 w-full rounded-xl bg-white dark:bg-primary-300/11 backdrop-blur-2xl border border-tertiary dark:border-primary-300/10 shadow-lg dark:shadow-2xl overflow-auto cursor-pointer transition-bg_border ${
                        isBookmarks &&
                        'dark:bg-primary-200/90! lg:dark:bg-primary-200/80! sm:dark:bg-primary-200/75!'
                     }`}
                     ref={ref}
                     onClick={() => setOpen((isOpen) => !isOpen)}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.06 }}
                  >
                     {options.map((item) => (
                        <li
                           key={item.value}
                           value={item.value}
                           onClick={() => {
                              setCurrentLabel(item.label);
                              handler('sort', item.value);
                           }}
                           className="relative rounded-xl py-2 pl-5 transition duration-75 hover:bg-primary-100/50 dark:hover:bg-primary-300/12"
                        >
                           {item.label}
                        </li>
                     ))}
                  </motion.ul>
               )}
            </AnimatePresence>
         </div>
      </div>
   );
}

export default SortBy;
