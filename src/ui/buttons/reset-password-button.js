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
      <form
         onSubmit={handleSubmit}
         className="grid grid-cols-[1fr_auto] gap-10 md:gap-8"
      >
         <span className="text-2xl xs:text-[1.6rem]">
            {t('password-reset-description')}
         </span>

         <AuthButton
            loading={loading}
            label={t('send')}
            loadingLabel={t('sending')}
            style={`-mt-3 md:-mt-0 px-10 md:px-8 3xs:px-6 md:self-center shadow-link-btn! dark:shadow-none! hover:shadow-none! ${locale === 'en' ? 'pt-1.5! pb-1! md:pt-2! md:pb-1.5!' : 'pt-2! pb-1.5! md:pt-2.5! md:pb-2!'}`}
            font="md:text-[2rem]! 3xs:text-3xl!"
         />
      </form>
   );
}

export default ResetPasswordButton;
