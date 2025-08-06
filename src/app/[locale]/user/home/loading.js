'use client';

import { motion } from 'motion/react';

function Loading() {
   return (
      <motion.div
         className="flex md:flex-col gap-4 animate-skeleton"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.3 }}
      >
         <div className="space-y-4">
            <div className="2k:w-[31rem] w-[460px] 2xl:w-[400px] lg:w-[342px] md:w-full h-[24.5rem] 2xl:h-[25.5rem] lg:h-[20.5rem] md:h-[310px] xs:h-[250px] 2xs:h-[217px] self-start rounded-3xl bg-primary-300/50 px-28 py-20" />
            <div className="w-42 md:w-full h-22 xs:h-23 self-start px-8 py-4 pb-5 rounded-3xl bg-primary-300/40" />
         </div>

         <div className="space-y-4">
            <div className="flex 2xl:flex-wrap gap-4">
               <div className="w-48 h-24 self-start px-8 py-4 pb-5 rounded-3xl bg-primary-300/40" />
               <div className="w-52 h-24 self-start px-8 py-4 pb-5 rounded-3xl bg-primary-300/40" />
            </div>

            <div className="w-50 h-24 self-start px-8 py-4 pb-5 rounded-3xl bg-primary-300/40" />
         </div>
      </motion.div>
   );
}

export default Loading;
