'use client';

import { useEffect, useState } from 'react';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import { usePathname } from '@/src/i18n/navigation';
import { motion } from 'motion/react';

function PageAnimation({ children }) {
   useThemeColor();
   const pathname = usePathname();
   const isUserRoute = pathname.startsWith('/user');

   const [isFirstLoad, setIsFirstLoad] = useState(true);

   useEffect(() => {
      setIsFirstLoad(false);
   }, []);

   if (isUserRoute) {
      return (
         <main className="py-12 2xl:pt-4 md:pt-5 w-7xl 2xl:w-full mx-auto">
            {children}
         </main>
      );
   }

   return (
      <motion.main
         className="py-12 2xl:pt-4 md:pt-5 w-7xl 2xl:w-full mx-auto"
         key={pathname}
         initial={isFirstLoad ? false : { opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.3 }}
      >
         {children}
      </motion.main>
   );
}

export default PageAnimation;
