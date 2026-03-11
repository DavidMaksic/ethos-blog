import { getTranslations } from 'next-intl/server';
import { LuArrowLeft } from 'react-icons/lu';
import { TbError404 } from 'react-icons/tb';
import { Link } from '@/src/i18n/navigation';

export default async function NotFound() {
   const t = await getTranslations('Error');

   return (
      <div className="flex items-center justify-center bg-transparent mt-55 2xl:mt-46 md:mt-72 mb-45 md:mb-56">
         <div className="max-w-7xl px-24 pt-8 pb-12 flex flex-col gap-8 rounded-3xl bg-white/60 dark:bg-primary-300/15 border border-quaternary dark:border-primary-300/15 translate-y-[-20%] box-shadow">
            <div className="flex flex-col">
               <TbError404 className="size-18 self-center stroke-[1.5px]" />
               <p className="text-4xl font-bold text-center">
                  {t('not-found')}
               </p>
            </div>

            <Link
               href="/"
               className="flex items-center gap-2 text-3xl w-max self-center text-primary-400 border-b-2 border-primary-400 hover:border-transparent dark:hover:border-transparent transition-all"
            >
               <LuArrowLeft />
               <span className="font-semibold">{t('back-btn')}</span>
            </Link>
         </div>
      </div>
   );
}
