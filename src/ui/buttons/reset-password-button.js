'use client';

import { useTranslations, useLocale } from 'next-intl';
import { authClient } from '@/src/lib/auth-client';
import { useState } from 'react';

import AuthButton from '@/src/ui/buttons/auth-button';
import toast from 'react-hot-toast';

function ResetPasswordButton({ email }) {
   const t = useTranslations('Auth');
   const locale = useLocale();
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      const { error } = await authClient.requestPasswordReset({
         email,
         redirectTo: `${window.location.origin}/${locale}/reset-password`,
      });

      if (error) {
         toast.error(error.message);
      } else {
         toast.success(t('reset-email-sent-short'));
      }

      setLoading(false);
   };

   return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
         <span className="text-2xl xs:text-[1.7rem]">
            {t('password-reset-description')}
         </span>

         <AuthButton
            loading={loading}
            label={t('send')}
            loadingLabel={t('sending')}
            style="mt-2"
         />
      </form>
   );
}

export default ResetPasswordButton;
