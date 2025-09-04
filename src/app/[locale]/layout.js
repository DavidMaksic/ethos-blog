import '@/src/app/[locale]/index.css';

import {
   Cormorant_Garamond,
   Gentium_Book_Plus,
   Cormorant_SC,
   Crimson_Text,
   EB_Garamond,
   Great_Vibes,
   Parisienne,
} from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { LanguageProvider } from '@/src/context/language-context';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from 'next-themes';
import { LikeProvider } from '@/src/context/like-context';
import { getMessages } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/next';
import { notFound } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { routing } from '@/src/i18n/routing';

import PageAnimation from '@/src/ui/page-animation';
import Header from '@/src/ui/header/header';
import Footer from '@/src/ui/footer';
import Script from 'next/script';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';

/* Logo font (en) */
const parisienne = Parisienne({
   subsets: ['latin'],
   weight: ['400'],
   variable: '--font-parisienne',
});

/* Logo font (srb) */
const greatVibes = Great_Vibes({
   subsets: ['cyrillic'],
   display: 'swap',
   weight: ['400'],
   variable: '--font-greatVibes',
});

/* English font */
const crimsonText = Crimson_Text({
   subsets: ['latin'],
   style: ['normal', 'italic'],
   weight: ['400', '600', '700'],
   variable: '--font-crimsonText',
});

/* Serbian font */
const gentium = Gentium_Book_Plus({
   subsets: ['cyrillic'],
   style: ['normal', 'italic'],
   weight: ['400', '700'],
   variable: '--font-gentium',
});

/* Main font */
const cormorantGaramond = Cormorant_Garamond({
   subsets: ['latin'],
   style: ['normal', 'italic'],
   weight: ['300', '400', '500', '600', '700'],
   variable: '--font-cormorantGaramond',
});

/* Secondary font */
const ebGaramond = EB_Garamond({
   subsets: ['latin'],
   style: ['normal', 'italic'],
   weight: ['400', '500', '600', '700', '800'],
   variable: '--font-ebGaramond',
});

/* Tertiary font */
const cormorantSC = Cormorant_SC({
   subsets: ['latin'],
   weight: ['300', '400', '500', '600', '700'],
   variable: '--font-cormorantSC',
});

export async function generateMetadata({ params }) {
   const { locale } = await params;
   const isEnglish = locale === 'en';

   return {
      title: {
         template: `%s • ${isEnglish ? 'Ethos' : 'Етос'}`,
         default: isEnglish ? 'Ethos' : 'Етос',
      },
      description: isEnglish
         ? 'Ethos blog features many authors from across the world, who write with great interest on various topics connected to the concept of ethos - culture, customs, values, ethics...'
         : 'За Eтос блог пишу аутори из целог света, са великим занимањем за разне теме које су повезане са идејом етоса - културом, обичајима, вредностима, етиком...',
      metadataBase: new URL('https://ethos-blog.vercel.app'),
      openGraph: {
         title: isEnglish ? 'Ethos' : 'Етос',
         description: isEnglish
            ? 'Ethos blog features many authors from across the world, who write with great interest on various topics connected to the concept of ethos - culture, customs, values, ethics...'
            : 'За Eтос блог пишу аутори из целог света, са великим занимањем за разне теме које су повезане са идејом етоса - културом, обичајима, вредностима, етиком...',
         url: `https://ethos-blog.vercel.app/${locale}`,
         siteName: isEnglish ? 'Ethos' : 'Етос',
         locale: isEnglish ? 'en' : 'sr',
         type: 'website',
         images: [
            {
               url: 'https://qjbihfajkucvfxqkvtxk.supabase.co/storage/v1/object/public/misc/ethos-banner-2.png',
               width: 136,
               height: 136,
               alt: isEnglish ? 'Ethos Blog' : 'Етос блог',
            },
         ],
      },
      twitter: {
         card: 'summary',
         title: isEnglish ? 'Ethos' : 'Етос',
         description: isEnglish
            ? 'Ethos blog features many authors from across the world, who write with great interest on various topics connected to the concept of ethos - culture, customs, values, ethics...'
            : 'За Eтос блог пишу аутори из целог света, са великим занимањем за разне теме које су повезане са идејом етоса - културом, обичајима, вредностима, етиком...',
         images: [
            'https://qjbihfajkucvfxqkvtxk.supabase.co/storage/v1/object/public/misc/ethos-banner-2.png',
         ],
      },
   };
}

export function generateStaticParams() {
   return routing.locales.map((locale) => ({ locale }));
}

// TODO: Implement:
// TODO: Improve SEO
// TODO: 'Edit' option to comments
// TODO: Social media auth
// TODO: Notifications

export default async function RootLayout({ children, params }) {
   const { locale } = await params;

   if (!hasLocale(routing.locales, locale)) {
      notFound();
   }

   const messages = await getMessages({ locale });

   return (
      <html lang={locale} suppressHydrationWarning>
         <head>
            <Script
               src="https://cloud.umami.is/script.js"
               data-website-id="d90edcea-5d99-4e40-93f9-48e026866d66"
               strategy="lazyOnload"
            />
         </head>

         <body
            className={`min-h-screen flex flex-col text-xl 2xl:px-60 xl:px-26 inter-padding font-main text-text selection:bg-accent-400/90 dark:selection:bg-accent-200/50 selection:text-white caret-primary-400 antialiased bg-primary dark:bg-primary transition-200 background-gradient ${cormorantGaramond.variable} ${gentium.variable} ${ebGaramond.variable} ${crimsonText.variable} ${parisienne.variable} ${greatVibes.variable} ${cormorantSC.variable}`}
         >
            <NextIntlClientProvider locale={locale} messages={messages}>
               <LanguageProvider>
                  <LikeProvider>
                     <ThemeProvider
                        attribute="data-theme"
                        defaultTheme="system"
                        enableSystem
                     >
                        <Header />

                        <PageAnimation>
                           {children}
                           <SpeedInsights />
                           <Analytics />
                        </PageAnimation>

                        <Footer />

                        <Toaster
                           position="top-center"
                           gutter={12}
                           containerStyle={{ margin: '-4px' }}
                           toastOptions={{
                              success: {
                                 duration: 4000,
                              },
                              error: {
                                 duration: 6000,
                              },
                              style: {
                                 fontSize: '20px',
                                 maxWidth: '500px',
                                 color: 'var(--color-primary-500)',
                                 backgroundColor: 'var(--color-toast)',
                                 backdropFilter: 'blur(80px)',
                                 borderRadius: '14px',
                                 boxShadow: 'var(--shadow-toast-btn)',
                                 padding: '10px 20px',
                              },
                              iconTheme: {
                                 primary: 'var(--color-accent-400)',
                              },
                           }}
                        />
                     </ThemeProvider>
                  </LikeProvider>
               </LanguageProvider>
            </NextIntlClientProvider>
         </body>
      </html>
   );
}
