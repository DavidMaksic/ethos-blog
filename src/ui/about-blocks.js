'use client';

import { useTranslations } from 'next-intl';
import Author from '@/src/ui/author';

function AboutBlocks({ authors }) {
   const t = useTranslations('About');

   return (
      <div className="grid grid-cols-10 items-stretch gap-y-2 2xl:gap-y-0 gap-x-8 2xl:gap-x-6 2xl:mt-3 py-4">
         <section
            className={`space-y-6 col-span-6 md:col-span-full py-10 lg:py-8 md:pb-9 px-14 lg:px-12 md:mb-6 bg-white dark:bg-primary-300/10 border border-quaternary dark:border-primary-300/15 rounded-2xl md:rounded-3xl box-shadow font-medium`}
         >
            <h1 className="text-4xl text-primary-600/75 font-bold">
               {t('label')}
            </h1>
            <p className="text-[1.35rem] leading-7.5 md:leading-8 md:text-2xl">
               {t('description')}
            </p>
         </section>

         <section className="space-y-1.5 col-span-4 md:col-span-7 sm:col-span-8 py-10 lg:py-8 md:pb-9 px-14 lg:px-12 bg-white dark:bg-primary-300/10 border border-quaternary dark:border-primary-300/15 rounded-2xl md:rounded-3xl box-shadow font-medium">
            <h2 className="text-4xl text-primary-600/75 font-bold">
               {t('label-2')}
            </h2>
            <span className="text-primary-400 text-[1.4rem]">{t('ipa')}</span>
            <p className="text-[1.35rem] leading-7.5 md:leading-8 md:text-2xl mt-3">
               {t.rich('etymology', {
                  em: (chunks) => <em>{chunks}</em>,
               })}
            </p>
         </section>

         {authors?.map((item) => (
            <Author author={item} key={item.id} styles="mt-6" />
         ))}
      </div>
   );
}

export default AboutBlocks;
