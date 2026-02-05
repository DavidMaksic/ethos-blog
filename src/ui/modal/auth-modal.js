import { useTranslations } from 'use-intl';
import { useLocale } from 'next-intl';
import { useAuth } from '@/src/context/auth-context';
import { LuLogIn } from 'react-icons/lu';
import { motion } from 'motion/react';
import { Link } from '@/src/i18n/navigation';

function AuthModal({ onClose, string }) {
   const t = useTranslations();
   const locale = useLocale();
   const { session } = useAuth();

   return (
      <motion.div
         className="flex flex-col items-center gap-10"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.1 }}
      >
         <div className="text-primary-600 dark:text-primary-500 w-[75%] md:w-[34rem] xs:w-[25rem] 3xs:w-[23rem] md:px-12 xs:px-8 text-center text-[2.2rem] leading-11 border-b border-b-quaternary pb-10">
            {t('Auth.join')}
            <span
               className={`px-3 text-accent ${locale === 'en' && 'font-logo'} ${
                  locale === 'sr' && 'font-logo-sr'
               }`}
            >
               {t('Logo')}
            </span>
            {t(`Auth.${string}`)}
         </div>

         <div className="flex items-center gap-2 text-[1.7rem]">
            <Link
               href={session ? '/user/home' : '/login'}
               className="flex items-center gap-2 text-accent hover:bg-accent-400/80 dark:hover:bg-accent-300/55 hover:text-white dark:hover:text-accent-100 hover:shadow-link-btn dark:hover:shadow-none rounded-full p-2 px-4 pl-5 cursor-pointer transition"
            >
               <span className="font-semibold tracking-wide">
                  {t('Auth.sign-in')}
               </span>
               <LuLogIn className="size-5.5" />
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
