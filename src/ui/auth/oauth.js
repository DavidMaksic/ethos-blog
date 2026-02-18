import { useLocale, useTranslations } from 'use-intl';
import { authClient } from '@/src/lib/auth-client';
import Image from 'next/image';

function OAuth({ mode, onToggleMode }) {
   const t = useTranslations('Auth');
   const locale = useLocale();

   async function login(provider) {
      const { redirect, url } = await authClient.signIn.social({
         provider,
         callbackURL: `/${locale}/user/home`,
      });

      if (redirect && url) {
         window.location.href = url;
      }
   }

   return (
      <>
         <div className="flex items-center w-full gap-3 select-none">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-primary-600/20 dark:via-primary-600/15 to-primary-600/25 dark:to-primary-600/35" />
            <span className="text-xl md:text-2xl text-current/90 -translate-y-[2px]">
               {t('oauth-label')}
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-primary-600/20 dark:via-primary-600/15 to-primary-600/25 dark:to-primary-600/35" />
         </div>

         <div className="grid grid-cols-2 w-full gap-3">
            <button
               className="flex items-center gap-3 w-full justify-center text-xl md:text-2xl bg-white/40 md:bg-primary-300/40 dark:bg-primary-300/30 md:dark:bg-primary-300/30 hover:bg-white/55 dark:hover:bg-primary-300/20 border border-primary-400/10 dark:border-primary-300/15 py-3 sm:py-2.5 font-medium rounded-xl cursor-pointer transition-bg_border"
               onClick={() => login('google')}
            >
               <div className="relative size-5 md:size-5.5 opacity-90">
                  <Image
                     src="https://authjs.dev/img/providers/google.svg"
                     alt="Google logo"
                     unoptimized
                     priority
                     fill
                  />
               </div>

               <span className="font-semibold">Google</span>
            </button>

            <button
               className="flex items-center gap-3 w-full justify-center text-xl md:text-2xl bg-white/40 md:bg-primary-300/40 dark:bg-primary-300/30 md:dark:bg-primary-300/30 hover:bg-white/55 dark:hover:bg-primary-300/20 border border-primary-400/10 dark:border-primary-300/15 py-3 sm:py-2.5 font-medium rounded-xl cursor-pointer transition-bg_border"
               onClick={() => login('github')}
            >
               <div className="relative size-6 opacity-50">
                  <Image
                     src="https://authjs.dev/img/providers/github.svg"
                     alt="Github logo"
                     unoptimized
                     priority
                     fill
                     className="dark:invert"
                  />
               </div>

               <span className="font-semibold">Github</span>
            </button>
         </div>

         <p className="text-center md:text-2xl">
            {mode === 'signin' ? (
               <>
                  {t('new-profile-label')}{' '}
                  <span
                     className="underline underline-offset-2 cursor-pointer hover:opacity-75 transition-opacity"
                     onClick={onToggleMode}
                  >
                     {t('create-account')}
                  </span>
               </>
            ) : (
               <>
                  {t('old-profile-label')}{' '}
                  <span
                     className="underline underline-offset-2 cursor-pointer hover:opacity-80 transition-opacity"
                     onClick={onToggleMode}
                  >
                     {t('generic-sign-in')}
                  </span>
               </>
            )}
         </p>
      </>
   );
}

export default OAuth;
