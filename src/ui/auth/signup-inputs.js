'use client';

import { useLocale, useTranslations } from 'use-intl';
import { signUpSchema } from '@/src/lib/schemas';
import { authClient } from '@/src/lib/auth-client';
import { ImSpinner2 } from 'react-icons/im';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import FormField from '@/src/ui/form-field';
import toast from 'react-hot-toast';

function SignUpInputs() {
   const t = useTranslations('Auth');
   const router = useRouter();
   const locale = useLocale();

   const [loading, setLoading] = useState(false);
   const [errors, setErrors] = useState({});

   const clearError = (field) =>
      setErrors((prev) => ({ ...prev, [field]: undefined }));

   const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const parsed = signUpSchema(t).safeParse({
         name: formData.get('name'),
         email: formData.get('email'),
         password: formData.get('password'),
      });

      if (!parsed.success) {
         const fieldErrors = {};
         for (const issue of parsed.error.issues) {
            const field = issue.path[0];
            if (!fieldErrors[field]) fieldErrors[field] = issue.message;
         }
         setErrors(fieldErrors);
         return;
      }

      setErrors({});
      setLoading(true);

      await authClient.signUp.email(
         {
            email: parsed.data.email,
            password: parsed.data.password,
            name: parsed.data.name,
            callbackURL: '/user/home',
         },
         {
            onSuccess: () => router.push('/user/home'),
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
         noValidate
      >
         <div className="flex flex-col gap-3">
            <FormField
               id="name"
               label={t('name')}
               type="text"
               error={errors.name}
               onChange={() => clearError('name')}
               autoComplete="one-time-code"
            />
            <FormField
               id="email"
               label={t('email')}
               type="email"
               error={errors.email}
               onChange={() => clearError('email')}
            />
            <FormField
               id="password"
               label={t('password')}
               type="password"
               error={errors.password}
               onChange={() => clearError('password')}
            />
         </div>

         <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl py-2 bg-gradient-to-r from-accent-400/80 dark:from-accent/60 to-accent-600/70 dark:to-accent-400/45 hover:from-transparent hover:to-transparent border-2 border-transparent hover:border-accent/80 shadow-link-btn hover:shadow-none dark:shadow-none transition-[box-shadow,border,--tw-gradient-from,--tw-gradient-to] duration-300 bg-origin-border group disabled:cursor-auto text-center mt-4"
         >
            <div
               className={`text-3xl md:text-4xl text-white dark:text-accent-100/90 group-hover:text-accent group-hover:drop-shadow-xs dark:group-hover:text-accent/90 transition-[color] duration-300 cursor-pointer ${
                  locale === 'en' ? 'font-logo' : 'font-logo-sr'
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
            </div>
         </button>
      </form>
   );
}

export default SignUpInputs;
