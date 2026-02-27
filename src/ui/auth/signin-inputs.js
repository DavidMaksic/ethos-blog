'use client';

import { useTranslations } from 'next-intl';
import { signInSchema } from '@/src/lib/schemas';
import { authClient } from '@/src/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import AuthButton from '@/src/ui/buttons/auth-button';
import FormField from '@/src/ui/form-field';
import Checkbox from '@/src/ui/checkbox';
import toast from 'react-hot-toast';

function SignInInputs({ onForgot }) {
   const t = useTranslations('Auth');
   const router = useRouter();

   const [loading, setLoading] = useState(false);
   const [errors, setErrors] = useState({});
   const [rememberMe, setRememberMe] = useState(true);

   const clearError = (field) =>
      setErrors((prev) => ({ ...prev, [field]: undefined }));

   const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const email = formData.get('email');
      const password = formData.get('password');

      // Zod validation
      const schema = signInSchema(t);
      const parsed = schema.safeParse({ email, password });

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

      await authClient.signIn.email(
         {
            email: parsed.data.email,
            password: parsed.data.password,
            rememberMe,
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
         className="w-full space-y-5 sm:space-y-6"
         onSubmit={handleSubmit}
         noValidate
      >
         <div className="flex flex-col gap-3">
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

         <div className="flex items-center justify-between">
            <Checkbox
               checked={rememberMe}
               onChange={(e) => setRememberMe(e.target.checked)}
               label={t('remember-me')}
            />

            <span
               className="text-center text-lg md:text-xl cursor-pointer hover:opacity-75 transition-opacity"
               onClick={onForgot}
            >
               {t('forgot-password')}
            </span>
         </div>

         <AuthButton
            loading={loading}
            label={t('generic-sign-in')}
            loadingLabel={t('signing-in')}
         />
      </form>
   );
}

export default SignInInputs;
