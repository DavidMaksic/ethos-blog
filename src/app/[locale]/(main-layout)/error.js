'use client';

import { useTranslations } from 'next-intl';
import { LuArrowLeft } from 'react-icons/lu';
import { Link } from '@/src/i18n/navigation';

function Error({ error, reset }) {
   const t = useTranslations('Error');

   return (
      <div className="flex items-center justify-center bg-transparent mt-55 2xl:mt-46 md:mt-72 mb-45 md:mb-56">
         <div className="max-w-7xl px-20 py-12 flex flex-col gap-8 rounded-3xl bg-white/60 dark:bg-primary-300/15 border border-quaternary dark:border-primary-300/15 translate-y-[-20%] box-shadow">
            <p className="text-4xl font-bold text-center">{t('message')}</p>
            <p className="text-center text-2xl break-words">{error.message}</p>

            <Link
               href="/"
               onClick={reset}
               className="flex items-center gap-2 text-3xl w-max self-center text-primary-400 border-b-2 border-primary-400 hover:border-transparent dark:hover:border-transparent transition-all"
            >
               <LuArrowLeft />
               <span className="font-semibold">{t('back-btn')}</span>
            </Link>
         </div>
      </div>
   );
}

export default Error;
