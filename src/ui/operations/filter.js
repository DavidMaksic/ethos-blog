import { LANGUAGES } from '@/src/utils/config';
import FilterButton from '@/src/ui/buttons/filter-button';

function Filter() {
   return (
      <div className="flex items-center gap-4 text-[1.35rem] md:justify-center">
         <div className="flex gap-2 bg-white dark:bg-primary-300/15 py-2 px-3 border border-tertiary dark:border-primary-300/15 rounded-xl shadow-2xs transition-bg_color_border">
            {LANGUAGES.map((item) => (
               <FilterButton key={item.code} lang={item.code}>
                  {item.lang}
               </FilterButton>
            ))}
         </div>
      </div>
   );
}

export default Filter;
