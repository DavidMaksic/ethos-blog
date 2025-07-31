'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

import srbFlag from '@/assets/srb-flag.png';
import enFlag from '@/assets/en-flag.png';

const LanguageContext = createContext();

function LanguageProvider({ children }) {
   const locale = useLocale();
   const [language, setLanguage] = useState({
      language: 'English',
      flag: enFlag,
   });

   useEffect(() => {
      if (!locale) return;
      if (locale === 'sr-cyrl') {
         setLanguage({ language: 'Српски', flag: srbFlag });
      } else {
         setLanguage({ language: 'English', flag: enFlag });
      }

      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
   }, [locale]);

   return (
      <LanguageContext.Provider value={{ language, setLanguage }}>
         {children}
      </LanguageContext.Provider>
   );
}

function useLanguage() {
   const context = useContext(LanguageContext);
   if (!context) throw new Error('useLanguage must be inside LanguageProvider');
   return context;
}

export { LanguageProvider, useLanguage };
