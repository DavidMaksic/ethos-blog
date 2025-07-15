'use client';

import { useEffect, useState } from 'react';
import { useOutsideClick } from '@/src/hooks/use-outside-click';
import { useSetParams } from '@/src/hooks/use-set-params';
import { TbArrowsSort } from 'react-icons/tb';
import { FaCaretDown } from 'react-icons/fa';

function SortBy({ options }) {
   const [open, setOpen] = useState();
   const ref = useOutsideClick(() => setOpen((isOpen) => !isOpen), false);

   const [currentLabel, setCurrentLabel] = useState(options.at(0).label);
   const handler = useSetParams();

   return (
      <div className="flex items-center gap-2.5 select-none">
         <TbArrowsSort className="size-5 text-accent/80 dark:text-accent-200/90" />

         <div className="relative w-32">
            <div
               className="relative px-3 py-[7px] pl-5 cursor-pointer rounded-xl bg-white dark:bg-primary-200 dark:hover:bg-primary-100 text-primary-500 border border-tertiary shadow-2xs transition-200"
               onClick={(e) => {
                  e.stopPropagation();
                  setOpen((isOpen) => !isOpen);
               }}
            >
               {currentLabel}
               <FaCaretDown className="absolute top-[11px] right-4 size-4.5 text-md text-primary-400 mb-0.5" />
            </div>

            {open && (
               <ul
                  className="absolute z-10 mt-2 max-h-52 w-full rounded-xl bg-white dark:bg-primary-200 border border-tertiary shadow-lg overflow-auto cursor-pointer transition-bg_border"
                  ref={ref}
                  onClick={() => setOpen((isOpen) => !isOpen)}
               >
                  {options.map((item) => (
                     <li
                        key={item.value}
                        value={item.value}
                        onClick={() => {
                           setCurrentLabel(item.label);
                           handler('sort', item.value);
                        }}
                        className="relative py-2 pl-6 hover:bg-primary-50 dark:hover:bg-primary-100"
                     >
                        {item.label}
                     </li>
                  ))}
               </ul>
            )}
         </div>
      </div>
   );
}

export default SortBy;
