'use client';

import { switchLocale } from '@/src/utils/helpers';
import { useLanguage } from '@/src/context/language-context';
import { LANGUAGES } from '@/src/utils/config';

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import RemoteProfileImage from '@/src/ui/image/remote-profile-image';
import Image from 'next/image';

function LanguageButton() {
   const { language } = useLanguage();

   function handleLang(item) {
      if (item.code === language.code) return;
      switchLocale(item.code);
   }

   return (
      <DropdownMenu modal={false}>
         <DropdownMenuTrigger
            aria-label="Change language"
            className="md:hidden block bg-none border-none p-2 rounded-xl transition-200 hover:bg-primary-200/40 dark:hover:bg-primary-300/30 cursor-pointer select-none outline-none"
         >
            <div className="relative size-7 rounded-full border border-primary-300 dark:border-primary-300/50">
               <RemoteProfileImage
                  imageUrl={language.flag}
                  alt="Language flag"
                  styles="rounded-full transition-[opacity]! duration-300!"
                  opacity="opacity-80 dark:opacity-70"
                  unoptimized
                  preload
               />
            </div>
         </DropdownMenuTrigger>

         <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-auto min-w-36 ring-0 border border-quaternary dark:border-primary-300/25 bg-white dark:bg-primary-300/20 backdrop-blur-2xl transition-bg_border"
         >
            {LANGUAGES.map((item) => (
               <DropdownMenuItem
                  key={item.code}
                  onSelect={() => handleLang(item)}
                  className="group justify-between py-2 pl-4 pr-3.5 text-[1.35rem] font-medium hover:text-text!"
               >
                  {item.lang}
                  <div className="relative size-6 shrink-0">
                     <Image
                        className="border border-primary-300 dark:border-primary-300/50 rounded-full opacity-80 group-hover:opacity-100 dark:group-hover:opacity-80 transition-opacity duration-200"
                        src={item.flag}
                        alt={item.lang}
                        unoptimized
                        preload
                        fill
                     />
                  </div>
               </DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
}

export default LanguageButton;
