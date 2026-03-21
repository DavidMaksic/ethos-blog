import { useTranslations } from 'use-intl';
import { authClient } from '@/src/lib/auth-client';
import { useLocale } from 'next-intl';
import { motion } from 'motion/react';
import { Link } from '@/src/i18n/navigation';

function AuthModal({ onClose, string }) {
   const t = useTranslations();
   const locale = useLocale();

   const { data } = authClient.useSession();
   const session = data?.session;

   return (
      <motion.div
         className="flex flex-col items-center gap-10 px-8 xs:px-4"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.1 }}
      >
         <div className="text-primary-600 dark:text-primary-500 w-[40rem] xl:w-[36rem] md:w-[34rem] sm:w-[30rem] xs:w-[25rem] 3xs:w-[22rem] text-center text-[2.2rem] leading-11 border-b border-b-quaternary px-8 md:px-0 pb-10">
            {t('Auth.join')}
            <span
               className={`px-3 text-accent ${locale === 'en' ? 'font-logo' : 'font-logo-sr'}`}
            >
               {t('Logo')}
            </span>
            {t(`Auth.${string}`)}
         </div>

         <div className="flex items-center gap-2 text-3xl">
            <Link
               href={session ? '/user/home' : '/login'}
               className={`flex items-center gap-2 text-accent hover:bg-accent-400/80 dark:hover:bg-accent-300/55 hover:text-white dark:hover:text-accent-100 hover:shadow-link-btn dark:hover:shadow-link-btn-dark rounded-full py-3.5 pl-6 pr-5.5 cursor-pointer transition text-4xl tracking-wide ${locale === 'en' ? 'font-logo' : 'font-logo-sr'}`}
            >
               {t('Auth.generic-sign-in')}
            </Link>

            <span className="font-bold text-[#b7babe] dark:text-primary-300 select-none">
               /
            </span>

            <button
               className="mx-4 mr-6 font-semibold tracking-wider text-primary-500 dark:text-primary-400 hover:text-primary-400 dark:hover:text-primary-500 cursor-pointer transition"
               onClick={onClose}
            >
               {t('Auth.close')}
            </button>
         </div>
      </motion.div>
   );
}

export default AuthModal;
