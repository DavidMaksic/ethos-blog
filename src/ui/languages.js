'use client';

import { IoLanguageOutline } from 'react-icons/io5';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import Filter from '@/src/ui/operations/filter';

function Languages({ param }) {
   const t = useTranslations('Archive');

   return (
      <motion.div
         className="space-y-6 md:order-2"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.2 }}
      >
         <div className="flex gap-3 items-center md:justify-center">
            <IoLanguageOutline className="size-7.5 stroke-[0.2px]" />
            <h1 className="text-4xl">{t('lang-label')}</h1>
         </div>

         <Filter param={param} />
      </motion.div>
   );
}

export default Languages;
