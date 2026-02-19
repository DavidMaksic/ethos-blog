import { AnimatePresence, motion } from 'motion/react';
import { LuLibrary, LuLogIn } from 'react-icons/lu';
import { IoDocumentOutline } from 'react-icons/io5';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { useTranslations } from 'next-intl';
import { HiOutlineUser } from 'react-icons/hi2';
import { authClient } from '@/src/lib/auth-client';
import { ImSpinner2 } from 'react-icons/im';
import { BiHomeAlt2 } from 'react-icons/bi';
import { LANGUAGES } from '@/src/utils/config';
import { useState } from 'react';
import { Link } from '@/src/i18n/navigation';

import LanguageFilterButton from '@/src/ui/buttons/language-filter-button';
import defaultPfp from '@/public/default-pfp.png';
import Modal from '@/src/ui/modal/modal';
import Image from 'next/image';

function MobileMenu() {
   const t = useTranslations();
   const [openMenu, setOpenMenu] = useState(false);
   const [loaded, setLoaded] = useState(false);

   const { data, isPending } = authClient.useSession();
   const session = data?.session;
   const user = data?.user;
   const profileImage = user?.image ?? defaultPfp;

   return (
      <>
         <HiOutlineMenuAlt3
            className="hidden md:block size-8 mx-2"
            onClick={(e) => {
               e.stopPropagation();
               e.nativeEvent.stopImmediatePropagation();
               setOpenMenu((isOpen) => !isOpen);
            }}
         />

         <AnimatePresence>
            {openMenu && (
               <Modal
                  styles="py-8! xs:py-6! 3xs:py-4! pb-8.5! xs:pb-6.5! 3xs:pb-4.5! pr-6! xs:pr-5! 3xs:pr-8! pl-4! xs:pl-4! 3xs:pl-8!"
                  closeModal={() => setOpenMenu(false)}
               >
                  <motion.div className="flex 3xs:flex-col gap-2 xs:gap-0 3xs:gap-2 text-2xl">
                     <div className="pl-10 xs:pl-6 pr-16 xs:pr-12 py-2 xs:pt-2.5 pb-4 xs:pb-0 3xs:pb-12 space-y-7 3xs:border-b 3xs:border-b-primary-300 3xs:dark:border-b-primary-300/40">
                        <h2 className="uppercase tracking-wide font-semibold text-accent dark:text-accent-200">
                           {t('HomePage.pages-label')}
                        </h2>

                        <div className="space-y-7 xs:space-y-6 text-4xl">
                           <Link
                              href="/"
                              className="flex items-center gap-3.5"
                              onClick={() => setOpenMenu((isOpen) => !isOpen)}
                           >
                              <BiHomeAlt2 className="size-7" />
                              <span>{t('HomePage.nav-link-1')}</span>
                           </Link>
                           <Link
                              href="/archive"
                              className="flex items-center gap-3.5"
                              onClick={() => setOpenMenu((isOpen) => !isOpen)}
                           >
                              <LuLibrary className="size-7" />
                              <span>{t('HomePage.nav-link-2')}</span>
                           </Link>
                           <Link
                              href="/about"
                              className="flex items-center gap-3.5"
                              onClick={() => setOpenMenu((isOpen) => !isOpen)}
                           >
                              <IoDocumentOutline className="size-7" />
                              <span>{t('HomePage.nav-link-3')}</span>
                           </Link>
                           <Link
                              href={session ? '/user/home' : '/login'}
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
                        <div className="min-w-50 min-h-39.5 3xs:min-h-[10.6rem] xs:min-w-full flex flex-col gap-3 items-center justify-center mx-4 xs:mx-0 py-2 3xs:pt-5 pb-6 border-b border-b-primary-300 dark:border-b-primary-300/40">
                           {isPending ? (
                              <motion.span
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 1 }}
                                 exit={{ opacity: 0 }}
                                 transition={{ duration: 0.2 }}
                              >
                                 <ImSpinner2 className="size-14 text-accent/80 animate-spin" />
                              </motion.span>
                           ) : user ? (
                              <>
                                 <Link
                                    href={session ? '/user/home' : '/login'}
                                    className="relative size-18"
                                    onClick={() =>
                                       setOpenMenu((isOpen) => !isOpen)
                                    }
                                 >
                                    <Image
                                       className={`rounded-full block aspect-square object-cover object-center border border-primary-300 transition-200 ${
                                          loaded
                                             ? 'dark:opacity-90'
                                             : 'opacity-0'
                                       } ${profileImage === defaultPfp ? 'dark:opacity-40!' : ''}`}
                                       src={profileImage}
                                       onLoad={() => setLoaded(true)}
                                       alt="Profile image"
                                       unoptimized
                                       priority
                                       fill
                                    />
                                 </Link>
                                 <span
                                    className={`text-accent dark:text-accent-200 text-4xl w-fit self-center pr-1.5 font-logo transition-200 ${
                                       loaded ? 'opacity-100' : 'opacity-0'
                                    }`}
                                 >
                                    {user?.name.split(' ')[0].slice(0, 10)}
                                 </span>
                              </>
                           ) : (
                              <Link
                                 href={session ? '/user/home' : '/login'}
                                 className="flex gap-2 items-center justify-center transition-200"
                                 onClick={() =>
                                    setOpenMenu((isOpen) => !isOpen)
                                 }
                              >
                                 <span className="text-3xl">
                                    {t('Auth.generic-sign-in')}
                                 </span>
                                 <LuLogIn className="size-7 text-accent/90 dark:text-accent-200" />
                              </Link>
                           )}
                        </div>

                        <div className="py-7 xs:pb-5 xs:pt-5 px-4 xs:pl-5 flex flex-col gap-2 items-center md:items-start">
                           {LANGUAGES.map((item) => (
                              <LanguageFilterButton
                                 key={item.code}
                                 lang={item.code}
                                 styles="md:text-[2rem]! ml-1!"
                                 imageStyle="size-10!"
                                 activeStyle="py-1.5! pl-3.5! pr-4! rounded-2xl!"
                                 isMobile={true}
                              >
                                 {item.lang}
                              </LanguageFilterButton>
                           ))}
                        </div>
                     </div>
                  </motion.div>
               </Modal>
            )}
         </AnimatePresence>
      </>
   );
}

export default MobileMenu;
