import { useEffect, useState } from 'react';
import { useLanguage } from '@/src/context/language-context';

function useFilterCategory(array, param) {
   const [filteredArray, setFilteredArray] = useState();
   const { language } = useLanguage();

   const cyrillicPattern = /^\p{Script=Cyrillic}+$/u;

   useEffect(() => {
      const filterItems = array.filter((item) => {
         if (param?.lang) {
            if (param.lang === 'српски') {
               return cyrillicPattern.test(item.category);
            } else {
               return !cyrillicPattern.test(item.category);
            }
         }

         if (language.language === 'Српски') {
            return cyrillicPattern.test(item.category);
         } else {
            return !cyrillicPattern.test(item.category);
         }
      });

      setFilteredArray(filterItems);
   }, [language, param]); // eslint-disable-line

   return { filteredArray };
}

export default useFilterCategory;
