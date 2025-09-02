'use client';

import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from '@/src/i18n/navigation';

function PageAnimation({ children }) {
   const pathname = usePathname();

   return (
      <AnimatePresence mode="wait">
         <motion.main
            className="py-12 2xl:pt-4 md:pt-5 w-7xl 2xl:w-full mx-auto"
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
         >
            {children}
         </motion.main>
      </AnimatePresence>
   );
}

export default PageAnimation;
