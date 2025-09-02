import { IoLanguageOutline } from 'react-icons/io5';
import { getTranslations } from 'next-intl/server';
import Filter from '@/src/ui/operations/filter';

async function Languages({ param }) {
   const t = await getTranslations('Archive');

   return (
      <div className="space-y-6 md:order-2">
         <div className="flex gap-3 items-center md:justify-center">
            <IoLanguageOutline className="size-7.5 stroke-[0.2px]" />
            <h1 className="text-4xl">{t('lang-label')}</h1>
         </div>

         <Filter param={param} />
      </div>
   );
}

export default Languages;
