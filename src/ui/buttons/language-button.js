import { AnimatePresence, motion } from 'motion/react';
import { useOutsideClick } from '@/src/hooks/use-outside-click';
import { switchLocale } from '@/src/utils/helpers';
import { useLanguage } from '@/src/context/language-context';
import { LANGUAGES } from '@/src/utils/config';
import { useState } from 'react';

import RemoteImage from '@/src/ui/image/remote-image';
import Image from 'next/image';

function LanguageButton() {
   const [open, setOpen] = useState(false);
   const [loaded, setLoaded] = useState(false);

   const { language } = useLanguage();
   const ref = useOutsideClick(() => setOpen(false), false);

   function handleLang(item) {
      if (item.code === language.code) return;

      const langCode =
         LANGUAGES.find((lang) => lang.code === item.code).code || 'en';
      switchLocale(langCode);
   }

   return (
      <div
         className="md:hidden bg-none border-none p-2 rounded-xl transition-200 hover:bg-primary-200/40 dark:hover:bg-primary-300/30 [&_svg]:size-6 [&_svg]:text-accent cursor-pointer select-none"
         role="button"
         onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            setOpen((isOpen) => !isOpen);
         }}
      >
         <div className="relative size-7 sm:size-[2.05rem]! rounded-full border border-primary-300 dark:border-primary-300/50">
            <RemoteImage
               imageUrl={language.flag}
               alt="Language flag"
               styles="rounded-full transition-[opacity]! duration-200!"
               opacity="opacity-80 dark:opacity-70"
               unoptimized
               priority
            />
         </div>

         <AnimatePresence>
            {open && (
               <motion.ul
                  className="absolute xl:right-8 z-30 space-y-1 p-1 mt-3 min-w-[10rem] md:min-w-[12rem] text-2xl md:text-3xl rounded-2xl bg-white dark:bg-primary-300/20 backdrop-blur-2xl border border-quaternary dark:border-primary-300/25 shadow-lg overflow-auto cursor-pointer transition-bg_border"
                  ref={ref}
                  onClick={(e) => {
                     e.stopPropagation();
                     setOpen(false);
                  }}
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{
                     type: 'spring',
                     stiffness: 500,
                     damping: 30,
                     duration: 0.12,
                  }}
               >
                  {LANGUAGES.map((item) => (
                     <li
                        className="flex justify-between items-center relative font-normal rounded-xl py-2 pr-4 pl-5  dark:text-primary-500 hover:bg-primary-100/50 dark:hover:bg-primary-300/18 duration-75 [&_img]:opacity-80 group"
                        key={item.code}
                        onClick={(e) => {
                           e.stopPropagation();
                           setOpen(false);
                           handleLang(item);
                        }}
                     >
                        {item.lang}
                        <div className="relative size-7">
                           <Image
                              className={`border border-primary-300 dark:border-primary-300/50 rounded-full group-hover:opacity-100 dark:group-hover:opacity-95 transition-[opacity] duration-200 ${
                                 loaded ? 'opacity-100' : 'opacity-0'
                              }`}
                              src={item.flag}
                              alt={item.lang}
                              onLoad={() => setLoaded(true)}
                              unoptimized
                              priority
                              fill
                           />
                        </div>
                     </li>
                  ))}
               </motion.ul>
            )}
         </AnimatePresence>
      </div>
   );
}

export default LanguageButton;
