import { getArticles, getAuthors, getCategories } from '@/src/lib/data-service';
import { getTranslations } from 'next-intl/server';

import ArchiveHeading from '@/src/ui/archive-heading';
import Categories from '@/src/ui/categories/categories';
import Languages from '@/src/ui/languages';
import Articles from '@/src/ui/articles/articles';
import SortBy from '@/src/ui/operations/sort-by';

export async function generateMetadata({ params }) {
   const { locale } = await params;
   return { title: locale === 'en' ? 'Archive' : 'Архива' };
}

async function Page({ searchParams }) {
   const [param, articles, categories, authors, t] = await Promise.all([
      searchParams,
      getArticles(),
      getCategories(),
      getAuthors(),
      getTranslations('Sort'),
   ]);

   const currentCategory = categories.find(
      (item) =>
         item.category ===
         param.category?.charAt(0).toUpperCase() + param.category?.slice(1)
   );

   return (
      <div className="grid grid-cols-[2fr_1fr] md:grid-cols-1 gap-10 xs:gap-14 2xl:mt-3">
         <div className="space-y-7 lg:space-y-5 md:order-2">
            <div className="flex justify-between">
               <ArchiveHeading />

               <SortBy
                  options={[
                     {
                        value: 'created_at-asc',
                        label: t('latest'),
                     },
                     {
                        value: 'created_at-desc',
                        label: t('oldest'),
                     },
                     {
                        value: 'title-asc',
                        label: t('a-z'),
                     },
                     {
                        value: 'title-desc',
                        label: t('z-a'),
                     },
                  ]}
                  param={param}
               />
            </div>

            <Articles
               isArchive={true}
               articles={articles}
               categories={categories}
               currentCategory={currentCategory}
               param={param}
               authors={authors}
               style="dark:bg-primary-300/15"
            />
         </div>

         <div className="space-y-12 md:order-1 md:flex md:flex-col md:gap-6">
            <Categories
               categories={categories}
               currentCategory={currentCategory}
               param={param}
               isArchive={true}
            />
            <Languages param={param} />
         </div>
      </div>
   );
}

export default Page;
