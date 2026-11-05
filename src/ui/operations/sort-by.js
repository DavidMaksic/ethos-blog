'use client';

import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useOutsideClick } from '@/src/hooks/use-outside-click';
import { useSearchParams } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import { LuChevronDown } from 'react-icons/lu';
import { useSetParams } from '@/src/hooks/use-set-params';
import { TbArrowsSort } from 'react-icons/tb';

function SortBy({ options, isBookmarks = false, isArchive = false }) {
   const [open, setOpen] = useState(false);
   const ref = useOutsideClick(() => setOpen(false), false);
   const locale = useLocale();

   const t = useTranslations('Filters');
   const isMobile = useMediaQuery({ maxWidth: 768 });

   const searchParams = useSearchParams();
   const sort = searchParams.get('sort');

   const [currentLabel, setCurrentLabel] = useState(() => {
      if (sort) return options.find((item) => item.value === sort).label;
      return options.at(0).label;
   });

   useEffect(() => {
      if (!sort) setCurrentLabel(options.at(0).label);
   }, [sort, options]);

   const handler = useSetParams();

   return (
      <div
         className={`flex items-center gap-2.5 select-none md:text-2xl md:order-3 md:self-start z-10 md:w-full ${isArchive && 'md:mt-2 md:flex-col'}`}
      >
         <TbArrowsSort
            className={`size-5 text-accent/80 dark:text-accent-200/90 ${isArchive && 'md:hidden'}`}
         />

         <div
            className={`hidden text-4xl lg:text-3xl md:text-[1.7rem] md:self-start md:flex md:gap-3 md:items-center md:mb-3 md:text-primary-500 md:dark:text-primary-600/70 md:font-semibold ${isArchive ? 'block' : 'hidden!'}`}
         >
            <TbArrowsSort className="text-3xl md:size-5.5 stroke-[1.4px]" />
            <h2>{t('sort')}</h2>
         </div>

         <div
            className={`relative self-end ${isArchive && 'md:w-full md:self-start'} ${
               locale === 'en' ? 'w-32' : 'w-38'
            }`}
         >
            <div
               className={`flex justify-between items-center md:gap-3 px-3 py-[0.5rem] md:py-2.5! xs:py-[5px] pl-5 cursor-pointer rounded-xl md:rounded-2xl bg-white dark:bg-primary-300/15 md:dark:bg-primary-300/30 dark:hover:bg-primary-300/10 text-primary-500 md:text-inherit border border-tertiary dark:border-primary-300/10 shadow-2xs transition-200 ${isArchive && 'md:text-[1.8rem] md:pl-7'}`}
               onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                  setOpen((prev) => !prev);
               }}
            >
               {currentLabel}
               <LuChevronDown className="size-5 md:size-6.5 translate-y-px md:mr-1 text-primary-400" />
            </div>

            <AnimatePresence>
               {open && (
                  <motion.ul
                     className={`absolute z-20 mt-2 p-1 max-h-52 md:max-h-60 w-full rounded-xl md:rounded-2xl bg-white dark:bg-primary-300/11 backdrop-blur-2xl md:dark:backdrop-blur-none md:dark:bg-[#323b42] border border-tertiary dark:border-primary-300/10 shadow-lg dark:shadow-2xl overflow-auto cursor-pointer transition-bg_border ${isArchive && 'md:-top-62'} ${
                        isBookmarks &&
                        'dark:bg-primary-200/90! lg:dark:bg-primary-200/80! sm:dark:bg-primary-200/75!'
                     }`}
                     ref={ref}
                     onClick={() => setOpen((isOpen) => !isOpen)}
                     initial={{ opacity: 0, y: -8, scale: 0.97 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{
                        opacity: 0,
                        y: isMobile && isArchive ? 8 : -8,
                        scale: 0.97,
                     }}
                     transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                        duration: 0.12,
                     }}
                  >
                     {options.map((item) => (
                        <li
                           key={item.value}
                           value={item.value}
                           onClick={() => {
                              setCurrentLabel(item.label);
                              handler('sort', item.value);
                           }}
                           className={`relative rounded-xl py-2 pl-5 transition duration-75 hover:bg-primary-100/50 dark:hover:bg-primary-300/12 ${isArchive && 'md:text-[1.8rem]'}`}
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
