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
import { FaRegComment } from 'react-icons/fa6';
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
   const tableRef = useOutsideClick(() => setOpenTable(false), false);
   const [openMenu, setOpenMenu] = useState(false);
   const ref = useOutsideClick(() => setOpenMenu(false), false);

   // - Headings
   const [headings, setHeadings] = useState([]);
   const [activeId, setActiveId] = useState();

   useEffect(() => {
      const headingElementsRaw = Array.from(
         document.querySelectorAll('h2, h3')
      ).slice(1);

      const headingElements = headingElementsRaw.map((item, index) => {
         const slug = item.innerText
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '');

         const id = `${slug}-${index}`;
         item.setAttribute('id', id);

         return {
            id,
            innerText: item.innerText,
            localName: item.localName,
         };
      });

      setHeadings(headingElements);
   }, []);

   useIntersectionObserver(setActiveId, activeId);
   const isBellowMd = useMediaQuery({ maxWidth: 768 });

   return (
      <>
         <div className="absolute top-[-12rem] left-0" ref={topRef} />
         <div className="absolute bottom-0 left-0" ref={bottomRef} />

         <IoOptions
            className={`fixed bottom-13 2xl:bottom-11 lg:bottom-11.5 md:bottom-9 right-24 lg:right-15 md:right-9 size-16 md:size-20.5 bg-white dark:bg-transparent lg:dark:bg-primary/40 md:dark:bg-primary-200/80 backdrop-blur-3xl border border-quaternary dark:border-primary-300/35 md:dark:border-primary-300/25 p-3.5 md:p-4.5 rounded-full box-shadow md:shadow-menu transition-bg_border cursor-pointer z-20 ${
               !isBellowMd
                  ? 'hover:bg-white/20 dark:hover:bg-primary-400/10'
                  : ''
            } ${
               openTable
                  ? 'md:dark:shadow-none lg:dark:bg-primary/90!'
                  : 'md:dark:shadow-menu-dark'
            }`}
            onClick={(e) => {
               e.stopPropagation();
               e.nativeEvent.stopImmediatePropagation();
               setOpenMenu((isOpen) => {
                  if (isOpen) setOpenTable(false);
                  return !isOpen;
               });
            }}
         />

         <AnimatePresence>
            {openMenu && (
               <motion.ul
                  className={`fixed bottom-32 2xl:bottom-30 lg:bottom-30.5 md:bottom-33 right-24 lg:right-15 md:right-9 px-1 md:px-2 flex flex-col items-center bg-white lg:bg-white dark:bg-transparent lg:dark:bg-primary/40 md:dark:bg-primary-200/80 backdrop-blur-3xl border border-quaternary dark:border-primary-300/35 md:dark:border-primary-300/25 rounded-3xl [&_svg]:cursor-pointer box-shadow md:shadow-menu will-change-transform z-20 ${
                     openTable
                        ? 'md:dark:shadow-none lg:dark:bg-primary/90!'
                        : 'md:dark:shadow-menu-dark'
                  }`}
                  ref={ref}
                  key="options-menu"
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 3 }}
                  transition={{ duration: 0.12 }}
               >
                  <FiChevronUp
                     className="py-3 size-13.5 md:size-16 stroke-[1.8px] md:stroke-[1.6px] hover:bg-primary-100/80 dark:bg-transparent dark:hover:bg-primary-400/10 rounded-t-[20px] mt-1 rounded-2xl transition-bg"
                     onClick={() => {
                        setTopScroll(true);
                        setOpenTable(false);
                        setOpenMenu(false);
                     }}
                  />

                  <FaRegComment
                     className="py-3.5 px-[15.5px] 2xl:px-4 xs:px-4 size-[52px] 2xl:size-13.5 lg:size-13.5 md:size-15 sm:size-15 xs:size-15 text-primary-500 dark:text-gray-400/90 hover:bg-primary-100/80 dark:bg-transparent dark:hover:bg-primary-400/10 rounded-2xl transition-bg mb-1"
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
                        className="py-1 px-3.5 size-13.5 md:size-15 hover:bg-primary-100/80 dark:bg-transparent dark:hover:bg-primary-400/10 transition-bg rounded-2xl mt-0.5"
                        onClick={(e) => {
                           e.stopPropagation();
                           e.nativeEvent.stopImmediatePropagation();
                           setOpenTable((isOpen) => !isOpen);
                        }}
                     />
                  ) : null}

                  <button
                     className="relative hover:bg-primary-100/80 dark:bg-transparent dark:hover:bg-primary-400/10 transition-bg transition-bg mt-0.5 md:mt-1.5 mb-0.5 md:mb-2 rounded-2xl"
                     onClick={(e) => {
                        e.stopPropagation();
                        e.nativeEvent.stopImmediatePropagation();
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
                           className="absolute bottom-0 font-secondary max-h-[32rem] md:max-h-[37rem] xs:max-h-[41rem] short:max-h-[60rem] shorter:max-h-[16.5rem] right-20 md:right-24.5 flex flex-col py-4 pb-2 xs:pb-4 px-2 md:px-2.5 border border-primary-300/50 lg:border-primary-300/80 dark:border-primary-300/35 lg:dark:border-primary-300/35 rounded-2xl xs:rounded-3xl bg-white dark:bg-transparent 2xl:dark:bg-primary lg:dark:bg-primary/90 backdrop-blur-3xl overflow-y-auto scrollbar shadow-dashboard 2xl:shadow-none md:shadow-menu dark:shadow-none md:dark:shadow-none md:text-2xl will-change-transform"
                           ref={tableRef}
                           key="table-of-contents"
                           initial={{ opacity: 0, x: 8, scale: 0.97 }}
                           animate={{ opacity: 1, x: 0, scale: 1 }}
                           exit={{ opacity: 0, x: 8, scale: 0.97 }}
                           transition={{
                              type: 'spring',
                              stiffness: 500,
                              damping: 30,
                              duration: 0.12,
                           }}
                        >
                           <span className="pb-3 mb-2 mx-6 md:mx-8 md:pt-0.5 border-b border-b-primary-400/25 text-primary-400 select-none">
                              {t('toc')}
                           </span>

                           {headings.map((item) => (
                              <a
                                 className={`w-[19rem] md:w-[22rem] sm:w-[23rem] py-2 md:py-2.5 hover:text-accent! transition duration-75 px-6 md:px-8 mb-[3px] xs:mb-0.5 hover:bg-primary-300/10 dark:hover:bg-primary-300/8 leading-6.5 md:leading-7 xs:leading-7.5 rounded-xl sm:font-semibold xs:font-medium ${
                                    item.localName === 'h2' &&
                                    'text-primary-600 dark:text-slate-300/80'
                                 } ${
                                    item.localName === 'h3' &&
                                    'sm:font-medium! xs:font-normal! pl-12 md:pl-14 text-primary-500/90 dark:text-primary-500/80'
                                 } ${item.localName} ${
                                    item.id === activeId &&
                                    'text-accent! bg-primary-300/10 dark:bg-primary-300/8'
                                 }`}
                                 href={`#${item.id}`}
                                 key={
                                    item.id ||
                                    `${item.localName}-${Math.random()}`
                                 }
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
                        className="py-3 size-13.5 md:size-16 stroke-[1.8px] md:stroke-[1.6px] hover:bg-primary-100/80 dark:bg-transparent dark:hover:bg-primary-400/10 rounded-b-[20px] mt-0.5 mb-1 rounded-2xl transition-bg"
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
