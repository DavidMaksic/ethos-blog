import '@/src/app/[locale]/index.css';

import {
   Cormorant_Garamond,
   Cormorant_SC,
   EB_Garamond,
   Great_Vibes,
   Parisienne,
} from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { LanguageProvider } from '@/src/context/language-context';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from 'next-themes';
import { LikeProvider } from '@/src/context/like-context';
import { WEBSITE_URL } from '@/src/utils/config';
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
   const [param, t] = await Promise.all([params, getTranslations()]);
   const { locale } = param;
   const path = locale === 'en' ? '' : `/${locale}`;

   const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: `${WEBSITE_URL}${path}`,
      name: t('Logo'),
      description: t('Page-descriptions.about'),
      inLanguage: locale,
      keywords: [
         'Ethos Blog',
         'History',
         'Theology',
         'Christian Philosophy',
         'Moral Ethics',
         'Culture',
      ],
   };

   return {
      title: {
         template: `%s • ${t('Logo')}`,
         default: t('Logo'),
      },
      description: t('Page-descriptions.about'),
      alternates: {
         canonical: `${WEBSITE_URL}${path}`,
         languages: {
            en: `${WEBSITE_URL}`,
            sr: `${WEBSITE_URL}/sr`,
         },
      },
      openGraph: {
         title: t('Logo'),
         description: t('Page-descriptions.about'),
         url: `${WEBSITE_URL}${path}`,
         siteName: t('Logo'),
         locale: locale,
         type: 'website',
         images: [
            {
               url: 'https://qjbihfajkucvfxqkvtxk.supabase.co/storage/v1/object/public/misc/ethos-banner-3.png',
               width: 1200,
               height: 630,
               alt: t('Logo'),
            },
         ],
      },
      twitter: {
         card: 'summary',
         title: t('Logo'),
         description: t('Page-descriptions.about'),
         images: [
            'https://qjbihfajkucvfxqkvtxk.supabase.co/storage/v1/object/public/misc/ethos-banner-3.png',
         ],
      },
      other: {
         'script:ld+json': JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      },
   };
}

export function generateStaticParams() {
   return routing.locales.map((locale) => ({ locale }));
}

// TODO: Implement:
// TODO: Italic font for greek on mobile doesn't work
// TODO: Remove H1 in blocknote editor
// TODO: Links on don't have styles
// TODO: Add manifest.json file for Portfolio app
// TODO: 'Edit' option to comments
// TODO: Social media auth
// TODO: Notifications

export default async function RootLayout({ children, params }) {
   const { locale } = await params;
   const messages = await getMessages({ locale });

   if (!hasLocale(routing.locales, locale)) {
      notFound();
   }

   return (
      <html lang={locale} suppressHydrationWarning>
         <head>
            <Script
               src="https://cloud.umami.is/script.js"
               data-website-id="d90edcea-5d99-4e40-93f9-48e026866d66"
               strategy="lazyOnload"
            />
            {/* Android PWA Support */}
            <meta name="theme-color" content="#27251F" />
            <meta name="navigationbar-color" content="#27251F" />

            {/* Apple PWA Support */}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta
               name="apple-mobile-web-app-status-bar-style"
               content="black-translucent"
            />
            <meta name="apple-mobile-web-app-title" content="Ethos Blog" />
         </head>

         <body
            className={`min-h-screen flex flex-col text-xl 2xl:px-60 xl:px-26 inter-padding font-main text-text selection:bg-accent-400/90 dark:selection:bg-accent-200/50 selection:text-white caret-primary-400 antialiased bg-primary transition-200 background-gradient ${cormorantGaramond.variable} ${ebGaramond.variable} ${parisienne.variable} ${greatVibes.variable} ${cormorantSC.variable}`}
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
