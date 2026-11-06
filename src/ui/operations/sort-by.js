'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import { LuCheck, LuChevronDown } from 'react-icons/lu';
import { TbArrowsSort } from 'react-icons/tb';
import { useSetParams } from '@/src/hooks/use-set-params';

import {
   DropdownMenu,
   DropdownMenuItem,
   DropdownMenuTrigger,
   DropdownMenuContent,
} from '@/components/ui/dropdown-menu';

function SortBy({ options, isBookmarks = false, isArchive = false }) {
   const locale = useLocale();
   const t = useTranslations('Filters');
   const isMobile = useMediaQuery({ maxWidth: 768 });

   const searchParams = useSearchParams();
   const handler = useSetParams();

   const sort = searchParams.get('sort');
   const current = options.find((item) => item.value === sort) ?? options[0];

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
            <span>{t('sort')}</span>
         </div>

         <div
            className={`relative self-end ${isArchive && 'md:w-full md:self-start'} ${
               locale === 'en' ? 'w-32' : 'w-38'
            }`}
         >
            <DropdownMenu modal={false}>
               <DropdownMenuTrigger
                  className={`flex w-full justify-between items-center md:gap-3 px-3 py-[0.5rem] md:py-2.5! xs:py-[5px] pl-5 cursor-pointer outline-none rounded-xl md:rounded-2xl bg-white dark:bg-primary-300/15 md:dark:bg-primary-300/30 dark:hover:bg-primary-300/10 text-primary-500 md:text-inherit border border-tertiary dark:border-primary-300/10 shadow-2xs transition-200 ${isArchive && 'md:text-[1.8rem] md:pl-7'}`}
               >
                  {current.label}
                  <LuChevronDown className="size-5 md:size-6.5 translate-y-px md:mr-1 text-primary-400" />
               </DropdownMenuTrigger>

               <DropdownMenuContent
                  align="start"
                  side={isMobile && isArchive ? 'top' : 'bottom'}
                  sideOffset={8}
                  className={`min-w-32 bg-white dark:bg-primary-300/20 backdrop-blur-2xl transition-bg_border ${
                     isBookmarks &&
                     'dark:bg-primary-200/90! lg:dark:bg-primary-200/80! sm:dark:bg-primary-200/75!'
                  }`}
               >
                  {options.map((item) => (
                     <DropdownMenuItem
                        key={item.value}
                        onClick={() => handler('sort', item.value)}
                        className={`justify-between py-2 pl-4 pr-3 text-xl hover:text-text! ${isArchive && 'md:text-[1.8rem]'}`}
                     >
                        {item.label}
                        {item.value === current.value && (
                           <LuCheck className="size-4 md:size-5 shrink-0 text-accent dark:text-accent-200" />
                        )}
                     </DropdownMenuItem>
                  ))}
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </div>
   );
}

export default SortBy;
