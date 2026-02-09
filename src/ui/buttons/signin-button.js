'use client';

import { useLocale, useTranslations } from 'next-intl';
import { authClient } from '@/src/lib/auth-client';
import Image from 'next/image';

function SignInButton() {
   const t = useTranslations('Auth');
   const locale = useLocale();

   async function login() {
      const { redirect, url } = await authClient.signIn.social({
         provider: 'google',
         callbackURL: `/${locale}/user/home`,
      });

      if (redirect && url) {
         window.location.href = url;
      }
   }

   return (
      <button
         className="flex items-center gap-6 text-2xl md:text-2xl bg-primary/30 dark:bg-neutral-800/60 hover:bg-primary/40 dark:hover:bg-neutral-800/70 border border-primary-300/20 dark:border-neutral-500/20 px-14 xs:px-10 py-6 font-medium rounded-3xl cursor-pointer transition-bg_border"
         onClick={login}
      >
         <div className="relative size-7 md:size-8">
            <Image
               src="https://authjs.dev/img/providers/google.svg"
               alt="Google logo"
               unoptimized
               priority
               fill
            />
         </div>

         <span>{t('google')}</span>
      </button>
   );
}

export default SignInButton;
