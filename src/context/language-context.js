'use client';

import { createContext, useContext, useEffect, useMemo } from 'react';
import { useLocalStorage } from '../hooks/use-local-storage';
import { useLocale } from 'next-intl';
import { routing } from '@/src/i18n/routing';

import srbFlag from '@/public/srb-flag.png';
import enFlag from '@/public/en-flag.png';

const LanguageContext = createContext();

function LanguageProvider({ children }) {
   const locale = useLocale();
   const defaultLang = locale === routing.defaultLocale ? 'en' : 'sr';
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
         setLanguage({ lang: 'English', code: 'en', flag: enFlag });
      } else {
         setLanguage({ lang: 'Српски', code: 'sr', flag: srbFlag });
      }
   }, [locale, setLanguage]);

   const value = useMemo(
      () => ({ language, setLanguage }),
      [language, setLanguage]
   );

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
