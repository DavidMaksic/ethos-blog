'use client';

import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/use-local-storage';
import { useLocale } from 'next-intl';
import { routing } from '@/src/i18n/routing';

import srbFlag from '@/public/srb-flag.png';
import enFlag from '@/public/en-flag.png';

const LanguageContext = createContext();

function LanguageProvider({ children }) {
   const locale = useLocale();
   const currentLocale = locale === routing.defaultLocale;
   const defaultLang = currentLocale ? 'English' : 'Српски';
   const defaultCode = currentLocale ? 'en' : 'sr';
   const defaultFlag = currentLocale ? enFlag : srbFlag;

   const [language, setLanguage] = useLocalStorage(
      {
         lang: defaultLang,
         code: defaultCode,
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
