import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Link } from '@/src/i18n/navigation';
import RemoteImage from '@/src/ui/remote-image';

function MainArticle({ article }) {
   const t = useTranslations('HomePage');
   const locale = useLocale();
   const [mounted, setMounted] = useState();

   useEffect(() => setMounted(true), []);

   return (
      <div className="grid grid-cols-2 md:flex! md:flex-col! gap-10 md:gap-4 mt-24 2xl:mt-22 lg:mt-24 sm:mt-14 xs:mt-10 mb-38 2xl:mb-33 sm:mb-20 overflow-visible">
         <div className="space-y-2 md:space-y-3 self-center flex flex-col  md:items-center md:order-2 md:w-full md:px-10 xs:px-8 md:bg-white md:dark:bg-primary-300/15 md:pt-8 md:pb-9 md:rounded-3xl md:box-shadow md:border md:border-quaternary md:shadow-dashboard md:dark:shadow-none md:dark:border-primary-300/15">
            <h2 className="relative md:text-center md:font-semibold styled_text font-title text-6xl 2xl:text-[3.3rem] lg:text-[3rem] md:text-[3rem] sm:text-[2.8rem] 2xl:leading-15.5 xs:leading-12.5 pb-2 2xl:pb-1 lg:pb-0 bg-gradient-to-r from-gray-600 to-gray-500/90 dark:from-slate-300 dark:to-slate-300/80 select-none leading-16 lg:leading-13">
               {article.title}
            </h2>
            <h3 className="text-[1.6rem] lg:text-[1.2rem] md:text-[1.4rem] text-primary-400 xs:w-11/12 2xs:w-10/11 select-none md:text-center">
               {article.description}
            </h3>

            <Link
               href={`/${article.slug}`}
               prefetch
               className="self-start md:self-center mt-7 2xl:mt-5 md:mt-5 xs:mt-3 rounded-full bg-gradient-to-r from-accent-300/80 to-accent-600/70 hover:from-transparent hover:to-transparent border-2 border-transparent hover:border-accent/80 shadow-btn hover:shadow-none dark:shadow-none transition-[box-shadow,border,--tw-gradient-from,--tw-gradient-to] duration-300 bg-origin-border group"
            >
               <span className="sr-only">{`Read more about ${article.title}`}</span>
               <span
                  className={`flex articles-center gap-5 text-4xl 2xl:text-[1.8rem] md:text-[2rem] sm:text-[1.8rem] xs:text-[1.9rem] pl-8 2xl:pl-5 md:pl-6 xs:pl-5 pr-9 2xl:pr-6 md:pr-6.5 xs:pr-6 py-3.5 2xl:py-3 lg:py-2.5 md:py-3.5 xs:py-2.5 text-white group-hover:text-accent group-hover:drop-shadow-xs dark:group-hover:text-accent/90 transition-[color] duration-300 cursor-pointer ${
                     locale === 'en' && 'font-logo'
                  } ${locale === 'sr' && 'font-logo-sr'}`}
               >
                  {t('read-btn')}
               </span>
            </Link>
         </div>

         {mounted && article ? (
            <div className="relative md:order-1 h-[26rem] 2xl:h-[23rem] lg:h-[20rem] xs:h-[20rem]">
               <RemoteImage
                  imageUrl={article.image}
                  alt="Article image"
                  styles="rounded-3xl object-cover border border-primary-200"
                  opacity="opacity-90 dark:opacity-75"
               />
            </div>
         ) : (
            <div className="md:order-1 h-[26rem] 2xl:h-[23rem] lg:h-[20rem] xs:h-[20rem] bg-primary-300/45 dark:bg-primary-300/18 rounded-3xl animate-skeleton" />
         )}
      </div>
   );
}

export default MainArticle;
