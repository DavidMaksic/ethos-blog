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
         <section className="flex justify-center self-center -translate-y-10">
            <div
               className={`flex flex-col justify-center items-center gap-10 ${
                  locale === 'sr' && 'sm:w-[80vw]'
               }`}
            >
               <p className="text-4xl text-center">
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

               <div className="flex flex-col gap-10 size-fit px-24 lg:px-10 pt-12 pb-14 items-center bg-white dark:bg-primary-300/10 border border-quaternary dark:border-primary-300/15 rounded-2xl transition-bg_border shadow-article dark:shadow-none">
                  <h2 className="text-3xl font-semibold">
                     {t('Auth.sign-in')}
                  </h2>
                  <SignInButton />
               </div>
            </div>
         </section>

         <LoginImage />
      </>
   );
}
