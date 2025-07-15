'use client';

import { useEffect, useState } from 'react';
import { useSetParams } from '@/src/hooks/use-set-params';
import { useTheme } from 'next-themes';

function Category({ category, customStyles, currentCategory }) {
   const currentTag = currentCategory?.category;

   const [bgColor, setBgColor] = useState('');
   const [textColor, setTextColor] = useState('');

   const { theme } = useTheme();

   const handler = useSetParams();

   useEffect(() => {
      if (!category) return;
      if (theme === 'dark') {
         setBgColor(category.bgDark);
         setTextColor(category.textDark);
      } else {
         setBgColor(category.bgLight);
         setTextColor(category.textLight);
      }
   }, [theme, category]);

   return (
      <>
         {bgColor ? (
            <span
               className={`border px-3.5 pl-4 py-1.5 rounded-full font-medium text-[1.415rem] cursor-pointer transition-200 select-none border-primary ${
                  currentTag !== category.category && currentTag
                     ? `bg-white! text-primary-400! dark:text-primary-500/70! border-primary-200/70! dark:bg-primary-200!`
                     : ''
               } ${customStyles}`}
               style={{
                  backgroundColor: `${bgColor}`,
                  color: `${textColor}`,
               }}
               onClick={() => {
                  if (currentTag === category.category) {
                     handler('category', '');
                  } else {
                     handler('category', category.category.toLowerCase());
                  }
               }}
            >
               {category.category}
            </span>
         ) : (
            <div className="flex gap-4 flex-wrap mt-[-1.4px] animate-skeleton">
               <span className="border px-3.5 pl-4 py-1.5 text-[1.415rem] text-transparent bg-primary-300 rounded-full font-medium">
                  {category.category}
               </span>
            </div>
         )}
      </>
   );
}

export default Category;
