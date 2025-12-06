'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/src/context/language-context';
import { usePathname } from '@/src/i18n/navigation';
import { LANGUAGES } from '@/src/utils/config';

import RemoteImage from '@/src/ui/remote-image';
import srbFlag from '@/public/srb-flag.png';
import enFlag from '@/public/en-flag.png';

function FilterButton({
   lang,
   param,
   styles,
   imageStyle,
   activeStyle,
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

      // if (isMobile) {
      //    const mobileLangCode =
      //       LANGUAGES.find((item) => item.code === lang)?.code || 'en';
      //    return switchLocale(mobileLangCode);
      // }

      params.delete('category');
      router.replace(`?${params.toString()}`, { scroll: false });
   }

   return (
      <button
         className={`hover:bg-accent/20 flex items-center gap-2 dark:hover:bg-accent-300/50 hover:text-accent-800 dark:hover:text-accent-100 py-0.5 px-2.5 rounded-xl  transition-bg_color cursor-pointer group ${activeStyle} ${
            active &&
            'bg-accent/20 dark:bg-accent-300/50 text-accent-800 dark:text-accent-100 2xs:py-1'
         }`}
         onClick={handleLang}
      >
         <div className={`relative size-6 2xs:size-8 ${imageStyle}`}>
            <RemoteImage
               styles={`border border-accent-800/80 group-hover:border-accent-800/80! rounded-full opacity-90 ${
                  active && 'border-accent-800/80'
               }`}
               imageUrl={lang === 'sr' ? srbFlag : enFlag}
               alt="Language image"
            />
         </div>

         <p className={`md:text-2xl 2xs:text-[1.65rem] ${styles}`}>
            {children}
         </p>
      </button>
   );
}

export default FilterButton;
