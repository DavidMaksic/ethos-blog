'use client';

import { useTranslations, useLocale } from 'next-intl';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';

import DeleteAccountModal from '../modal/delete-account-modal';
import AuthButton from '@/src/ui/buttons/auth-button';
import Modal from '@/src/ui/modal/modal';

function DeleteAccountButton({ email, isOAuth }) {
   const t = useTranslations('Auth');
   const locale = useLocale();
   const [isModalOpen, setIsModalOpen] = useState(false);

   const handleSubmit = (e) => {
      e.preventDefault();
      setIsModalOpen(true);
   };

   return (
      <>
         <form
            onSubmit={handleSubmit}
            className="grid grid-cols-[1fr_auto] gap-10 md:gap-8"
         >
            <span className="text-2xl xs:text-[1.6rem] text-red-800/60 dark:text-red-100/70">
               {t('delete-account-description')}
            </span>

            <AuthButton
               loading={false}
               label={t('delete')}
               loadingLabel={t('deleting')}
               style={`-mt-3 md:-mt-0 px-10 md:px-8 3xs:px-6 md:self-center from-red-400/60! dark:from-red-400/50! to-red-400/70! dark:to-red-400/40! shadow-delete-btn! dark:shadow-none! hover:shadow-none! hover:border-red-400/60! dark:hover:border-red-300/80! hover:from-transparent! hover:to-transparent! ${locale === 'en' ? 'pt-1.5! pb-1! md:pt-2! md:pb-1.5!' : 'pt-2! pb-1.5! md:pt-2.5! md:pb-2!'}`}
               font="group-hover:text-red-500/70 dark:group-hover:text-red-300/80 md:text-[2rem]! 3xs:text-3xl!"
            />
         </form>

         <AnimatePresence>
            {isModalOpen && (
               <Modal closeModal={() => setIsModalOpen(false)}>
                  <DeleteAccountModal
                     email={email}
                     onClose={() => setIsModalOpen(false)}
                     isOAuth={isOAuth}
                  />
               </Modal>
            )}
         </AnimatePresence>
      </>
   );
}

export default DeleteAccountButton;
