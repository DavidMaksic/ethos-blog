import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/src/context/language-context';

function useFilterCategory(array) {
   const [filteredArray, setFilteredArray] = useState();
   const { language } = useLanguage();
   const searchParams = useSearchParams();
   const lang = searchParams.get('lang');

   const cyrillicPattern = /^\p{Script=Cyrillic}+$/u;

   useEffect(() => {
      const filterItems = array.filter((item) => {
         if (lang) {
            if (lang === 'sr') {
               return cyrillicPattern.test(item.category);
            } else {
               return !cyrillicPattern.test(item.category);
            }
         }

         if (language.code === 'sr') {
            return cyrillicPattern.test(item.category);
         } else {
            return !cyrillicPattern.test(item.category);
         }
      });

      setFilteredArray(filterItems);
   }, [language, lang]); // eslint-disable-line

   return { filteredArray };
}

export default useFilterCategory;
