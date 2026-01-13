'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { switchLocale } from '@/src/utils/helpers';
import { useLanguage } from '@/src/context/language-context';
import { usePathname } from '@/src/i18n/navigation';
import { LANGUAGES } from '@/src/utils/config';

import srbFlag from '@/public/srb-flag.png';
import enFlag from '@/public/en-flag.png';
import Image from 'next/image';

function LanguageFilterButton({
   lang,
   styles,
   imageStyle,
   activeStyle,
   isMobile,
   children,
}) {
   const { language } = useLanguage();
   const pathname = usePathname();
   const router = useRouter();
   const searchParams = useSearchParams();
   const paramLang = searchParams.get('lang');

   const active = lang === paramLang || (!paramLang && lang === language.code);

   function handleLang() {
      if (paramLang === lang) return;
      const params = new URLSearchParams(searchParams);

      const langCode =
         LANGUAGES.find((item) => item.code === lang)?.code || 'en';

      if (pathname.startsWith('/archive')) {
         params.set('lang', langCode);
         router.replace(`?${params.toString()}`, { scroll: false });
      }

      if (isMobile) {
         const mobileLangCode =
            LANGUAGES.find((item) => item.code === lang)?.code || 'en';
         return switchLocale(mobileLangCode);
      }

      params.delete('category');
      params.delete('sort');
      router.replace(`?${params.toString()}`, { scroll: false });
   }

   return (
      <div
         className={`hover:bg-accent/20 flex items-center gap-2 dark:hover:bg-accent-300/50 hover:text-accent-800 dark:hover:text-accent-100 py-0.5 px-2.5 rounded-xl  transition-bg_color cursor-pointer group ${activeStyle} ${
            active &&
            'bg-accent/20 dark:bg-accent-300/50 text-accent-800 dark:text-accent-100 2xs:py-1'
         }`}
         onClick={handleLang}
         role="button"
      >
         <div className={`relative size-7 2xs:size-8 ${imageStyle}`}>
            <Image
               className="border border-primary-300 dark:border-primary-300/50 rounded-full opacity-90"
               src={lang === 'sr' ? srbFlag : enFlag}
               alt="Language image"
               unoptimized
               fill
            />
         </div>

         <p className={`text-2xl md:text-2xl 2xs:text-[1.65rem] ${styles}`}>
            {children}
         </p>
      </div>
   );
}

export default LanguageFilterButton;
