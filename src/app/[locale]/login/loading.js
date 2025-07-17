'use client';

import { motion } from 'motion/react';

function Loading() {
   return (
      <motion.div
         className="flex justify-center h-[48rem] md:h-[50rem] sm:h-[54rem] animate-skeleton"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.3 }}
      >
         <div className="h-[15rem] sm:h-[15.5rem] w-[26rem] xl:w-[27rem] md:w-[29rem] sm:w-[30.5rem] self-start rounded-2xl bg-primary-300/70 px-28 py-20 mt-[11rem] md:mt-[14rem] sm:mt-[16rem]" />
      </motion.div>
   );
}

export default Loading;
