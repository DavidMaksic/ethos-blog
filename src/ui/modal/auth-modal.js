import { Great_Vibes, Parisienne } from 'next/font/google';
import { useTranslations } from 'use-intl';
import { useLocale } from 'next-intl';
import { LuLogIn } from 'react-icons/lu';
import { motion } from 'motion/react';
import { Link } from '@/src/i18n/navigation';

const parisienne = Parisienne({
   subsets: ['latin'],
   display: 'swap',
   weight: ['400'],
});

const greatVibes = Great_Vibes({
   subsets: ['cyrillic'],
   display: 'swap',
   weight: ['400'],
});

function AuthModal({ onClose, string }) {
   const t = useTranslations();
   const locale = useLocale();

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
               className={`px-3 text-accent ${
                  locale === 'en' && parisienne.className
               } ${locale === 'sr' && greatVibes.className}`}
            >
               {t('Logo')}
            </span>
            {t(`Auth.${string}`)}
         </div>

         <div className="flex items-center gap-2 text-2xl">
            <Link
               href="/user/home"
               className="flex items-center gap-2 hover:bg-accent-400 dark:hover:bg-accent-300/60 hover:text-white rounded-full p-2 px-4 pl-6 cursor-pointer hover:shadow-link-btn dark:hover:shadow-link-btn-dark transition"
            >
               <span className="uppercase font-semibold tracking-wider">
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
