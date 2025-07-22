'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';

function UserCommentLabel() {
   const t = useTranslations('Comment');

   return (
      <motion.h1
         className="text-4xl lg:text-3xl md:text-4xl text-primary-500 dark:text-primary-600/65"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.3 }}
      >
         {t('user-label')}
      </motion.h1>
   );
}

export default UserCommentLabel;
