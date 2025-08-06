'use client';

import { motion } from 'motion/react';

function Loading() {
   return (
      <motion.div
         className="relative grid grid-cols-10 items-center gap-y-8 lg:gap-y-6 md:gap-y-6 gap-x-8 2xl:gap-x-6 animate-skeleton 2xl:mt-4 py-4"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.3 }}
      >
         <div className="bg-primary-300/40 md:col-span-full col-span-6 h-74 2xl:h-80 lg:h-77 md:h-80.5 sm:h-89 xs:h-[26rem] p-10 px-14 rounded-2xl" />
         <div className="bg-primary-300/80 col-span-4 md:col-span-7 sm:col-span-8 h-74 2xl:h-80 lg:h-77 md:h-65 sm:h-64 xs:h-72.5 p-10 px-14 rounded-2xl" />

         <div className="col-span-5 md:col-span-full h-[28rem] lg:h-[30rem] md:h-[29rem] sm:h-[31.5rem] bg-primary-300/40 p-10 px-14 rounded-2xl" />
         <div className="col-span-5 md:col-span-full h-[28rem] lg:h-[30rem] md:h-[29rem] sm:h-[31.5rem] bg-primary-300/80 p-10 px-14 rounded-2xl" />
      </motion.div>
   );
}

export default Loading;
