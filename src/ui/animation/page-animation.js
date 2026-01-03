'use client';

import { useEffect, useState } from 'react';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import { usePathname } from '@/src/i18n/navigation';
import { motion } from 'motion/react';

function PageAnimation({ children }) {
   useThemeColor();
   const pathname = usePathname();
   const [isFirstLoad, setIsFirstLoad] = useState(true);

   useEffect(() => {
      setIsFirstLoad(false);
   }, []);

   const centerLayout = pathname === '/about';

   return (
      <motion.main
         className={`md:pt-5 w-7xl min-h-[91vh] 2xl:w-full mx-auto ${
            centerLayout ? 'flex items-center' : 'py-[4.7dvh]'
         }`}
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
