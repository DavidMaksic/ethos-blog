import '@/src/app/[locale]/index.css';

import {
   Cormorant_Garamond,
   Cormorant_SC,
   EB_Garamond,
   Great_Vibes,
   Parisienne,
} from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { LanguageProvider } from '@/src/context/language-context';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SessionProvider } from 'next-auth/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/src/context/auth-context';
import { WEBSITE_URL } from '@/src/utils/config';
import { Analytics } from '@vercel/analytics/next';
import { notFound } from 'next/navigation';
import { routing } from '@/src/i18n/routing';
import { Toaster } from 'react-hot-toast';

import PageAnimation from '@/src/ui/page-animation';
import Header from '@/src/ui/header/header';
import Footer from '@/src/ui/footer';
import Script from 'next/script';

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
   const prefix = locale === 'en' ? '' : `/${locale}`;

   return {
      title: {
         template: `%s • ${t('Logo')}`,
         default: `${t('Logo')}${t('Page-descriptions.title')}`,
      },
      description: t('Page-descriptions.about'),
      alternates: {
         canonical: `${WEBSITE_URL}${prefix}`,
         languages: {
            en: `${WEBSITE_URL}`,
            sr: `${WEBSITE_URL}/sr`,
         },
      },
      openGraph: {
         title: t('Logo'),
         description: t('Page-descriptions.about'),
         url: `${WEBSITE_URL}${prefix}`,
         siteName: t('Logo'),
         locale: locale,
         type: 'website',
         images: [
            {
               url: 'https://qjbihfajkucvfxqkvtxk.supabase.co/storage/v1/object/public/misc/ethos-banner-main.webp',
               width: 1200,
               height: 630,
               alt: t('Logo'),
            },
         ],
      },
      twitter: {
         card: 'summary_large_image',
         title: t('Logo'),
         description: t('Page-descriptions.about'),
         images: [
            'https://qjbihfajkucvfxqkvtxk.supabase.co/storage/v1/object/public/misc/ethos-banner-main.webp',
         ],
      },
   };
}

export function generateStaticParams() {
   return routing.locales.map((locale) => ({ locale }));
}

// TODO: After using lang filter, and then changing lang of the site, active class for lang filter is gone (because of ?lang=en attribute)

export default async function RootLayout({ children, params }) {
   const { locale } = await params;
   setRequestLocale(locale);

   const t = await getTranslations();
   const prefix = locale === 'en' ? '' : `/${locale}`;

   const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: `${WEBSITE_URL}${prefix}`,
      name: t('Logo'),
      description: t('Page-descriptions.about'),
      inLanguage: locale,
      sameAs: [
         'https://www.instagram.com/ethos.blog/',
         'https://x.com/EthosBlogging',
      ],
      keywords: [
         'Ethos Blog',
         'History',
         'Theology',
         'Christian Philosophy',
         'Moral Ethics',
         'Culture',
      ],
   };

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

            <script
               type="application/ld+json"
               dangerouslySetInnerHTML={{
                  __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
               }}
            />
         </head>

         <body
            className={`min-h-screen flex flex-col text-xl 2xl:px-60 xl:px-26 inter-padding font-main text-text selection:bg-accent-400/90 dark:selection:bg-accent-200/50 selection:text-white caret-primary-400 antialiased bg-primary transition-200 background-gradient ${cormorantGaramond.variable} ${ebGaramond.variable} ${parisienne.variable} ${greatVibes.variable} ${cormorantSC.variable}`}
         >
            <SessionProvider>
               <AuthProvider>
                  <NextIntlClientProvider locale={locale}>
                     <LanguageProvider>
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
                     </LanguageProvider>
                  </NextIntlClientProvider>
               </AuthProvider>
            </SessionProvider>
         </body>
      </html>
   );
}
