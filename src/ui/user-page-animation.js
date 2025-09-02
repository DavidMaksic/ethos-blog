'use client';

import { usePathname } from '@/src/i18n/navigation';
import { motion } from 'motion/react';

function UserPageAnimation({ children }) {
   const pathname = usePathname();

   return (
      <motion.div
         key={pathname}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.3 }}
      >
         {children}
      </motion.div>
   );
}

export default UserPageAnimation;
