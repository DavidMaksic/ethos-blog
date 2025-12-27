'use client';

import { useLocale, useTranslations } from 'next-intl';
import { RiTwitterXFill } from 'react-icons/ri';
import { IoLogoGithub } from 'react-icons/io5';
import { usePathname } from 'next/navigation';
import { FaInstagram } from 'react-icons/fa';
import { Link } from '@/src/i18n/navigation';
import React from 'react';

function Footer() {
   const t = useTranslations();
   const locale = useLocale();
   const pathname = usePathname();

   const navLinks = [
      { href: '/', label: t('HomePage.nav-link-1') },
      { href: '/archive', label: t('HomePage.nav-link-2') },
      { href: '/about', label: t('HomePage.nav-link-3') },
      { href: '/user/home', label: t('HomePage.nav-link-4') },
   ];

   const handleNavClick = (href) => (e) => {
      if (pathname === href) {
         e.preventDefault();
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }
   };

   return (
      <footer
         className={`w-7xl 2xl:w-full rounded-4xl mb-14 self-center flex flex-col justify-center items-center gap-10 py-20 border border-tertiary dark:border-primary-300/10 text-primary-600 dark:text-primary-600/50 text-2xl bg-white/60 dark:bg-primary-100/50 ${
            pathname.includes('/user') && 'sm:mb-44'
         }`}
      >
         <Link
            href="/"
            className={`styled_text text-center text-7xl bg-primary-600/80 dark:bg-primary-600/60 pt-2 px-2 hover:bg-primary-500/70 dark:hover:bg-primary-700/80 transition-bg duration-100 ${
               locale === 'en' && 'font-logo'
            } ${locale === 'sr' && 'font-logo-sr'}`}
            onClick={() => {
               window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
               });
            }}
         >
            {t('Logo')}
         </Link>

         <div className="flex sm:flex-col items-center gap-10 md:gap-6 sm:gap-2 py-3 sm:py-10 px-12 sm:px-14 sm:text-3xl border-t border-t-primary-600/50 border-b border-b-primary-600/50 [&_span]:text-base [&_a]:hover:text-primary-500/80 [&_a]:dark:hover:text-primary-800/80 [&_a]:transition duration-75">
            {navLinks.map((link, i) => (
               <React.Fragment key={link.href}>
                  <Link href={link.href} onClick={handleNavClick(link.href)}>
                     {link.label}
                  </Link>
                  {i < navLinks.length - 1 && <span>•</span>}
               </React.Fragment>
            ))}
         </div>

         <div className="flex gap-10 text-3xl [&_a]:hover:text-primary-500/80 [&_a]:dark:hover:text-primary-800/80 [&_a]:transition duration-75">
            <Link href="https://www.instagram.com/ethos.blog/" target="_blank">
               <FaInstagram />
            </Link>
            <Link href="https://x.com/EthosBlogging" target="_blank">
               <RiTwitterXFill />
            </Link>
            <Link href="https://github.com/DavidMaksic" target="_blank">
               <IoLogoGithub />
            </Link>
         </div>

         <span className="flex flex-col text-center gap-1 text-xl font-secondary opacity-90">
            {t('HomePage.copyright')}
         </span>
      </footer>
   );
}

export default Footer;
