'use client';

import { useEffect, useState } from 'react';
import { IoMoonOutline } from 'react-icons/io5';
import { HiOutlineUser } from 'react-icons/hi2';
import { LuSunMedium } from 'react-icons/lu';
import { ImSpinner2 } from 'react-icons/im';
import { useTheme } from 'next-themes';
import { useAuth } from '@/src/context/auth-context';
import { motion } from 'motion/react';
import { Link } from '@/src/i18n/navigation';

import LanguageButton from '@/src/ui/buttons/language-button';
import HeaderButton from '@/src/ui/buttons/header-button';
import MobileMenu from '@/src/ui/mobile-menu';
import Image from 'next/image';

function HeaderOptions() {
   const [mounted, setMounted] = useState();
   const [loaded, setLoaded] = useState(false);

   const { resolvedTheme, setTheme } = useTheme();
   const { user, extendedUser, loading } = useAuth();

   useEffect(() => setMounted(true), []);

   return (
      <div className="flex items-center gap-2 md:gap-1 sm:gap-1.5">
         <span className="text-primary-400/80 dark:text-primary-500/80 text-2xl mr-4 lg:ml-2 font-extralight select-none md:hidden">
            |
         </span>

         {!mounted ? (
            <HeaderButton>
               <LuSunMedium className="size-7! sm:size-8.5! stroke-[1.5px]" />
            </HeaderButton>
         ) : (
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
         )}

         {loading ? (
            <motion.span
               className="md:hidden"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.2 }}
            >
               <ImSpinner2 className="size-7! mx-[0.43rem] p-0.5 text-accent animate-spin" />
            </motion.span>
         ) : extendedUser ? (
            <Link
               href="/user/home"
               className="mx-[-2px] block hover:text-accent bg-none border-none p-2 rounded-xl transition-200 hover:bg-primary-200/40 dark:hover:bg-primary-300/30 [&_svg]:size-6 [&_svg]:text-accent cursor-pointer select-none md:hidden"
            >
               <div className="relative size-7.5!">
                  <Image
                     className={`rounded-full block aspect-square object-cover object-center border border-primary-300 transition-200 ${
                        loaded ? 'dark:opacity-90' : 'opacity-0'
                     }`}
                     src={extendedUser.image ? extendedUser.image : user.image}
                     alt="Profile image"
                     onLoad={() => setLoaded(true)}
                     unoptimized
                     priority
                     fill
                  />
               </div>
            </Link>
         ) : (
            <HeaderButton styles="md:hidden">
               <Link href="/user/home" className="hover:text-accent">
                  <HiOutlineUser className="size-6.5! stroke-[1.7px]" />
               </Link>
            </HeaderButton>
         )}

         <LanguageButton />

         <span className="text-primary-400/80 dark:text-primary-500/80 text-2xl mx-4 font-extralight select-none hidden md:block">
            |
         </span>

         <MobileMenu />
      </div>
   );
}

export default HeaderOptions;
