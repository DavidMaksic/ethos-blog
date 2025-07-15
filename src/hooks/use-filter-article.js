import { useEffect, useState } from 'react';
import { useLanguage } from '@/src/context/language-context';

function useFilterArticle(array) {
   const [filteredArray, setFilteredArray] = useState();
   const { language } = useLanguage();

   const cyrillicPattern = /^\p{Script=Cyrillic}+$/u;

   useEffect(() => {
      const filterItems = array.filter((item) => {
         if (language.language === 'Српски') {
            return cyrillicPattern.test(item.language);
         } else {
            return !cyrillicPattern.test(item.language);
         }
      });

      setFilteredArray(filterItems);
   }, [language]); // eslint-disable-line

   return { filteredArray };
}

export default useFilterArticle;
