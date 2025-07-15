'use client';

import FilterButton from '@/src/ui/buttons/filter-button';

function Filter({ param }) {
   const options = ['Српски', 'English'];

   return (
      <div className="flex items-center gap-4 text-[1.35rem]">
         <div className="flex gap-2 bg-white dark:bg-primary-200 py-2 px-3 border border-tertiary rounded-xl shadow-2xs transition-bg_color_border">
            {options.map((item) => (
               <FilterButton key={item} lang={item} param={param}>
                  {item}
               </FilterButton>
            ))}
         </div>
      </div>
   );
}

export default Filter;
