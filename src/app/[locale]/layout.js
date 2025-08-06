import '@/src/app/[locale]/index.css';

import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { Cormorant_Garamond } from 'next/font/google';
import { LanguageProvider } from '@/src/context/language-context';
import { setRequestLocale } from 'next-intl/server';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from 'next-themes';
import { LikeProvider } from '@/src/context/like-context';
import { Analytics } from '@vercel/analytics/next';
import { notFound } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { routing } from '@/src/i18n/routing';

import Header from '@/src/ui/header/header';
import Footer from '@/src/ui/footer';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';

const cormorantGaramond = Cormorant_Garamond({
   subsets: ['latin'],
   display: 'swap',
   weight: ['300', '400', '500', '600', '700'],
});

export async function generateMetadata({ params }) {
   const { locale } = await params;

   return {
      title: {
         template: `%s • ${locale === 'en' ? 'Ethos' : 'Етос'}`,
         default: locale === 'en' ? 'Ethos' : 'Етос',
      },
      description:
         locale === 'en'
            ? 'Ethos blog features many authors from across the world, who write with great interest on various topics connected to the concept of ethos - culture, customs, values, ethics, etc.'
            : 'За Eтос блог пишу аутори из целог света, са великим занимањем за разне теме које су повезане са идејом етоса - културом, обичајима, вредностима, етиком, итд.',
   };
}

export function generateStaticParams() {
   return routing.locales.map((locale) => ({ locale }));
}

// TODO: Fix xl and 2xl breakpoints

// TODO: Implement:
// TODO: Dates for comments like '2 days ago'
// TODO: 'Author' flag to author's comments
// TODO: 'Edit' option to comments
// TODO: 'Most popular' sorting tag
// TODO: Social media auth
// TODO: Date intl
// TODO: Email notification
// TODO: Notifications

export default async function RootLayout({ children, params }) {
   const { locale } = await params;

   if (!hasLocale(routing.locales, locale)) {
      notFound();
   }

   setRequestLocale(locale);

   return (
      <html lang={locale} suppressHydrationWarning>
         <head>
            <script
               defer
               src="https://cloud.umami.is/script.js"
               data-website-id="d90edcea-5d99-4e40-93f9-48e026866d66"
            ></script>
         </head>

         <body
            className={`min-h-screen flex flex-col text-xl xl:px-60 inter-padding text-text selection:bg-accent-500/50 dark:selection:bg-accent-200/50 selection:text-white caret-primary-400 antialiased bg-primary dark:bg-primary transition-200 background-gradient ${cormorantGaramond.className}`}
         >
            <NextIntlClientProvider>
               <LanguageProvider>
                  <LikeProvider>
                     <ThemeProvider
                        attribute="data-theme"
                        defaultTheme="system"
                        enableSystem
                     >
                        <Header />
                        <main className="py-12 xl:pt-4 md:pt-5 w-7xl xl:w-full mx-auto">
                           {children}
                           <SpeedInsights />
                           <Analytics />
                        </main>
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
