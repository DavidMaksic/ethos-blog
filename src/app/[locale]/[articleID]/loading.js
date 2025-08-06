'use client';

import { motion } from 'motion/react';

function Loading() {
   return (
      <motion.div
         className="relative flex flex-col justify-self-center w-[52rem] 2xl:w-[46rem] lg:w-[44rem] md:w-full space-y-7 2xl:space-y-13 lg:space-y-15 sm:space-y-7 py-2 md:pt-0 [&_div]:rounded-full animate-skeleton transition-200"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.3 }}
      >
         <span className="absolute inset-0 m-0 bg-gradient-to-t from-primary-100 dark:from-primary-50 lg:dark:from-transparent" />

         <div className="flex flex-col gap-8 md:mt-7">
            <div className="h-28 sm:h-20 lg:h-26.5 bg-primary-400/15 dark:bg-primary-400/15 !rounded-4xl w-5/6 md:w-10/12 self-center" />
            <div className="h-8 bg-skeleton dark:bg-primary-300/15 w-2/3 self-center" />
         </div>

         <div className="flex h-[29rem] 2xl:h-[25.5rem] lg:h-[25rem] md:h-[26rem] sm:h-[21.5rem] justify-center bg-primary-300/80 dark:bg-primary-400/20 !rounded-4xl" />

         <div className="flex flex-col gap-3 mt-6 [&_div]:rounded-xl!">
            <div className="h-8 bg-primary-300 dark:bg-primary-400/50" />
            <div className="h-8 bg-primary-300 dark:bg-primary-400/45" />
            <div className="h-8 bg-primary-300 dark:bg-primary-400/40" />

            <div className="h-8 bg-transparent" />

            <div className="h-8 bg-primary-300 dark:bg-primary-400/35" />
            <div className="h-8 bg-primary-300 dark:bg-primary-400/30" />
            <div className="h-8 bg-primary-300 dark:bg-primary-400/25" />
            <div className="h-8 bg-primary-300 dark:bg-primary-400/20" />

            <div className="h-8 bg-transparent" />

            <div className="h-8 bg-primary-300 dark:bg-primary-400/15" />
            <div className="h-8 bg-primary-300 dark:bg-primary-400/10" />
            <div className="h-8 bg-primary-300 dark:bg-primary-400/5" />
         </div>
      </motion.div>
   );
}

export default Loading;
