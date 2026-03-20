'use client';

import { useActionState, useEffect, useState } from 'react';
import { subscribeToNewsletter } from '@/src/lib/actions';
import { useTranslations } from 'next-intl';

import AuthButton from '../buttons/auth-button';
import toast from 'react-hot-toast';

function NewsletterForm({ locale }) {
   const t = useTranslations('Newsletter');

   const [email, setEmail] = useState('');
   const [state, action, isPending] = useActionState(subscribeToNewsletter, {
      success: false,
   });

   // Handle server-side errors
   useEffect(() => {
      if (state.error) {
         toast.error(state.error);
      }
   }, [state.error, state.id]);

   // Success handling
   useEffect(() => {
      if (state.success) {
         setEmail('');
         toast.success(t('success'));
         state.success = false;
      }
   }, [state, t]);

   function handleAction(formData) {
      formData.append('locale', locale);
      action(formData);
   }

   function handleChange(e) {
      setEmail(e.target.value);
   }

   return (
      <div className="mx-auto flex flex-col items-start lg:items-center gap-2 lg:gap-5 relative z-10 transition duration-75 lg:translate-y-3 md:translate-y-5">
         {/* Heading */}
         <h2 className="relative styled_text font-semibold text-4xl lg:text-[2.5rem] bg-gradient-to-r from-gray-600 to-gray-500/90 dark:from-slate-300/90 dark:to-slate-300/70 font-title leading-snug lg:leading-[1.1] lg:text-center">
            {t('heading')}
         </h2>

         {/* Body */}
         <p className="text-xl lg:text-2xl lg:w-1/2 md:w-full font-secondary text-primary-500/90 leading-relaxed lg:leading-9 pb-4 md:pb-0 lg:text-center">
            {t('body')}
         </p>

         {/* Form */}
         <form
            action={handleAction}
            className={`mt-2 ${isPending ? 'pointer-events-none' : ''}`}
         >
            <div className="relative flex items-center">
               <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={handleChange}
                  placeholder={t('placeholder')}
                  disabled={isPending}
                  className="pl-6 py-3.5 md:py-4 pr-42 md:pr-46 w-[28rem] md:w-full rounded-full text-xl lg:text-2xl
                bg-white/60 dark:bg-transparent backdrop-blur-xl
                  border border-primary-300 dark:border-primary-300/30
                text-primary-600 dark:text-primary-600/80
                placeholder:text-primary-400 focus:outline-none font-secondary
                  transition-shadow duration-200"
               />
               <div className="absolute right-0">
                  <AuthButton
                     loading={isPending}
                     label={t('button')}
                     loadingLabel={t('loading')}
                     style="py-[8px]! lg:py-3! md:py-3! xs:py-2.5! px-6! w-fit! rounded-full from-accent-300! to-accent-400/80! dark:from-accent/60! dark:to-accent-400/50! hover:from-transparent! hover:to-transparent! backdrop-blur-sm shadow-link-btn dark:shadow-none"
                  />
               </div>
            </div>
         </form>
      </div>
   );
}

export default NewsletterForm;
