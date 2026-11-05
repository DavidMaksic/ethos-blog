import { useTranslations } from 'next-intl';
import SortBy from '@/src/ui/operations/sort-by';
import Search from '@/src/ui/operations/search';

function BookmarkOptions({ bookmarksExist }) {
   const t = useTranslations();

   return (
      <div className="flex justify-between items-center">
         <div className="flex items-center gap-4.5">
            <h2 className="text-4xl lg:text-3xl md:text-4xl text-primary-500 dark:text-primary-600/65 md:hidden">
               {t('Profile.bookmark-label')}
            </h2>
            <div
               className={`z-10 flex-1 ${!bookmarksExist && 'invisible pointer-events-none'}`}
            >
               <Search inputStyles="md:h-13!" />
            </div>
         </div>

         <div
            className={`${!bookmarksExist && 'invisible pointer-events-none'}`}
         >
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
            />
         </div>
      </div>
   );
}

export default BookmarkOptions;
