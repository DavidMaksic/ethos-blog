'use client';

import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'motion/react';
import Author from '@/src/ui/author';

function AboutBlocks({ authors }) {
   const t = useTranslations('About');

   return (
      <AnimatePresence mode="wait">
         <motion.div
            className="grid grid-cols-10 items-stretch gap-y-2 xl:gap-y-0 gap-x-8 xl:gap-x-6 xl:mt-3 py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
         >
            <section
               className={`space-y-6 col-span-6 md:col-span-full py-10 lg:py-8 md:pb-9 px-14 lg:px-12 md:mb-6 bg-white dark:bg-primary-300/10 border border-quaternary dark:border-primary-300/15 rounded-2xl md:rounded-3xl font-medium box-shadow`}
            >
               <h1 className="text-4xl text-primary-600/75 sm:font-semibold">
                  {t('label')}
               </h1>
               <p className="md:text-2xl">{t('description')}</p>
            </section>

            <section
               className={`space-y-1.5 col-span-4 md:col-span-7 sm:col-span-8 py-10 lg:py-8 md:pb-9 px-14 lg:px-12 bg-white dark:bg-primary-300/10 border border-quaternary dark:border-primary-300/15 rounded-2xl md:rounded-3xl font-medium box-shadow`}
            >
               <h2 className="text-4xl text-primary-600/75 sm:font-semibold">
                  {t('label-2')}
               </h2>
               <span className="text-primary-400">{t('ipa')}</span>
               <p className="text-lg md:text-xl mt-3">
                  {t.rich('etymology', {
                     em: (chunks) => <em>{chunks}</em>,
                  })}
               </p>
            </section>

            {authors?.map((item) => (
               <Author author={item} key={item.id} styles="mt-6" />
            ))}
         </motion.div>
      </AnimatePresence>
   );
}

export default AboutBlocks;
