'use client';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'motion/react';
import { deleteUserAccount } from '@/src/lib/actions';
import { authClient } from '@/src/lib/auth-client';
import { ImSpinner2 } from 'react-icons/im';
import { useRouter } from '@/src/i18n/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

function DeleteAccountModal({ onClose, isOAuth }) {
   const t = useTranslations('Profile');
   const locale = useLocale();
   const router = useRouter();

   const [isPending, setIsPending] = useState(false);
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);

   async function handleDelete() {
      if (!isOAuth && !password) return;
      setIsPending(true);

      const formData = new FormData();
      formData.set('isOAuth', String(isOAuth));
      if (!isOAuth) formData.set('password', password);

      try {
         await deleteUserAccount(null, formData);
         router.push('/');
         toast.success(t('account-deleted'));
         await authClient.signOut();
      } catch (error) {
         setPassword('');
         toast.error(t('wrong-password'));
      }

      setIsPending(false);
   }

   return (
      <div className="flex flex-col items-center gap-9 px-8">
         <span
            className={`w-[34rem] sm:w-[28rem] xs:w-[22rem] 3xs:w-fit text-primary-600 dark:text-primary-500 md:px-12 xs:px-0 text-center text-[2.2rem] leading-11 ${isOAuth && 'border-b border-b-quaternary pb-10'}`}
         >
            {t('delete-account-label')}
         </span>

         <div className="flex flex-col items-center gap-6">
            {!isOAuth && (
               <div
                  className={`relative flex items-center transition w-[30rem] sm:w-full ${isPending && 'pointer-events-none opacity-60'}`}
               >
                  <input
                     type={showPassword ? 'text' : 'password'}
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder={t('enter-password')}
                     disabled={isPending}
                     className="w-full rounded-full px-6 py-3 text-3xl placeholder:text-2xl bg-transparent border border-primary-300 text-primary-600 dark:text-primary-500 placeholder:text-primary-400/90 dark:placeholder:text-primary-500/40 outline-none"
                  />
                  <AnimatePresence>
                     {password.length > 0 && (
                        <motion.button
                           type="button"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           transition={{ duration: 0.075 }}
                           onClick={() => setShowPassword((prev) => !prev)}
                           className="absolute right-4 text-primary-600/50 hover:text-primary-700/70 transition cursor-pointer"
                        >
                           {showPassword ? (
                              <AiOutlineEyeInvisible className="size-8" />
                           ) : (
                              <AiOutlineEye className="size-8" />
                           )}
                        </motion.button>
                     )}
                  </AnimatePresence>
               </div>
            )}

            <div className="flex items-center gap-2 text-3xl">
               <button
                  className={`relative rounded-full pt-3.5 pb-2.5 pl-6 pr-5.5 cursor-pointer hover:shadow-delete-btn dark:hover:shadow-none transition tracking-wide text-4xl ${
                     isOAuth || password
                        ? 'text-[#ca6565] dark:text-[#e78989]'
                        : 'text-[#db7979]/50 dark:text-[#cc7272]/50'
                  } ${
                     !isPending && (isOAuth || password)
                        ? 'hover:bg-red-400/70 dark:hover:bg-red-400/45 hover:text-white dark:hover:text-red-100'
                        : 'hover:shadow-none! pointer-events-none opacity-60'
                  } ${locale === 'en' ? 'font-logo' : 'font-logo-sr'}`}
                  onClick={handleDelete}
                  disabled={isPending || !(isOAuth || password)}
               >
                  {isPending ? (
                     <>
                        <ImSpinner2
                           className={`size-7 animate-spin absolute top-4 text-[#db7979] dark:text-[#cc7272] ${locale === 'en' ? 'right-41' : 'right-36 mr-3.5'}`}
                        />
                        <span>{t('deleting')}</span>
                     </>
                  ) : (
                     <span>{t('delete')}</span>
                  )}
               </button>

               <span className="font-bold text-[#b7babe] dark:text-primary-300 select-none">
                  /
               </span>

               <button
                  className={`mx-4 mr-6 font-semibold tracking-wider text-primary-500 dark:text-primary-400 hover:text-primary-400 dark:hover:text-primary-500 cursor-pointer transition ${
                     isPending && 'pointer-events-none'
                  }`}
                  onClick={onClose}
               >
                  {t('cancel')}
               </button>
            </div>
         </div>
      </div>
   );
}

export default DeleteAccountModal;
