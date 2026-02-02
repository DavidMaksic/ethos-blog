'use client';

import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { TbCategory2 } from 'react-icons/tb';
import Category from '@/src/ui/categories/category';

function Categories({ categories, isArchive = false }) {
   const searchParams = useSearchParams();
   const category = searchParams.get('category');
   const lang = searchParams.get('lang');
   const t = useTranslations('HomePage');
   const locale = useLocale();

   // Filter categories by language
   const filteredCategories = lang
      ? categories.filter((item) => item.code === lang)
      : locale
        ? categories.filter((item) => item.code === locale)
        : categories;

   // Find active category
   const currentCategory = filteredCategories.find(
      (item) =>
         item.category ===
         category?.charAt(0).toUpperCase() + category?.slice(1),
   );

   return (
      <div
         className={`md:flex md:flex-col md:items-center space-y-10 lg:space-y-7 md:order-1 md:mb-4 md:px-10 sm:px-6 ${
            isArchive &&
            'space-y-[32px]! xs:space-y-6! 2xl:space-y-[29px]! 2xl:mb-15! md:mb-6! xs:mb-4!'
         }`}
      >
         <div className="flex items-center gap-3 text-4xl lg:text-3xl md:text-4xl">
            <TbCategory2 className="text-3xl stroke-[1.4px]" />
            <h2>{t('categories')}</h2>
         </div>

         <div className="flex md:justify-center gap-4 2xl:gap-3 lg:gap-2.5 flex-wrap">
            {filteredCategories?.map((item) => (
               <Category
                  category={item}
                  key={item.id}
                  currentCategory={currentCategory}
               />
            ))}
         </div>
      </div>
   );
}

export default Categories;
