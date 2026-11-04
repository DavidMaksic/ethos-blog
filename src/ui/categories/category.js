'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSetParams } from '@/src/hooks/use-set-params';
import { useTheme } from 'next-themes';

function Category({ category, customStyles, isLink = false, currentCategory }) {
   const currentTag = currentCategory?.category;
   const [bgColor, setBgColor] = useState();
   const [textColor, setTextColor] = useState();

   const handler = useSetParams();
   const params = useSearchParams();
   const router = useRouter();

   const { resolvedTheme } = useTheme();
   const [mounted, setMounted] = useState(false);
   useEffect(() => setMounted(true), []);
   const theme = mounted ? resolvedTheme : undefined;

   useEffect(() => {
      if (!category) return;

      if (theme === 'dark') {
         setBgColor(category.bg_dark);
         setTextColor(category.text_dark);
      } else {
         setBgColor(category.bg_light);
         setTextColor(category.text_light);
      }
   }, [theme, category]);

   function handleClick() {
      if (isLink) {
         const query = new URLSearchParams({
            lang: category.code === 'en' ? 'en' : 'sr',
            category: category.category.toLowerCase(),
         });
         router.push(`/archive?${query}`);
      } else {
         if (currentTag === category.category) {
            const param = new URLSearchParams(params);
            param.delete('category');
            router.push(`?${param.toString()}`, {
               scroll: false,
            });
         } else {
            handler('category', category.category.toLowerCase());
         }
      }
   }

   return (
      <span
         className={`border px-3.5 md:px-4 pl-4 py-1.5 pb-[0.3rem] lg:pb-[0.4rem] md:pb-1.5! xs:pb-[0.55rem] md:py-[0.45rem] rounded-full font-semibold lg:font-bold text-[1.415rem] 2xl:text-[1.3rem] lg:text-[1.2rem] md:text-[1.6rem] text-primary-400 cursor-pointer transition-200 select-none bg-white dark:bg-primary-300/20 xs:dark:bg-primary-300/15 ${
            currentTag !== category.category && currentTag
               ? `bg-white! text-primary-400! dark:text-primary-500/70! border-primary-200/70! xs:dark:border-primary-300/5! dark:bg-primary-300/20! xs:dark:bg-primary-300/15!`
               : ''
         } ${customStyles} ${isLink ? 'hover:bg-[color-mix(in_srgb,var(--cat-bg)_50%,transparent)]! dark:hover:bg-(--cat-bg)! dark:hover:opacity-85' : ''}`}
         style={{
            '--cat-bg': bgColor,
            backgroundColor: 'var(--cat-bg)',
            color: `${textColor}`,
            borderColor: `color-mix(in srgb, currentColor ${theme === 'dark' ? '0' : '15'}%, transparent)`,
         }}
         onClick={handleClick}
      >
         {category.category}
      </span>
   );
}

export default Category;
