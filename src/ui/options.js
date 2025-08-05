'use client';

import { LuSunMedium, LuTableOfContents } from 'react-icons/lu';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { IoMoonOutline, IoOptions } from 'react-icons/io5';
import { AnimatePresence, motion } from 'motion/react';
import { useIntersectionObserver } from '@/src/hooks/use-intersection-observer';
import { useEffect, useState } from 'react';
import { useOutsideClick } from '@/src/hooks/use-outside-click';
import { useTranslations } from 'next-intl';
import { useMediaQuery } from 'react-responsive';
import { RxChatBubble } from 'react-icons/rx';
import { useScroll } from '@/src/hooks/use-scroll';
import { useTheme } from 'next-themes';

function Options() {
   const t = useTranslations('Article');
   const { theme, setTheme } = useTheme();

   // - Scroll
   const { setScroll: setTopScroll, ref: topRef } = useScroll();
   const { setScroll: setBottomScroll, ref: bottomRef } = useScroll();

   // - Table and menu
   const [openTable, setOpenTable] = useState(false);
   const tableRef = useOutsideClick(() => setOpenTable((isOpen) => !isOpen));
   const [openMenu, setOpenMenu] = useState(false);
   const ref = useOutsideClick(() => setOpenMenu((isOpen) => !isOpen), false);

   // - Headings
   const [headings, setHeadings] = useState([]);
   const [activeId, setActiveId] = useState();

   useEffect(() => {
      const headingElementsRaw = Array.from(
         document.querySelectorAll('h1, h2, h3')
      );

      const headingElements = headingElementsRaw.map((item, i) => {
         item.id = i;
         return item;
      });

      const finalHeadings = headingElements.slice(2);

      setHeadings(finalHeadings);
   }, []);

   useIntersectionObserver(setActiveId, activeId);

   const isBellowMd = useMediaQuery({ maxWidth: 768 });

   return (
      <>
         <div className="absolute top-[-140px] left-0" ref={topRef} />
         <div className="absolute bottom-0 left-0" ref={bottomRef} />

         <IoOptions
            className={`fixed bottom-13 xl:bottom-11 lg:bottom-11.5 md:bottom-9 right-24 lg:right-15 md:right-9 size-16 md:size-20.5 bg-white/50 lg:bg-white dark:bg-transparent backdrop-blur-3xl lg:dark:bg-primary/40 md:dark:bg-primary-200/80 cursor-pointer border border-quaternary dark:border-primary-300/35 md:dark:border-primary-300/25 p-3.5 md:p-4.5 rounded-full box-shadow md:shadow-menu transition-bg_border z-20 ${
               !isBellowMd
                  ? 'hover:bg-primary-100 dark:hover:bg-primary-400/10'
                  : ''
            } ${
               openTable
                  ? 'md:dark:shadow-none lg:dark:bg-primary/90!'
                  : 'md:dark:shadow-menu-dark'
            }`}
            onClick={(e) => {
               e.stopPropagation();
               setOpenMenu((isOpen) => !isOpen);
            }}
         />

         <AnimatePresence>
            {openMenu && (
               <motion.ul
                  className={`fixed bottom-32 xl:bottom-30 lg:bottom-30.5 md:bottom-33 right-24 lg:right-15 md:right-9 px-1 md:px-2 flex flex-col items-center bg-white/50 lg:bg-white dark:bg-transparent lg:dark:bg-primary/40 md:dark:bg-primary-200/80 backdrop-blur-3xl border border-quaternary dark:border-primary-300/35 md:dark:border-primary-300/25 rounded-3xl transition [&_svg]:cursor-pointer box-shadow md:shadow-menu transition-border z-20 ${
                     openTable
                        ? 'md:dark:shadow-none lg:dark:bg-primary/90!'
                        : 'md:dark:shadow-menu-dark'
                  }`}
                  ref={ref}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.06 }}
               >
                  <FiChevronUp
                     className="py-3 size-13.5 md:size-16 stroke-[1.8px] md:stroke-[1.6px] hover:bg-primary-200/40 dark:bg-transparent dark:hover:bg-primary-400/10 rounded-t-[20px] mt-1 rounded-2xl transition-bg"
                     onClick={() => {
                        setTopScroll(true);
                        setOpenTable(false);
                        setOpenMenu(false);
                     }}
                  />

                  <RxChatBubble
                     className="py-3.5 px-[16px] xl:px-3 xs:px-4 size-[54px] xl:size-13.5 lg:size-13 md:size-14.5 sm:size-15 xs:size-15 hover:bg-primary-200/40 dark:bg-transparent dark:hover:bg-primary-400/10 rounded-2xl transition-bg mt-0.5"
                     onClick={(e) => {
                        e.preventDefault();
                        document
                           .querySelector('.comment-section')
                           .scrollIntoView({
                              behavior: 'smooth',
                           });

                        setOpenTable(false);
                        setOpenMenu(false);
                     }}
                  />

                  {headings.length ? (
                     <LuTableOfContents
                        className="py-1 px-3.5 size-13.5 md:size-15 hover:bg-primary-200/40 dark:bg-transparent dark:hover:bg-primary-400/10 transition-bg rounded-2xl mt-0.5"
                        onClick={(e) => {
                           e.stopPropagation();
                           setOpenTable((isOpen) => !isOpen);
                        }}
                     />
                  ) : null}

                  <button
                     className="relative hover:bg-primary-200/40 dark:bg-transparent dark:hover:bg-primary-400/10 transition-bg transition-bg mt-0.5 md:mt-1.5 mb-0.5 md:mb-2 rounded-2xl"
                     onClick={(e) => {
                        e.stopPropagation();
                        setTheme(theme === 'light' ? 'dark' : 'light');
                     }}
                  >
                     {theme === 'dark' ? (
                        <IoMoonOutline className="py-1 px-3.5 size-13.5 md:size-15" />
                     ) : (
                        <LuSunMedium className="py-1 px-3.5 size-13.5 md:size-15" />
                     )}
                  </button>

                  <AnimatePresence>
                     {openTable && (
                        <motion.div
                           className="absolute bottom-0 font-headers max-h-[32.5rem] md:max-h-[37rem] xs:max-h-[41rem] short:max-h-[60rem] shorter:max-h-[16.5rem] right-20 md:right-24.5 flex flex-col py-4 pb-2 xs:pb-4 px-2 md:px-2.5 border border-primary-300/50 lg:border-primary-300/80 dark:border-tertiary lg:dark:border-primary-300/35 rounded-2xl xs:rounded-3xl bg-primary/80 xl:bg-white lg:bg-white dark:bg-transparent xl:dark:bg-primary lg:dark:bg-primary/90 backdrop-blur-3xl overflow-y-auto scrollbar shadow-article xl:shadow-none md:shadow-menu dark:shadow-none md:dark:shadow-none md:text-2xl"
                           ref={tableRef}
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           transition={{ duration: 0.06 }}
                        >
                           <span className="pb-3 mb-2 mx-6 md:mx-8 md:pt-0.5 border-b border-b-primary-400/25 text-primary-400 select-none">
                              {t('toc')}
                           </span>

                           {headings.map((item) => (
                              <a
                                 className={`w-[19rem] md:w-[22rem] sm:w-[23rem] leading-7 py-1.5 lg:py-1.5 md:py-2 hover:text-accent! transition duration-75 px-6 md:px-8 mb-[4.5px] xs:mb-0.5 hover:bg-primary-300/10 dark:hover:bg-primary-300/8 lg:leading-7 md:leading-9 xs:leading-7.5 rounded-xl sm:font-semibold xs:font-medium ${
                                    item.localName === 'h3' &&
                                    'sm:font-medium! xs:font-normal! pl-12 md:pl-14 text-primary-500/90 dark:text-primary-500/80'
                                 } ${item.localName} ${
                                    item.id === activeId &&
                                    'text-accent! bg-primary-300/10 dark:bg-primary-300/8'
                                 }`}
                                 href={`#${item.id}`}
                                 key={item.id}
                                 onClick={(e) => {
                                    e.preventDefault();
                                    document
                                       .getElementById(`${item.id}`)
                                       .scrollIntoView({
                                          behavior: 'smooth',
                                       });

                                    setOpenTable(false);
                                    setOpenMenu(false);
                                 }}
                              >
                                 {item.innerText}
                              </a>
                           ))}
                        </motion.div>
                     )}

                     <FiChevronDown
                        className="py-3 size-13.5 stroke-[1.8px] hover:bg-primary-200/40 dark:bg-transparent dark:hover:bg-primary-400/10 rounded-b-[20px] mb-1 mt-0.5 rounded-2xl"
                        onClick={() => {
                           setBottomScroll(true);
                           setOpenTable(false);
                           setOpenMenu(false);
                        }}
                     />
                  </AnimatePresence>
               </motion.ul>
            )}
         </AnimatePresence>

         <span
            className={`fixed top-0 left-0 h-screen w-full z-10 dark:bg-[#41455334] backdrop-blur-2xl transition-opacity  hidden lg:block ${
               openTable
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none'
            }`}
         />
      </>
   );
}

export default Options;
