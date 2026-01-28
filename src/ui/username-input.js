'use client';

import { useActionState, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { GiCheckMark } from 'react-icons/gi';
import { updateUser } from '@/src/lib/actions';
import { ImSpinner2 } from 'react-icons/im';
import toast from 'react-hot-toast';

function UsernameInput() {
   const t = useTranslations('Profile');
   const [input, setInput] = useState('');
   const [state, action, isPending] = useActionState(updateUser, {
      success: false,
   });

   useEffect(() => {
      if (state.success) {
         setInput('');
         toast.success(t('username-updated'));
         state.success = false;
      }
   }, [state, t]);

   return (
      <form action={action} className="flex flex-col gap-2 relative">
         <label
            className="text-sm uppercase font-semibold text-primary-400 tracking-wider"
            htmlFor="username"
         >
            {t('new-username')}
         </label>

         <input
            className="w-[90%] text-3xl xs:text-4xl border-b border-b-quaternary outline-none"
            value={input}
            name="username"
            autoComplete="one-time-code"
            onChange={(e) => setInput(e.target.value)}
         />

         <AnimatePresence>
            {!isPending ? (
               input?.length > 2 && input?.length < 25 ? (
                  <motion.button
                     className="absolute bottom-0 -right-4 md:-right-6.5"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.075 }}
                  >
                     <GiCheckMark className="opacity-80 size-9 md:size-12 px-[0.5rem] md:px-3 pt-0.5 rounded-full text-primary-500 dark:text-primary-500 hover:text-green-900/80 dark:hover:text-green-900 bg-white dark:bg-primary-300/40 hover:bg-green-200/60 border border-primary-300/70 dark:border-quaternary hover:border-green-700/30 transition-bg_color_border cursor-pointer" />
                  </motion.button>
               ) : null
            ) : (
               <motion.span
                  className="absolute bottom-0 -right-3.5 md:-right-5.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
               >
                  <ImSpinner2 className="size-8.5 md:size-11 animate-spin opacity-70 sm:opacity-60" />
               </motion.span>
            )}
         </AnimatePresence>
      </form>
   );
}

export default UsernameInput;
