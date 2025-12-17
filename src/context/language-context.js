'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocale } from 'next-intl';

import srbFlag from '@/public/srb-flag.png';
import enFlag from '@/public/en-flag.png';

const LanguageContext = createContext();

function LanguageProvider({ children }) {
   const locale = useLocale();
   const [language, setLanguage] = useState({});

   useEffect(() => {
      if (locale === 'en') {
         setLanguage({ lang: 'English', code: 'en', flag: enFlag });
      } else {
         setLanguage({ lang: 'Српски', code: 'sr', flag: srbFlag });
      }
   }, [locale, setLanguage]);

   const value = useMemo(() => ({ language, setLanguage }), [language]);

   return (
      <LanguageContext.Provider value={value}>
         {children}
      </LanguageContext.Provider>
   );
}

function useLanguage() {
   const context = useContext(LanguageContext);

   if (context === undefined)
      throw new Error('LanguageContext was used outside of LanguageProvider');

   return context;
}

export { LanguageProvider, useLanguage };
