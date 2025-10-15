import { AnimatePresence, motion } from 'motion/react';
import { LuLibrary, LuLogIn } from 'react-icons/lu';
import { IoDocumentOutline } from 'react-icons/io5';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { useOutsideClick } from '@/src/hooks/use-outside-click';
import { useTranslations } from 'next-intl';
import { HiOutlineUser } from 'react-icons/hi2';
import { BiHomeAlt2 } from 'react-icons/bi';
import { LANGUAGES } from '@/src/utils/config';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Link } from '@/src/i18n/navigation';

import FilterButton from '@/src/ui/buttons/filter-button';
import Image from 'next/image';

function MobileMenu({ session, newUser, oldUser }) {
   const [openMenu, setOpenMenu] = useState(false);
   const ref = useOutsideClick(() => setOpenMenu((isOpen) => !isOpen), false);

   const param = useParams();
   const t = useTranslations();

   return (
      <>
         <HiOutlineMenuAlt3
            className="hidden md:block size-8 mx-2"
            onClick={(e) => {
               e.stopPropagation();
               setOpenMenu((isOpen) => !isOpen);
            }}
         />

         <AnimatePresence>
            {openMenu && (
               <motion.div
                  className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-65%] 3xs:translate-y-[-55%] flex 3xs:flex-col gap-2 xs:gap-0 3xs:gap-2 py-8 xs:py-6 3xs:py-4 pb-8.5 xs:pb-6.5 3xs:pb-4.5 pr-6 xs:pr-5 3xs:pr-8 pl-4 xs:pl-4 3xs:pl-8 text-2xl rounded-3xl bg-white dark:bg-primary/80 backdrop-blur-3xl border border-quaternary dark:border-primary-300/15 shadow-article dark:shadow-none overflow-auto transition-bg_border z-40"
                  ref={ref}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
               >
                  <div
                     className={`pl-10 xs:pl-6 pr-16 xs:pr-12 py-2 xs:pt-0  pb-4 xs:pb-0 3xs:pb-12 space-y-7 3xs:border-b 3xs:border-b-primary-300 3xs:dark:border-b-primary-300/40 ${
                        session ? 'xs:pt-2.5' : 'xs:pt-0 xs:pb-3.5'
                     }`}
                  >
                     <h2 className="uppercase tracking-wide font-semibold text-accent dark:text-accent-200">
                        {t('HomePage.pages-label')}
                     </h2>

                     <div className="space-y-7 xs:space-y-6 text-4xl">
                        <Link
                           href="/"
                           prefetch
                           className="flex items-center gap-3.5"
                           onClick={() => setOpenMenu((isOpen) => !isOpen)}
                        >
                           <BiHomeAlt2 className="size-7" />
                           <span>{t('HomePage.nav-link-1')}</span>
                        </Link>
                        <Link
                           href="/archive"
                           prefetch
                           className="flex items-center gap-3.5"
                           onClick={() => setOpenMenu((isOpen) => !isOpen)}
                        >
                           <LuLibrary className="size-7" />
                           <span>{t('HomePage.nav-link-2')}</span>
                        </Link>
                        <Link
                           href="/about"
                           prefetch
                           className="flex items-center gap-3.5"
                           onClick={() => setOpenMenu((isOpen) => !isOpen)}
                        >
                           <IoDocumentOutline className="size-7" />
                           <span>{t('HomePage.nav-link-3')}</span>
                        </Link>
                        <Link
                           href="/user/home"
                           prefetch
                           className="flex items-center gap-3.5"
                           onClick={() => setOpenMenu((isOpen) => !isOpen)}
                        >
                           <HiOutlineUser className="size-7" />
                           <span>{t('HomePage.nav-link-4')}</span>
                        </Link>
                     </div>
                  </div>

                  <span className="w-px bg-primary-300 dark:bg-primary-300/40 3xs:hidden" />

                  <div className="flex flex-col gap-2 items-center">
                     {newUser?.image || oldUser?.image ? (
                        <div className="min-w-50 xs:min-w-full flex flex-col gap-3 items-center mx-4 xs:mx-0 py-2 3xs:pt-5 pb-6 border-b border-b-primary-300 dark:border-b-primary-300/40">
                           <Link
                              href="/user/home"
                              prefetch
                              className="relative size-18"
                              onClick={() => setOpenMenu((isOpen) => !isOpen)}
                           >
                              <Image
                                 className="rounded-full block aspect-square object-cover object-center dark:opacity-90 border border-primary-300 transition-200"
                                 fill
                                 priority={true}
                                 src={
                                    newUser?.image
                                       ? newUser?.image
                                       : oldUser?.image
                                 }
                                 alt="Profile image"
                                 referrerPolicy="no-referrer"
                              />
                           </Link>
                           <span className="text-accent-400 dark:text-accent text-4xl w-fit self-center pr-1.5 font-logo">
                              {newUser?.username
                                 ? newUser?.username.split(' ')[0].slice(0, 10)
                                 : oldUser?.name.split(' ')[0].slice(0, 10)}
                           </span>
                        </div>
                     ) : (
                        <Link
                           href="/user/home"
                           prefetch
                           className="min-w-50 xs:min-w-full flex gap-2 items-center justify-center mx-4 xs:mx-0 py-12 border-b border-b-primary-300 dark:border-b-primary-300/40"
                           onClick={() => setOpenMenu((isOpen) => !isOpen)}
                        >
                           <span className="text-3xl">{t('Auth.sign-in')}</span>
                           <LuLogIn className="size-7 text-accent/90 dark:text-accent-200" />
                        </Link>
                     )}

                     <div
                        className={`py-7 xs:pb-5 xs:pt-4 px-4 xs:pl-5 flex flex-col gap-2 items-center md:items-start ${
                           !session && 'xs:pt-5!'
                        }`}
                     >
                        {LANGUAGES.map((item) => (
                           <FilterButton
                              key={item.code}
                              lang={item.code}
                              param={param}
                              styles="md:text-[2rem]! ml-1!"
                              imageStyle="size-10!"
                              activeStyle="py-1.5! pl-3.5! pr-4! rounded-2xl!"
                              isMobile={true}
                           >
                              {item.lang}
                           </FilterButton>
                        ))}
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         <span
            className={`fixed top-0 left-0 h-screen w-full z-30 dark:bg-[#41455334] backdrop-blur-2xl transition-opacity duration-200  hidden md:block ${
               openMenu
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none'
            }`}
         />
      </>
   );
}

export default MobileMenu;
