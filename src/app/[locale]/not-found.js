import { getTranslations } from 'next-intl/server';
import { LuArrowLeft } from 'react-icons/lu';
import { Link } from '@/src/i18n/navigation';

async function NotFound() {
   const t = await getTranslations('Error');

   return (
      <main className="flex items-center justify-center bg-primary dark:bg-transparent mt-[18%] mb-[20%]">
         <div className="px-20 py-12 flex flex-col gap-10 rounded-3xl bg-white/60 dark:bg-primary-300/15 border border-quaternary dark:border-tertiary translate-y-[-20%]">
            <p className="text-4xl font-bold">{t('no-page')}</p>

            <Link
               href="/"
               className="flex items-center gap-2 text-3xl w-max self-center text-primary-400 border-b-2 border-primary-400 hover:border-transparent dark:hover:border-transparent transition-all font-semibold"
            >
               <LuArrowLeft />
               <span>{t('back-btn')}</span>
            </Link>
         </div>
      </main>
   );
}

export default NotFound;
