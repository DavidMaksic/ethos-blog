'use client';

import { Link, usePathname } from '@/src/i18n/navigation';

function HeaderItem({ to, children }) {
   const pathname = usePathname();
   const isActive = pathname === to ? true : false;

   return (
      <div className="relative">
         <Link
            href={to}
            className={`hover:text-accent dark:hover:text-accent-200 px-4 py-2 underlined-nav lg:no-underline transition md:hidden font-semibold ${
               isActive && 'text-accent dark:text-accent-200'
            }`}
         >
            {children}
         </Link>

         {isActive && (
            <>
               <div className="bg-active-link absolute 2k:hidden top-[44.5px] 2xl:top-[45px] lg:top-[44.5px] left-1/2 h-px w-14 dark:w-12 -translate-x-1/2" />
               <div className="absolute 2k:hidden top-[44px] 2xl:top-[44px] lg:top-[46px] left-1/2 size-4 dark:size-4 rounded-[4px] blur-sm bg-accent-200 dark:bg-accent -translate-x-1/2" />
            </>
         )}
      </div>
   );
}

export default HeaderItem;
