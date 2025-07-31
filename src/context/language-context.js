'use client';

import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/use-local-storage';
import { useLocale } from 'next-intl';
import { routing } from '@/src/i18n/routing';

import srbFlag from '@/assets/srb-flag.png';
import enFlag from '@/assets/en-flag.png';

const LanguageContext = createContext();

function LanguageProvider({ children }) {
   const locale = useLocale();
   const defaultLang = locale === routing.defaultLocale ? 'English' : 'Српски';
   const defaultFlag = locale === routing.defaultLocale ? enFlag : srbFlag;

   const [language, setLanguage] = useLocalStorage(
      {
         language: defaultLang,
         flag: defaultFlag,
      },
      'localLang'
   );

   useEffect(() => {
      if (locale === 'en') {
         setLanguage({ language: 'English', flag: enFlag });
      } else {
         setLanguage({ language: 'Српски', flag: srbFlag });
      }
   }, [locale, setLanguage]);

   return (
      <LanguageContext.Provider value={{ language, setLanguage }}>
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
