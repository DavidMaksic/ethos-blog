'use client';

import { useEffect, useState } from 'react';
import { IoMoonOutline } from 'react-icons/io5';
import { HiOutlineUser } from 'react-icons/hi2';
import { LuSunMedium } from 'react-icons/lu';
import { useTheme } from 'next-themes';
import { Link } from '@/src/i18n/navigation';

import LanguageButton from '@/src/ui/buttons/language-button';
import HeaderButton from '@/src/ui/buttons/header-button';
import MobileMenu from '@/src/ui/mobile-menu';
import Image from 'next/image';

function HeaderOptions({ session, oldUser, newUser }) {
   const [mounted, setMounted] = useState();
   const { resolvedTheme, setTheme } = useTheme();

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

         {oldUser?.image || newUser?.image ? (
            <Link
               href="/user/home"
               className=" block hover:text-accent bg-none border-none p-2 rounded-lg transition-200 hover:bg-primary-200/40 dark:hover:bg-primary-300/30 [&_svg]:size-6 [&_svg]:text-accent cursor-pointer select-none md:hidden"
            >
               <div className="relative size-7.5!">
                  <Image
                     className="rounded-full block aspect-square object-cover object-center opacity-80 border border-primary-300 transition-200"
                     fill
                     src={newUser.image ? newUser.image : oldUser.image}
                     alt="Profile image"
                     referrerPolicy="no-referrer"
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

         <div className="md:hidden bg-none border-none p-2 rounded-lg transition-200 hover:bg-primary-200/40 dark:hover:bg-primary-300/30 [&_svg]:size-6 [&_svg]:text-accent cursor-pointer select-none">
            <LanguageButton />
         </div>

         <span className="text-primary-400/80 dark:text-primary-500/80 text-2xl mx-4 font-extralight select-none hidden md:block">
            |
         </span>

         <MobileMenu session={session} newUser={newUser} oldUser={oldUser} />
      </div>
   );
}

export default HeaderOptions;
