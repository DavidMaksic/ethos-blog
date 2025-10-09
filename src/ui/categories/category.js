'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSetParams } from '@/src/hooks/use-set-params';
import { useTheme } from 'next-themes';

function Category({ category, customStyles, currentCategory }) {
   const currentTag = currentCategory?.category;

   const [bgColor, setBgColor] = useState();
   const [textColor, setTextColor] = useState();
   const { resolvedTheme } = useTheme();

   const handler = useSetParams();
   const params = useSearchParams();
   const router = useRouter();

   useEffect(() => {
      if (!category && !mounted) return;

      if (resolvedTheme === 'dark') {
         setBgColor(category.bg_dark);
         setTextColor(category.text_dark);
      } else {
         setBgColor(category.bg_light);
         setTextColor(category.text_light);
      }
   }, [resolvedTheme, category]);

   return (
      <span
         className={`border px-3.5 md:px-4 pl-4 py-1.5 pb-[0.3rem] lg:pb-[0.4rem] md:pb-[0.6rem] xs:pb-[0.55rem] md:py-2 rounded-full font-semibold lg:font-bold text-[1.415rem] 2xl:text-[1.3rem] lg:text-[1.2rem] md:text-2xl cursor-pointer transition-200 border-primary ${
            currentTag !== category.category && currentTag
               ? `bg-white! text-primary-400! dark:text-primary-500/70! border-primary-200/70! xs:dark:border-primary-300/5! dark:bg-primary-300/20! xs:dark:bg-primary-300/15!`
               : ''
         } ${customStyles}`}
         style={{
            backgroundColor: `${bgColor}`,
            color: `${textColor}`,
         }}
         onClick={() => {
            if (currentTag === category.category) {
               const param = new URLSearchParams(params);
               param.delete('category');
               router.replace(`?${param.toString()}`, {
                  scroll: false,
               });
            } else {
               handler('category', category.category.toLowerCase());
            }
         }}
      >
         {category.category}
      </span>
   );
}

export default Category;
