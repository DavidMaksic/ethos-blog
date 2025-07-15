'use client';

import { TbCategory2 } from 'react-icons/tb';
import useFilterCategory from '@/src/hooks/use-filter-category';
import Category from '@/src/ui/category';

function Categories({ categories, currentCategory, param }) {
   const { filteredArray: filteredCategories } = useFilterCategory(
      categories,
      param
   );

   return (
      <div className="space-y-[32px]">
         <div className="flex items-center gap-3 text-4xl">
            <TbCategory2 className="text-3xl stroke-[1.4px]" />
            <h1>Categories</h1>
         </div>

         <ul className="flex gap-4 flex-wrap">
            {filteredCategories?.map((item) => (
               <Category
                  category={item}
                  key={item.id}
                  currentCategory={currentCategory}
               />
            ))}
         </ul>
      </div>
   );
}

export default Categories;
