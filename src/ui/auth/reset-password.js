'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { resetPasswordSchema } from '@/src/lib/schemas';
import { authClient } from '@/src/lib/auth-client';
import { useState } from 'react';

import AuthButton from '@/src/ui/buttons/auth-button';
import FormField from '@/src/ui/form-field';
import toast from 'react-hot-toast';

function ResetPassword() {
   const t = useTranslations('Auth');
   const router = useRouter();
   const locale = useLocale();
   const searchParams = useSearchParams();

   const [loading, setLoading] = useState(false);
   const [errors, setErrors] = useState({});

   const token = searchParams.get('token');

   const clearError = (field) =>
      setErrors((prev) => ({ ...prev, [field]: undefined }));

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!token) return toast.error(t('reset-invalid-token'));

      const formData = new FormData(e.target);
      const password = formData.get('password');
      const confirmPassword = formData.get('confirmPassword');

      const schema = resetPasswordSchema(t);
      const parsed = schema.safeParse({ password, confirmPassword });

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

      const { error } = await authClient.resetPassword({
         newPassword: parsed.data.password,
         token,
      });

      if (error) {
         toast.error(error.message);
         setLoading(false);
      } else {
         toast.success(t('reset-success'));
         router.push(`/${locale}/login`);
      }
   };

   return (
      <form
         className="w-full space-y-5 sm:space-y-6"
         onSubmit={handleSubmit}
         noValidate
      >
         <div className="flex flex-col gap-3">
            <FormField
               id="password"
               label={t('new-password')}
               type="password"
               error={errors.password}
               onChange={() => clearError('password')}
            />
            <FormField
               id="confirmPassword"
               label={t('confirm-password')}
               type="password"
               error={errors.confirmPassword}
               onChange={() => clearError('confirmPassword')}
            />
         </div>

         <AuthButton
            loading={loading}
            label={t('reset')}
            loadingLabel={t('resetting')}
            style="mt-3"
         />
      </form>
   );
}

export default ResetPassword;
