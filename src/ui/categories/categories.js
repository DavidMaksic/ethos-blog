'use client';

import { useTranslations } from 'next-intl';
import { TbCategory2 } from 'react-icons/tb';
import { motion } from 'motion/react';

import useFilterCategory from '@/src/hooks/use-filter-category';
import Category from '@/src/ui/categories/category';

function Categories({ categories, currentCategory, param, isArchive = false }) {
   const { filteredArray: filteredCategories } = useFilterCategory(
      categories,
      param
   );

   const t = useTranslations('HomePage');

   return (
      <motion.div
         className={`md:flex md:flex-col md:items-center space-y-10 lg:space-y-7 md:order-1 md:mb-4 md:px-10 sm:px-6 ${
            isArchive && 'space-y-[32px]! xl:space-y-[29px]! xl:mb-15!'
         }`}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.2 }}
      >
         <div className="flex items-center gap-3 text-4xl lg:text-3xl md:text-4xl">
            <TbCategory2 className="text-3xl stroke-[1.4px]" />
            <h1>{t('categories')}</h1>
         </div>

         <div className="flex md:justify-center gap-4 xl:gap-3 lg:gap-2.5 flex-wrap">
            {filteredCategories?.map((item) => (
               <Category
                  category={item}
                  key={item.id}
                  currentCategory={currentCategory}
               />
            ))}
         </div>
      </motion.div>
   );
}

export default Categories;
