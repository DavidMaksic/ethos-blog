'use client';

import { useTranslations } from 'use-intl';
import { motion } from 'motion/react';
import Search from '@/src/ui/operations/search';

function ArchiveHeading() {
   const t = useTranslations('Archive');

   return (
      <motion.div
         className="flex items-center gap-3.5"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.3 }}
      >
         <h1 className="text-4xl lg:text-3xl md:text-4xl dark:text-primary-600/65 xs:hidden">
            {t('label')}
         </h1>
         <Search isArchive={true} />
      </motion.div>
   );
}

export default ArchiveHeading;
