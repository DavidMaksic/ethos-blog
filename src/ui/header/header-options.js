'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { IoMoonOutline } from 'react-icons/io5';
import { HiOutlineUser } from 'react-icons/hi2';
import { LuSunMedium } from 'react-icons/lu';
import { authClient } from '@/src/lib/auth-client';
import { useTheme } from 'next-themes';
import { Link } from '@/src/i18n/navigation';

import LanguageButton from '@/src/ui/buttons/language-button';
import ProfileButton from '@/src/ui/image/profile-button';
import HeaderButton from '@/src/ui/buttons/header-button';
import MobileMenu from '@/src/ui/mobile-menu';

function HeaderOptions() {
   const { resolvedTheme, setTheme } = useTheme();
   const { data } = authClient.useSession();
   const session = data?.session;

   const [mounted, setMounted] = useState(false);
   useEffect(() => setMounted(true), []);

   return (
      <div className="flex items-center gap-2 md:gap-1 sm:gap-1.5">
         <span className="text-primary-400/80 dark:text-primary-500/80 text-2xl mr-4 lg:ml-2 font-extralight select-none md:hidden">
            |
         </span>

         <AnimatePresence mode="wait" initial={false}>
            {!mounted ? (
               <HeaderButton>
                  <LuSunMedium className="size-7! sm:size-8.5! stroke-[1.5px]" />
               </HeaderButton>
            ) : (
               <motion.div
                  key="theme"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
               >
                  <HeaderButton
                     handler={() =>
                        setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
                     }
                  >
                     {resolvedTheme === 'dark' ? (
                        <IoMoonOutline className="size-7! md:size-8.5! p-0.5" />
                     ) : (
                        <LuSunMedium className="size-7! md:size-8.5! stroke-[1.7px]" />
                     )}
                  </HeaderButton>
               </motion.div>
            )}
         </AnimatePresence>

         <AnimatePresence mode="wait" initial={false}>
            {!mounted || !session ? (
               <motion.div
                  key="login"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
               >
                  <HeaderButton styles="md:hidden">
                     <Link href="/login" className="hover:text-accent">
                        <HiOutlineUser className="size-6.5! stroke-[1.7px]" />
                     </Link>
                  </HeaderButton>
               </motion.div>
            ) : (
               <motion.div
                  key="profile"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
               >
                  <ProfileButton key="profile" />
               </motion.div>
            )}
         </AnimatePresence>

         <LanguageButton />

         <span className="text-primary-400/80 dark:text-primary-500/80 text-2xl mx-4 font-extralight select-none hidden md:block">
            |
         </span>

         <MobileMenu />
      </div>
   );
}

export default HeaderOptions;
