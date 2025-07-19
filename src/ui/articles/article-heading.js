'use client';

import { Cormorant_SC } from 'next/font/google';
import { motion } from 'motion/react';

const cormorantSC = Cormorant_SC({
   subsets: ['latin'],
   display: 'swap',
   weight: ['300', '400', '500', '600', '700'],
});

function ArticleHeading({ article }) {
   return (
      <motion.div
         className="flex flex-col gap-2 xs:gap-1 text-center"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.3 }}
      >
         <h2
            className={`relative styled_text font-normal! md:font-medium! sm:font-semibold! text-6xl xl:text-[3.4rem] md:text-6xl sm:text-5xl sm:leading-13 xs:leading-12 pb-2 bg-gradient-to-r from-gray-600 to-gray-500/90 dark:from-slate-300 dark:to-slate-300/80 ${cormorantSC.className}`}
         >
            {article.title}
         </h2>
         <h3 className="font-creator font-medium! text-2xl xl:text-[1.4rem] xs:text-[1.45rem] text-primary-500/80 w-5/6 self-center">
            {article.description}
         </h3>
      </motion.div>
   );
}

export default ArticleHeading;
