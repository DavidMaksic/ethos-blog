import { AnimatePresence, motion } from 'motion/react';
import { useOutsideClick } from '@/src/hooks/use-outside-click';
import { switchLocale } from '@/src/utils/helpers';
import { useLanguage } from '@/src/context/language-context';
import { LANG_CODES } from '@/src/utils/config';
import { useState } from 'react';

import srbFlag from '@/public/srb-flag.png';
import enFlag from '@/public/en-flag.png';
import Image from 'next/image';

const languages = [
   {
      lang: 'Српски',
      code: 'sr',
      flag: srbFlag,
   },
   {
      lang: 'English',
      code: 'en',
      flag: enFlag,
   },
];

function LanguageButton() {
   const { language, setLanguage } = useLanguage();
   const [open, setOpen] = useState(false);
   const ref = useOutsideClick(() => setOpen((isOpen) => !isOpen), false);

   function handleLang(item) {
      if (item.code === language.code) return;

      setLanguage({
         language: item.code,
         flag: item.flag,
      });

      const langCode = LANG_CODES[item.lang] || 'en';
      switchLocale(langCode);
   }

   return (
      <>
         <div
            className="relative size-7 sm:size-[2.05rem]! rounded-full border border-primary-300 transition-200"
            onClick={() => setOpen((isOpen) => !isOpen)}
         >
            <Image
               className="opacity-80 dark:opacity-70 transition-[opacity]"
               src={language.flag ? language.flag : srbFlag}
               priority={true}
               alt="Serbian flag"
               unoptimized
               fill
            />
         </div>

         <AnimatePresence>
            {open && (
               <motion.ul
                  className="absolute xl:right-8 z-10 space-y-1 p-1 mt-3 min-w-[10rem] md:min-w-[12rem] text-2xl md:text-3xl rounded-2xl bg-white dark:bg-primary-300/20 backdrop-blur-2xl border border-quaternary dark:border-primary-300/25 shadow-lg overflow-auto cursor-pointer transition-bg_border"
                  ref={ref}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.06 }}
               >
                  {languages.map((item) => (
                     <li
                        className="flex justify-between items-center relative font-normal rounded-xl py-2 pr-4 pl-5  dark:text-primary-500 hover:bg-primary-100/50 dark:hover:bg-primary-300/18 duration-75 [&_img]:opacity-80 dark:[&_img]:opacity-80 group"
                        key={item.code}
                        onClick={() => handleLang(item)}
                     >
                        {item.lang}
                        <div className="relative size-7">
                           <Image
                              className="border border-primary-300 dark:border-primary-200 rounded-full group-hover:opacity-100 dark:group-hover:opacity-95 transition-[opacity]"
                              priority={true}
                              src={item.flag}
                              alt={item.lang}
                              unoptimized
                              fill
                           />
                        </div>
                     </li>
                  ))}
               </motion.ul>
            )}
         </AnimatePresence>
      </>
   );
}

export default LanguageButton;
