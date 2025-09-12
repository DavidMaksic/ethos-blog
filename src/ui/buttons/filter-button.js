'use client';

import { useSetParams } from '@/src/hooks/use-set-params';
import { useLanguage } from '@/src/context/language-context';
import { useRouter } from 'next/navigation';

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
   isMobile = false,
}) {
   const { language } = useLanguage();
   const handler = useSetParams();
   const router = useRouter();

   const langString = lang.charAt(0).toLowerCase() + lang.slice(1);

   const active =
      lang === param.lang?.charAt(0).toUpperCase() + param.lang?.slice(1) ||
      (param.lang === undefined && lang === language.language);

   function switchLocale(lang) {
      window.location.pathname = `/${lang}${window.location.pathname.replace(
         /^\/(en|sr)/,
         ''
      )}`;
   }

   return (
      <button
         className={`hover:bg-accent/20 flex items-center gap-2 dark:hover:bg-accent-300/50 hover:text-accent-800 dark:hover:text-accent-100 py-0.5 px-2.5 rounded-xl  transition-bg_color cursor-pointer group ${activeStyle} ${
            active &&
            'bg-accent/20 dark:bg-accent-300/50 text-accent-800 dark:text-accent-100 2xs:py-1'
         }`}
         onClick={() => {
            const params = new URLSearchParams(param);

            params.set('lang', langString);
            params.set('category', '');

            router.push(`?${params.toString()}`);

            if (isMobile) {
               handler('category', '');
               const language = lang === 'English' ? 'en' : 'sr';
               switchLocale(language);
            }
         }}
      >
         <div className={`relative size-6 2xs:size-8 ${imageStyle}`}>
            <RemoteImage
               styles={`opacity-90 border border-accent-800/80 group-hover:border-accent-800/80! rounded-full ${
                  active && 'border-accent-800/80'
               }`}
               imageUrl={lang === 'Српски' ? srbFlag : enFlag}
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
