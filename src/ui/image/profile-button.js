'use client';

import {
   DropdownMenu,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuContent,
   DropdownMenuTrigger,
   DropdownMenuSeparator,
   DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

import { LuBookmark, LuLogOut, LuUserRoundPen } from 'react-icons/lu';
import { TbLayoutDashboard } from 'react-icons/tb';
import { useRef, useState } from 'react';
import { Link, useRouter } from '@/src/i18n/navigation';
import { useTranslations } from 'next-intl';
import { FaRegComment } from 'react-icons/fa6';
import { authClient } from '@/src/lib/auth-client';

import defaultPfp from '@/public/default-pfp.png';
import Image from 'next/image';

function ProfileButton() {
   const [open, setOpen] = useState(false);
   const { data } = authClient.useSession();
   const user = data?.user;

   const lastImage = useRef(defaultPfp);
   if (user?.image) lastImage.current = user.image;
   const profileImage = lastImage.current;

   const t = useTranslations('Profile');
   const router = useRouter();

   const links = [
      {
         name: t('nav-link-1'),
         href: '/user/home',
         icon: <TbLayoutDashboard className="size-4.5" />,
      },
      {
         name: t('nav-link-2'),
         href: '/user/comments',
         icon: <FaRegComment className="size-4" />,
      },
      {
         name: t('nav-link-3'),
         href: '/user/bookmarks',
         icon: <LuBookmark className="size-4.5" />,
      },
      {
         name: t('nav-link-4'),
         href: '/user/settings',
         icon: <LuUserRoundPen className="size-4.5" />,
      },
   ];

   const handleLogout = async () => {
      await authClient.signOut({
         fetchOptions: { onSuccess: () => router.push('/') },
      });
   };

   return (
      <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
         <DropdownMenuTrigger
            aria-label="Open user menu"
            className="mx-[-2px] md:hidden hover:text-accent bg-none border-none p-2 rounded-xl hover:bg-primary-200/40 dark:hover:bg-primary-300/30 cursor-pointer select-none outline-none transition-200"
         >
            <div className="relative size-7.5!">
               <Image
                  className={`rounded-full block aspect-square object-cover object-center border border-primary-300 transition-200 opacity-90 ${profileImage === defaultPfp ? 'dark:opacity-55!' : ''}`}
                  src={profileImage}
                  alt="Profile image"
                  unoptimized
                  preload
                  fill
               />
            </div>
         </DropdownMenuTrigger>

         <DropdownMenuContent
            align="end"
            className="w-46 text-primary-700 [&_svg]:text-primary-500 bg-white dark:bg-primary-300/20 backdrop-blur-2xl transition-bg_border"
         >
            <DropdownMenuGroup>
               <DropdownMenuLabel className="cursor-default text-base text-primary-400 pl-3.5">
                  {t('my-account')}
               </DropdownMenuLabel>
               {links.map(({ name, href, icon }) => (
                  <DropdownMenuItem key={href} asChild className="py-0 pl-1">
                     <Link
                        prefetch
                        href={href}
                        className="flex w-full items-center gap-2 px-2 py-1.5 font-medium hover:text-accent!  pl-3.5"
                     >
                        {icon}
                        {name}
                     </Link>
                  </DropdownMenuItem>
               ))}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
               variant="destructive"
               onClick={handleLogout}
               className="flex items-center gap-2 cursor-pointer py-1 pl-3.5 font-medium"
            >
               <LuLogOut className="size-4.5" />
               {t('nav-link-5')}
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}

export default ProfileButton;
