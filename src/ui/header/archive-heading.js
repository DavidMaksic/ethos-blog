import { getTranslations } from 'next-intl/server';
import Search from '@/src/ui/operations/search';

async function ArchiveHeading() {
   const t = await getTranslations('Archive');

   return (
      <div className="flex items-center gap-3.5">
         <h2 className="text-4xl lg:text-3xl md:text-4xl dark:text-primary-600/65 sm:hidden">
            {t('label')}
         </h2>
         <Search isArchive={true} />
      </div>
   );
}

export default ArchiveHeading;
