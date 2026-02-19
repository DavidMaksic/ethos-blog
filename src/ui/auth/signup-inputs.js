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
         confirmPassword: formData.get('confirm-password'),
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
            <FormField
               id="confirm-password"
               label={t('confirm-password')}
               type="password"
               error={errors.confirmPassword}
               onChange={() => clearError('confirmPassword')}
            />
         </div>

         <button
            type="submit"
            disabled={loading}
            className={`bg-accent-500/80 dark:bg-accent/60 text-white dark:text-accent-100 text-3xl md:text-4xl rounded-2xl py-2.5 w-full hover:bg-accent-500/65 dark:hover:bg-accent/50 transition cursor-pointer mt-4 mb-2 disabled:opacity-65 disabled:hover:bg-accent-500/80 disabled:dark:hover:bg-accent/60 disabled:cursor-auto ${
               locale === 'sr' ? 'font-logo-sr' : 'font-logo'
            }`}
         >
            {loading ? (
               <div className="flex items-center gap-4 justify-center">
                  <ImSpinner2 className="size-6 text-inherit animate-spin" />
                  <span>{t('signing-in')}</span>
               </div>
            ) : (
               <span>{t('generic-sign-up')}</span>
            )}
         </button>
      </form>
   );
}

export default SignUpInputs;
