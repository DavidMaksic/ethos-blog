import { getLocale, getTranslations } from 'next-intl/server';
import SignInButton from '@/src/ui/buttons/signin-button';
import LoginImage from '@/src/ui/image/login-image';

export async function generateMetadata({ params }) {
   const { locale } = await params;
   return { title: locale === 'en' ? 'Sign in' : 'Пријави се' };
}

export default async function Page() {
   const [locale, t] = await Promise.all([getLocale(), getTranslations()]);

   return (
      <>
         <LoginImage />

         <section className="flex justify-center items-center min-h-screen">
            <div
               className={`flex flex-col justify-center items-center gap-10 ${
                  locale === 'sr' && 'sm:w-[80vw]'
               }`}
            >
               <p className="text-4xl text-center text-white drop-shadow-lg [text-shadow:0px_0px_30px_rgba(0,0,0,1)]">
                  {t('Auth.join')}
                  <span
                     className={`px-2.5 text-accent ${
                        locale === 'en' && 'font-logo'
                     } ${locale === 'sr' && 'font-logo-sr'}`}
                  >
                     {t('Logo')}
                  </span>
                  {t.rich('Auth.sign-in-label', {
                     em: (chunks) => <em>{chunks}</em>,
                  })}
               </p>

               <div className="flex flex-col gap-10 size-fit px-24 lg:px-10 pt-12 pb-14 items-center bg-white/20 dark:bg-neutral-600/50 backdrop-blur-lg dark:backdrop-blur-md border border-quaternary/15 dark:border-neutral-500/20 rounded-3xl transition-bg_border shadow-2xl text-primary/80 dark:text-primary-600/60">
                  <h2 className="text-3xl font-semibold">
                     {t('Auth.sign-in')}
                  </h2>

                  <SignInButton />
               </div>
            </div>
         </section>
      </>
   );
}
