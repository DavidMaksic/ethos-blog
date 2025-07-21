'use client';

import { LuBookmark, LuUserRoundPen } from 'react-icons/lu';
import { Link, usePathname } from '@/src/i18n/navigation';
import { TbLayoutDashboard } from 'react-icons/tb';
import { useTranslations } from 'next-intl';
import { FaRegComment } from 'react-icons/fa';
import SignOutButton from '@/src/ui/buttons/signout-button';

function SideNavigation() {
   const pathname = usePathname();
   const t = useTranslations('Profile');

   const navLinks = [
      {
         name: t('nav-link-1'),
         href: '/user/home',
         icon: <TbLayoutDashboard className="md:size-6" />,
      },
      {
         name: t('nav-link-2'),
         href: '/user/comments',
         icon: <FaRegComment className="size-4.5 md:size-5.5 ml-px mr-px" />,
      },
      {
         name: t('nav-link-3'),
         href: '/user/bookmarks',
         icon: <LuBookmark className="md:size-6.5" />,
      },
      {
         name: t('nav-link-4'),
         href: '/user/settings',
         icon: <LuUserRoundPen className="md:size-6" />,
      },
   ];

   return (
      <nav className="sm:fixed sm:left-0 bottom-0 leading-6 sm:order-2 bg-white dark:bg-primary-300/10 sm:dark:bg-primary-200/70 sm:backdrop-blur-3xl border border-quaternary dark:border-primary-300/15 p-3 md:py-2 sm:py-3 xs:py-2 lg:px-1 md:px-0 sm:px-3 rounded-2xl sm:rounded-none box-shadow transition-bg_border md:h-fit sm:w-screen">
         <ul className="flex flex-col sm:flex-row sm:justify-around gap-2 md:grid md:grid-cols-5 md:gap-1">
            {navLinks.map((link) => (
               <li className="lg:self-center" key={link.name}>
                  <Link
                     className={`nav-link lg:px-4 md:px-0 font-semibold group transition-bg_color sm:flex sm:flex-col xs:text-lg ${
                        pathname === link.href
                           ? 'bg-primary-50 dark:bg-primary-300/10 !text-accent [&_svg]:!text-accent'
                           : ''
                     }`}
                     href={link.href}
                  >
                     {link.icon}
                     <span className="lg:hidden sm:block">{link.name}</span>
                  </Link>
               </li>
            ))}

            <li className="mt-[29rem] lg:mt-[22rem] md:mt-[32rem] sm:mt-0">
               <SignOutButton />
            </li>
         </ul>
      </nav>
   );
}

export default SideNavigation;
