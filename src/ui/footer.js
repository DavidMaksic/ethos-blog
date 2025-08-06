'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Great_Vibes, Parisienne } from 'next/font/google';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';
import { IoLogoGithub } from 'react-icons/io5';
import { Link } from '@/src/i18n/navigation';
import { usePathname } from 'next/navigation';

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

function Footer() {
   const t = useTranslations();
   const locale = useLocale();
   const pathname = usePathname();

   return (
      <footer
         className={`w-7xl 2xl:w-full rounded-4xl mb-14 self-center flex flex-col justify-center items-center gap-10 py-20 border border-tertiary dark:border-primary-300/10 text-primary-600 dark:text-primary-600/50 text-2xl bg-white/60 dark:bg-primary-100/50 ${
            pathname.includes('/user') && 'sm:mb-44'
         }`}
      >
         <Link
            href="/"
            className={`styled_text text-center text-7xl bg-primary-600/80 dark:bg-primary-600/60 pt-2 px-2 hover:bg-primary-700/90 transition-bg duration-100 ${
               locale === 'en' && parisienne.className
            } ${locale === 'sr-cyrl' && greatVibes.className}`}
            onClick={() => {
               window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
               });
            }}
         >
            {t('Logo')}
         </Link>

         <div className="flex sm:flex-col items-center gap-10 md:gap-6 sm:gap-2 py-3 sm:py-10 px-12 sm:px-14 sm:text-3xl border-t border-t-primary-600/50 border-b border-b-primary-600/50 [&_span]:text-base [&_a]:hover:text-primary-800">
            <Link href="/">{t('HomePage.nav-link-1')}</Link>
            <span>•</span>
            <Link href="/archive">{t('HomePage.nav-link-2')}</Link>
            <span>•</span>
            <Link href="/about">{t('HomePage.nav-link-3')}</Link>
            <span>•</span>
            <Link href="/user/home">{t('HomePage.nav-link-4')}</Link>
         </div>

         <ul className="flex gap-10 text-3xl [&_li]:hover:text-primary-800 [&_li]:transition duration-100">
            <li>
               <FaFacebook />
            </li>
            <li>
               <FaInstagram />
            </li>
            <li>
               <RiTwitterXFill />
            </li>
            <li>
               <IoLogoGithub />
            </li>
         </ul>

         <div className="flex flex-col text-center gap-1 text-xl">
            <span>{t('HomePage.copyright')}</span>
            <span>Project for portfolio</span>
         </div>
      </footer>
   );
}

export default Footer;
