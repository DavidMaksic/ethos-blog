import { useTranslations } from 'next-intl';
import SortBy from '@/src/ui/operations/sort-by';
import Search from '@/src/ui/operations/search';

function BookmarkOptions({ param }) {
   const t = useTranslations();

   return (
      <>
         <div className="flex items-center gap-3.5">
            <h2 className="text-4xl lg:text-3xl md:text-4xl text-primary-500 dark:text-primary-600/65 md:hidden">
               {t('Profile.bookmark-label')}
            </h2>
            <Search />
         </div>

         <SortBy
            options={[
               {
                  value: 'created_at-asc',
                  label: t('Sort.latest'),
               },
               {
                  value: 'created_at-desc',
                  label: t('Sort.oldest'),
               },
               {
                  value: 'title-asc',
                  label: t('Sort.a-z'),
               },
               {
                  value: 'title-desc',
                  label: t('Sort.z-a'),
               },
            ]}
            isBookmarks={true}
            param={param}
         />
      </>
   );
}

export default BookmarkOptions;
