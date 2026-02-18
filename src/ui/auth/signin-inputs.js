'use client';

import { useLocale, useTranslations } from 'next-intl';
import { authClient } from '@/src/lib/auth-client';
import { ImSpinner2 } from 'react-icons/im';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

// TODO: Update validation
// TODO: Add password reset

function SignInInputs() {
   const t = useTranslations('Auth');
   const router = useRouter();
   const locale = useLocale();
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const email = formData.get('email');
      const password = formData.get('password');

      setLoading(true);

      await authClient.signIn.email(
         {
            email,
            password,
            callbackURL: '/user/home',
         },
         {
            onSuccess: () => {
               router.push('/user/home');
            },
            onError: (ctx) => {
               toast.error(ctx.error.message);
               setLoading(false);
            },
         },
      );
   };

   return (
      <form
         className="w-full space-y-5 lg:space-y-3 md:space-y-5"
         onSubmit={handleSubmit}
      >
         <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
               <label htmlFor="email" className="text-lg md:text-xl">
                  {t('email')}
               </label>
               <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="py-1 bg-transparent border-b border-primary-600/25 text-primary-700/90 dark:text-primary-600/80 focus:outline-none w-full text-[1.75rem]"
               />
            </div>

            <div className="flex flex-col gap-0.5">
               <label htmlFor="password" className="text-lg md:text-xl">
                  {t('password')}
               </label>
               <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="py-1 bg-transparent border-b border-primary-600/25 text-primary-700/90 dark:text-primary-600/80 focus:outline-none w-full text-[1.75rem]"
               />
            </div>
         </div>

         <button
            type="submit"
            disabled={loading}
            className={`bg-accent-500/80 dark:bg-accent/60 text-white dark:text-accent-100 text-3xl md:text-4xl rounded-2xl py-2.5 w-full hover:bg-accent-500/65 dark:hover:bg-accent/50 transition cursor-pointer mt-4 mb-2 disabled:opacity-65 disabled:hover:bg-accent-500/80 disabled:dark:hover:bg-accent/60 disabled:cursor-auto ${
               locale === 'sr' ? `font-logo-sr` : 'font-logo'
            }`}
         >
            {loading ? (
               <div className="flex items-center gap-4 justify-center">
                  <ImSpinner2 className="size-6 text-inherit animate-spin" />
                  <span>{t('signing-in')}</span>
               </div>
            ) : (
               <span>{t('generic-sign-in')}</span>
            )}
         </button>
      </form>
   );
}

export default SignInInputs;
