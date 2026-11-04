'use client';

import {
   Drawer,
   DrawerClose,
   DrawerTitle,
   DrawerTrigger,
   DrawerContent,
} from '@/components/ui/drawer';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/src/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { LuListFilter } from 'react-icons/lu';

const FILTER_KEYS = ['category', 'lang', 'sort'];
const DEFAULT_SORT = 'created_at-asc';

export default function FilterDrawer({ children }) {
   const t = useTranslations();
   const locale = useLocale();
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   const activeCount = FILTER_KEYS.filter((k) => {
      const v = searchParams.get(k);
      return k === 'sort'
         ? v !== null && v !== DEFAULT_SORT
         : v !== null && v !== '';
   }).length;

   const hasActiveFilters = activeCount > 0;

   const clearAll = () => {
      const params = new URLSearchParams(searchParams.toString());
      [...FILTER_KEYS, 'page'].forEach((k) => params.delete(k));
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
   };

   const fontClass = locale === 'en' ? 'font-logo' : 'font-logo-sr';

   return (
      <Drawer>
         <DrawerTrigger asChild>
            <button
               type="button"
               className="relative flex items-center gap-3 rounded-full shadow-xs bg-white dark:bg-primary-300/18 pl-4 pr-4.5 py-2 text-2xl z-10"
            >
               <LuListFilter className="size-5 text-accent dark:text-accent-200" />
               {t('Filters.label')}
               {activeCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full bg-accent-400 dark:bg-accent-300/80 text-base font-semibold text-white font-article">
                     {activeCount}
                  </span>
               )}
            </button>
         </DrawerTrigger>

         <DrawerContent
            aria-describedby={undefined}
            className="rounded-t-3xl border-0 bg-white/92 backdrop-blur-xl dark:bg-[#3a434b85] dark:backdrop-blur-3xl text-text dark:text-primary-600/90 outline-none data-[vaul-drawer-direction=bottom]:max-h-[85dvh]"
         >
            <DrawerTitle className="pt-6 pb-4 text-3xl font-semibold text-primary-600 md:dark:text-primary-600/80 text-center">
               {t('Filters.title')}
            </DrawerTitle>

            <div className="flex flex-col gap-8 overflow-y-auto pt-8 pb-12 px-12">
               {children}

               <div className="mt-0.5 flex items-center gap-3 px-5 py-5 sm:pb-0 sm:pt-8 sm:px-0 border-t border-primary-200/80 dark:border-primary-300/30 order-4 text-3xl">
                  <button
                     type="button"
                     onClick={clearAll}
                     disabled={!hasActiveFilters}
                     className={`w-full h-14 rounded-2xl items-center gap-2 bg-white dark:bg-primary-300/50 disabled:opacity-60 border border-primary-200 dark:border-primary-300/30 dark:text-primary-600 shadow-xs text-center cursor-pointer transition tracking-wide ${fontClass}`}
                  >
                     {t('Filters.clear-all')}
                  </button>

                  <DrawerClose asChild>
                     <button
                        type="button"
                        className={`w-full h-14 rounded-2xl items-center gap-2 bg-accent-400 dark:bg-accent-300/55 text-white shadow-link-btn dark:shadow-none text-center cursor-pointer transition tracking-wide ${fontClass}`}
                     >
                        {t('Filters.done')}
                     </button>
                  </DrawerClose>
               </div>
            </div>
         </DrawerContent>
      </Drawer>
   );
}
