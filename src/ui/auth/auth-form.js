'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';

import SignUpInputs from '@/src/ui/auth/signup-inputs';
import SignInInputs from '@/src/ui/auth/signin-inputs';
import LoginHeader from '@/src/ui/header/login-header';
import OAuth from '@/src/ui/auth/oauth';

function AuthForm() {
   const [mode, setMode] = useState('signin');
   const isMobile = useMediaQuery({ maxWidth: 768 });
   useThemeColor();

   return (
      <motion.div
         className="w-[55%] 2xl:w-[67%] xl:w-[80%] lg:w-[85%] md:w-[70%] sm:w-[80%] xs:w-[90%]"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: isMobile ? 0.3 : 0 }}
      >
         <AnimatePresence mode="wait" initial={false}>
            <motion.div
               layout
               key={mode}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{
                  opacity: { duration: 0.2 },
                  layout: { duration: 0.25, ease: 'easeInOut' },
               }}
               className="flex flex-col gap-5 lg:gap-3 md:gap-5 px-18 lg:px-14 md:px-18 sm:px-14 3xs:px-10 py-12 lg:py-10 md:py-12 sm:py-11 3xs:py-10 pb-13 lg:pb-11 md:pb-13 sm:pb-12 3xs:pb-11 items-center bg-primary/70 md:bg-primary/40 md:dark:bg-primary-300/15 backdrop-blur-xl md:backdrop-blur-none border border-primary/15 dark:border-primary-400/10 rounded-3xl transition-bg_border shadow-2xl md:dark:shadow-none text-primary-600/90 dark:text-primary-600/60 -translate-y-[18px] lg:translate-y-0"
            >
               <LoginHeader mode={mode} />

               {mode === 'signin' ? <SignInInputs /> : <SignUpInputs />}

               <OAuth
                  mode={mode}
                  onToggleMode={() =>
                     setMode(mode === 'signin' ? 'signup' : 'signin')
                  }
               />
            </motion.div>
         </AnimatePresence>
      </motion.div>
   );
}

export default AuthForm;
