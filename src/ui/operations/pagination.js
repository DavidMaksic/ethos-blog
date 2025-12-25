'use client';

import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { usePathname, useRouter } from '@/src/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import PaginationButton from '@/src/ui/buttons/pagination-button';

function Pagination({ count, isArchive = true }) {
   const t = useTranslations('Pagination');
   const router = useRouter();

   const pathname = usePathname();
   const searchParams = useSearchParams();
   const params = new URLSearchParams(searchParams);

   const [pageSize, setPageSize] = useState(() => {
      if (isArchive) return Number(process.env.NEXT_PUBLIC_PAGE_SIZE);
      return 3;
   });

   const currentPage = !params.get('page')
      ? 1
      : Number(searchParams.get('page'));

   const pageCount = Math.ceil(count / pageSize);

   function nextPage() {
      const next = currentPage === pageCount ? currentPage : currentPage + 1;

      const params = new URLSearchParams(searchParams);
      params.set('page', next);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
   }

   function prevPage() {
      const prev = currentPage === 1 ? currentPage : currentPage - 1;

      const params = new URLSearchParams(searchParams);
      params.set('page', prev);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
   }

   if (pageCount <= 1) return null;

   return (
      <div
         className={`flex justify-between items-center py-3 lg:py-2.5 md:py-3 px-6 pl-9 xs:pl-6 md:pr-4 xs:pr-5 bg-transparent border border-quaternary dark:border-primary-300/25 rounded-2xl text-lg md:text-xl transition-bg font-medium ${
            isArchive && 'mb-6'
         }`}
      >
         <div className="flex items-center pb-0.5">
            <span className="md:hidden">{t('showing')}&nbsp;</span>
            <div className="bg-primary-200 dark:bg-primary-300/20 p-0.5 px-2 rounded-lg transition-bg">
               <span className="font-semibold">
                  {(currentPage - 1) * pageSize + 1}
               </span>
               <span>&nbsp;{t('to')}&nbsp;</span>
               <span className="font-semibold">
                  {currentPage === pageCount ? count : currentPage * pageSize}
               </span>
            </div>
            <span>&nbsp;{t('of')}&nbsp;</span>
            <span className="font-semibold">{count}&nbsp;</span>
            <span>{t('results')}</span>
         </div>

         <div className="flex gap-2 xs:gap-1.5 font-medium">
            <PaginationButton
               type={t('prev-btn')}
               handler={prevPage}
               disabled={currentPage === 1}
            >
               <IoChevronBackOutline className="xs:size-5.5" />
            </PaginationButton>

            <PaginationButton
               type={t('next-btn')}
               handler={nextPage}
               disabled={currentPage === pageCount}
            >
               <IoChevronForwardOutline className="xs:size-5.5" />
            </PaginationButton>
         </div>
      </div>
   );
}

export default Pagination;
