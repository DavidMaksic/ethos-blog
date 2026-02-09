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
   isActive,
   activeStyle,
   isMobile,
   children,
}) {
   const { language } = useLanguage();
   const pathname = usePathname();
   const router = useRouter();
   const searchParams = useSearchParams();
   const paramLang = searchParams.get('lang');
   const active = isMobile && lang === language.code;

   function handleLang() {
      if (isMobile) {
         const mobileLangCode =
            LANGUAGES.find((item) => item.code === lang)?.code || 'en';
         return switchLocale(mobileLangCode);
      }

      if (paramLang === lang) return;
      const params = new URLSearchParams(searchParams);

      const langCode =
         LANGUAGES.find((item) => item.code === lang)?.code || 'en';

      if (pathname.startsWith('/archive')) {
         params.set('lang', langCode);
         router.push(`?${params.toString()}`, { scroll: false });
      }

      params.delete('category');
      params.delete('sort');
      router.push(`?${params.toString()}`, { scroll: false });
   }

   return (
      <div
         className={`flex items-center gap-2 py-0.5 px-2.5 rounded-xl transition-bg_color cursor-pointer group relative z-10 ${
            isActive && 'text-accent-800 dark:text-accent-100'
         } ${activeStyle} ${
            active &&
            'bg-accent/20 dark:bg-accent-300/50 rounded-xl text-accent-800 dark:text-accent-100 2xs:py-1'
         }`}
         onClick={handleLang}
         role="button"
      >
         <div className={`relative size-7 2xs:size-8 ${imageStyle}`}>
            <Image
               className="border border-primary-300 dark:border-primary-300/50 rounded-full opacity-90 dark:opacity-80"
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
