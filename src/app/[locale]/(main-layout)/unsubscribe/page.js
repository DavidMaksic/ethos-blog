import { getTranslations } from 'next-intl/server';
import { unsubscribe } from '@/src/lib/actions';
import { LuArrowLeft } from 'react-icons/lu';
import { Link } from '@/src/i18n/navigation';

export default async function UnsubscribePage({ searchParams }) {
   const t = await getTranslations('Unsubscribe');
   const token = (await searchParams).token;
   const result = token ? await unsubscribe(token) : { success: false };

   return (
      <main className="flex items-center justify-center bg-transparent mt-55 2xl:mt-46 md:mt-72 mb-45 md:mb-56">
         <div className="max-w-7xl px-20 py-12 flex flex-col gap-8 rounded-3xl bg-white/60 dark:bg-primary-300/15 border border-quaternary dark:border-primary-300/15 box-shadow">
            <div className="text-4xl font-bold text-center">
               {result.success ? t('success') : t('invalid')}
            </div>

            <Link
               href="/"
               className="flex items-center gap-2 text-3xl w-max self-center text-primary-400 border-b-2 border-primary-400 hover:border-transparent dark:hover:border-transparent transition-all"
            >
               <LuArrowLeft />
               <span className="font-semibold">{t('back')}</span>
            </Link>
         </div>
      </main>
   );
}
