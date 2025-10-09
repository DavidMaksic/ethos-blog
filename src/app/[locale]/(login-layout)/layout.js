import '@/src/app/[locale]/index.css';

import { Cormorant_Garamond, Great_Vibes, Parisienne } from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { LanguageProvider } from '@/src/context/language-context';
import { ThemeProvider } from 'next-themes';
import { getMessages } from 'next-intl/server';
import { routing } from '@/src/i18n/routing';
import NotFound from '@/src/app/[locale]/not-found';

/* Main font */
const cormorantGaramond = Cormorant_Garamond({
   subsets: ['latin'],
   style: ['normal', 'italic'],
   weight: ['300', '400', '500', '600', '700'],
   variable: '--font-cormorantGaramond',
});

/* Logo font (en) */
const parisienne = Parisienne({
   subsets: ['latin'],
   weight: ['400'],
   variable: '--font-parisienne',
});

/* Logo font (srb) */
const greatVibes = Great_Vibes({
   subsets: ['cyrillic'],
   weight: ['400'],
   variable: '--font-greatVibes',
});

async function Layout({ children, params }) {
   const { locale } = await params;
   const messages = await getMessages({ locale });

   if (!hasLocale(routing.locales, locale)) {
      NotFound();
   }

   return (
      <html lang={locale} suppressHydrationWarning>
         <body
            className={`${cormorantGaramond.variable} ${parisienne.variable} ${greatVibes.variable}`}
         >
            <NextIntlClientProvider locale={locale} messages={messages}>
               <LanguageProvider>
                  <ThemeProvider
                     attribute="data-theme"
                     defaultTheme="system"
                     enableSystem
                  >
                     {children}
                  </ThemeProvider>{' '}
               </LanguageProvider>
            </NextIntlClientProvider>
         </body>
      </html>
   );
}

export default Layout;
