import { getLocale, getTranslations } from 'next-intl/server';
import SignInButton from '@/src/ui/buttons/signin.button';
import loginImg from '@/public/login.jpg';
import Image from 'next/image';

export async function generateMetadata({ params }) {
   const { locale } = await params;
   return { title: locale === 'en' ? 'Sign in' : 'Пријави се' };
}

export default async function Page() {
   const t = await getTranslations();
   const locale = await getLocale();

   return (
      <div className="h-screen grid grid-cols-[1fr_1fr] text-xl 2xl:px-60 xl:px-26 inter-padding font-main text-text selection:bg-accent-400/90 dark:selection:bg-accent-200/50 selection:text-white caret-primary-400 antialiased bg-primary transition-200">
         <div className="flex justify-center self-center -translate-y-10">
            <div className="flex flex-col justify-center items-center gap-10">
               <p className="text-4xl">
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
               <div className="flex flex-col gap-10 size-fit px-24 pt-12 pb-14 items-center bg-white dark:bg-primary-300/10 border border-quaternary dark:border-primary-300/15 rounded-2xl transition-bg_border shadow-article dark:shadow-none">
                  <h2 className="text-3xl font-semibold">
                     {t('Auth.sign-in')}
                  </h2>
                  <SignInButton />
               </div>
            </div>
         </div>

         <div className="relative size-full overflow-hidden shadow-xl dark:shadow-menu-dark">
            <Image
               className="object-cover opacity-95 "
               fill
               src={loginImg}
               alt="Login image"
               priority={true}
               quality={60}
               sizes="100vw"
            />

            <span className="absolute right-4 bottom-4">
               {t('Auth.img-credit')}
            </span>
         </div>
      </div>
   );
}
