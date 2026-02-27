'use client';

import { useLocale, useTranslations } from 'use-intl';
import { signUpSchema } from '@/src/lib/schemas';
import { authClient } from '@/src/lib/auth-client';
import { ImSpinner2 } from 'react-icons/im';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import FormField from '@/src/ui/form-field';
import toast from 'react-hot-toast';
import AuthButton from '@/src/ui/buttons/auth-button';

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
         className="w-full space-y-5 sm:space-y-6"
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

         <AuthButton
            loading={loading}
            label={t('generic-sign-up')}
            loadingLabel={t('signing-up')}
            style="mt-4"
         />
      </form>
   );
}

export default SignUpInputs;
