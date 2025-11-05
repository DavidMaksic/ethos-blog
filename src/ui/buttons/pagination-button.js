import { useTranslations } from 'next-intl';
import { usePageScroll } from '@/src/hooks/use-page-scroll';

function PaginationButton({ type, handler, disabled, children }) {
   const t = useTranslations('Pagination');
   usePageScroll();

   const prev = type === t('prev-btn') && t('prev-btn');
   const next = type === t('next-btn') && t('next-btn');

   return (
      <>
         <div className="absolute top-[-200px] left-0" />

         <button
            className={`flex items-center gap-1 xs:gap-px hover:bg-accent-400 dark:hover:bg-accent-300/60 hover:border-accent-400 hover:text-white rounded-full p-2 px-3 xs:px-2.5 xs:py-2 pr-4 cursor-pointer hover:shadow-link-btn dark:hover:shadow-link-btn-dark transition ${
               prev ? 'pr-4.5 xs:pr-3' : 'pl-4.5 xs:pl-3'
            } disabled:pointer-events-none disabled:opacity-50`}
            onClick={handler}
            disabled={disabled}
         >
            <span className="xs:hidden">{next}</span>
            {children}
            <span className="xs:hidden">{prev}</span>
         </button>
      </>
   );
}

export default PaginationButton;
