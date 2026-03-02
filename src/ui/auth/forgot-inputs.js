'use client';

import { useLocale, useTranslations } from 'next-intl';
import { forgotPasswordSchema } from '@/src/lib/schemas';
import { authClient } from '@/src/lib/auth-client';
import { useState } from 'react';
import { motion } from 'motion/react';

import AuthButton from '@/src/ui/buttons/auth-button';
import FormField from '@/src/ui/form-field';
import toast from 'react-hot-toast';

function ForgotInputs({ onBack }) {
   const t = useTranslations('Auth');
   const locale = useLocale();

   const [loading, setLoading] = useState(false);
   const [sent, setSent] = useState(false);
   const [errors, setErrors] = useState({});

   const clearError = (field) =>
      setErrors((prev) => ({ ...prev, [field]: undefined }));

   const handleSubmit = async (e) => {
      e.preventDefault();

      const email = new FormData(e.target).get('email');

      const schema = forgotPasswordSchema(t);
      const parsed = schema.safeParse({ email });

      if (!parsed.success) {
         const fieldErrors = {};
         for (const issue of parsed.error.issues) {
            const field = issue.path[0];
            if (!fieldErrors[field]) fieldErrors[field] = issue.message;
         }
         setErrors(fieldErrors);
         setSent(false);
         return;
      }

      setErrors({});
      setLoading(true);

      const { error } = await authClient.requestPasswordReset({
         email: parsed.data.email,
         redirectTo: `${window.location.origin}/${locale}/reset-password`,
      });

      if (error) {
         toast.error(error.message);
         setLoading(false);
      } else {
         setSent(true);
         setLoading(false);
      }
   };

   return (
      <form
         className="w-full space-y-5 sm:space-y-6"
         onSubmit={handleSubmit}
         noValidate
      >
         <FormField
            id="email"
            label={t('email')}
            type="email"
            error={errors.email}
            onChange={() => clearError('email')}
         />

         <AuthButton
            loading={loading}
            label={t('send')}
            loadingLabel={t('sending')}
            style="mt-3"
         />

         <div>
            <motion.div
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: sent ? 'auto' : 0 }}
               transition={{ duration: 0.3 }}
               className="w-full overflow-hidden"
            >
               <div className="text-center md:text-2xl pb-3 px-8 xs:px-9">
                  {t('reset-email-sent')}
                  <span className="text-accent font-medium">
                     {t('reset-email-sent-link')}
                  </span>
                  .
               </div>
            </motion.div>

            <span
               onClick={onBack}
               className="block text-center mt-2 md:text-2xl underline underline-offset-2 sm:decoration-primary-600/60 cursor-pointer hover:opacity-75 transition-opacity"
            >
               {t('back-to-sign-in')}
            </span>
         </div>
      </form>
   );
}

export default ForgotInputs;
