import {
   Cormorant_SC,
   Parisienne,
   Cormorant_Garamond,
   Great_Vibes,
} from 'next/font/google';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Link } from '@/src/i18n/navigation';
import RemoteImage from '@/src/ui/remote-image';

const cormorantSC = Cormorant_SC({
   subsets: ['latin'],
   display: 'swap',
   weight: ['300', '400', '500', '600', '700'],
});

const cormorantGaramond = Cormorant_Garamond({
   subsets: ['latin'],
   display: 'swap',
   weight: ['300', '400', '500', '600', '700'],
});

const parisienne = Parisienne({
   subsets: ['latin'],
   display: 'swap',
   weight: ['400'],
});

const greatVibes = Great_Vibes({
   subsets: ['cyrillic'],
   display: 'swap',
   weight: ['400'],
});

function MainArticle({ article }) {
   const t = useTranslations('HomePage');
   const locale = useLocale();

   return (
      <motion.div
         className={`grid grid-cols-2 md:flex! md:flex-col! gap-10 md:gap-4 mt-24 xl:mt-22 lg:mt-24 sm:mt-14 mb-38 xl:mb-33 sm:mb-20 ${cormorantSC.className}`}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.3 }}
      >
         <div className="space-y-2 md:space-y-3 self-center flex flex-col  md:items-center md:order-2 md:w-full md:px-10 md:bg-white md:dark:bg-primary-300/15 md:py-6 md:pb-7 md:rounded-3xl md:box-shadow md:border md:border-quaternary md:dark:border-primary-300/15">
            <h2 className="relative md:text-center md:font-semibold styled_text text-6xl xl:text-[3.5rem] lg:text-[2.8rem] md:text-[2.8rem] xs:leading-12 pb-2 lg:pb-0 bg-gradient-to-r from-gray-600 to-gray-500/90 dark:from-slate-300 dark:to-slate-300/80 select-none leading-16 lg:leading-13">
               {article.title}
            </h2>
            <h3
               className={`text-[1.6rem] lg:text-[1.2rem] md:text-[1.4rem] text-primary-400 ${cormorantGaramond.className} select-none md:text-center`}
            >
               {article.description}
            </h3>

            <Link
               href={`/${article.id}`}
               aria-label="Article link"
               className="self-start md:self-center mt-7 lg:mt-4 md:mt-5 rounded-full bg-gradient-to-r from-accent-300/80 to-accent-600/70 hover:from-white hover:to-white dark:hover:from-primary dark:hover:to-primary border-2 border-transparent hover:border-accent/80 shadow-btn hover:shadow-none dark:shadow-none transition-[box-shadow,border,--tw-gradient-from,--tw-gradient-to] duration-300 bg-origin-border group"
            >
               <span
                  className={`flex articles-center gap-5 text-4xl xl:text-[2rem] lg:text-[1.8rem] pl-8 xl:pl-7 lg:pl-5 md:pl-6 pr-9 xl:pr-7.5 lg:pr-6 md:pr-6.5 py-3.5 lg:py-2.5 md:py-3 text-white group-hover:text-accent group-hover:drop-shadow-xs dark:group-hover:text-accent/90 transition-[color] duration-300 cursor-pointer ${
                     locale === 'en' && parisienne.className
                  } ${locale === 'sr-cyrl' && greatVibes.className}`}
               >
                  {t('read-btn')}
               </span>
            </Link>
         </div>

         <div className="relative md:order-1 h-[26rem] xl:h-[23rem] lg:h-[20rem]">
            <RemoteImage
               imageUrl={article.image}
               alt="Article image"
               styles="rounded-3xl object-cover opacity-90 dark:opacity-75 border border-primary-200"
            />
         </div>
      </motion.div>
   );
}

export default MainArticle;
