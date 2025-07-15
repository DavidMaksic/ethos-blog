import { getArticles, getAuthors, getCategories } from '@/src/lib/data-service';
import { getTranslations } from 'next-intl/server';

import Categories from '@/src/ui/categories/categories';
import Languages from '@/src/ui/languages';
import Articles from '@/src/ui/articles/articles';
import SortBy from '@/src/ui/operations/sort-by';
import Search from '@/src/ui/operations/search';

export async function generateMetadata({ params }) {
   const { locale } = await params;
   return { title: locale === 'en' ? 'Archive' : 'Архива' };
}

async function Page({ searchParams }) {
   const param = await searchParams;
   const articles = await getArticles();
   const categories = await getCategories();
   const authors = await getAuthors();
   const t = await getTranslations();

   const currentCategory = categories.find(
      (item) =>
         item.category ===
         param.category?.charAt(0).toUpperCase() + param.category?.slice(1)
   );

   return (
      <div className="grid grid-cols-[2fr_1fr] md:grid-cols-1 gap-10 xl:mt-3">
         <div className="space-y-7 lg:space-y-5 md:order-2">
            <div className="flex justify-between">
               <div className="flex items-center gap-3.5">
                  <h1 className="text-4xl lg:text-3xl md:text-4xl dark:text-primary-600/65">
                     {t('Archive.label')}
                  </h1>
                  <Search isArchive={true} />
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
