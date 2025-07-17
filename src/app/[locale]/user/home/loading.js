'use client';

import { motion } from 'motion/react';

function Loading() {
   return (
      <motion.div className="flex md:flex-col gap-4 animate-skeleton">
         <div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
         >
            <div className="w-[494px] xl:w-[346px] lg:w-[342px] md:w-full h-[24.5rem] xl:h-[22.5rem] lg:h-[20.5rem] md:h-[310px] xs:h-[208px] 2xs:h-[166px] self-start rounded-3xl bg-primary-300/70 px-28 py-20" />
            <div className="w-42 md:w-full h-22 self-start px-8 py-4 pb-5 rounded-3xl bg-primary-300/40" />
         </div>

         <div className="space-y-4">
            <div className="flex xl:flex-wrap gap-4">
               <div className="w-40 h-24 self-start px-8 py-4 pb-5 rounded-3xl bg-primary-300/40" />
               <div className="w-48 h-24 self-start px-8 py-4 pb-5 rounded-3xl bg-primary-300/40" />
            </div>

            <div className="w-50 h-24 self-start px-8 py-4 pb-5 rounded-3xl bg-primary-300/40" />
         </div>
      </motion.div>
   );
}

export default Loading;
