import { useTranslations } from 'next-intl';
import { useScroll } from '@/src/hooks/use-scroll';

function PaginationButton({ type, handler, disabled, children }) {
   const t = useTranslations('Pagination');

   const prev = type === t('prev-btn') && t('prev-btn');
   const next = type === t('next-btn') && t('next-btn');
   const { setScroll, ref } = useScroll();

   return (
      <>
         <div className="absolute top-[-200px] left-0" ref={ref} />

         <button
            className={`flex items-center gap-1 xs:gap-px hover:bg-accent-400 dark:hover:bg-accent-300/60 hover:border-accent-400 hover:text-white rounded-full p-2 px-3 xs:px-3 xs:py-1 pr-4 cursor-pointer hover:shadow-link-btn dark:hover:shadow-link-btn-dark transition ${
               prev ? 'pr-4.5 xs:pr-2' : 'pl-4.5 xs:pr-2'
            } disabled:pointer-events-none disabled:opacity-50`}
            onClick={() => {
               setScroll(true);
               handler();
            }}
            disabled={disabled}
         >
            {next}
            {children}
            {prev}
         </button>
      </>
   );
}

export default PaginationButton;
