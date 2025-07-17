'use client';

import { motion } from 'motion/react';

function Loading() {
   return (
      <motion.div className="animate-skeleton flex flex-col xl:mt-3">
         <div
            className="mb-31 grid grid-cols-[2fr_1fr] md:grid-cols-1 gap-10 2xs:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
         >
            <div className="md:order-2 flex flex-col gap-9 lg:gap-7 md:gap-6 md:mt-2.5 sm:mt-5 2xs:mt-10">
               <div className="flex justify-between items-center">
                  <span className="h-9 md:h-11 w-[12rem] bg-primary-300/40 rounded-2xl" />
                  <span className="h-9 md:h-11 w-[8rem] xl:w-[10rem] bg-primary-300/40 rounded-2xl" />
               </div>

               <div className="relative space-y-6 lg:space-y-4 md:space-y-6 sm:space-y-5">
                  <div className="h-50 xl:h-55 lg:h-53 md:h-70 sm:h-48.5 bg-primary-300/40 rounded-3xl" />
                  <div className="h-50 xl:h-55 lg:h-53 md:h-70 sm:h-48.5 bg-primary-300/30 rounded-3xl" />
                  <div className="h-50 xl:h-55 lg:h-53 md:h-70 sm:h-48.5 bg-primary-300/20 rounded-3xl" />
                  <div className="h-50 xl:h-55 lg:h-53 md:h-70 sm:h-48.5 bg-primary-300/10 rounded-3xl" />
                  <div className="h-50 xl:h-55 lg:h-53 md:h-70 sm:h-48.5 bg-primary-300/5 rounded-3xl" />
               </div>
            </div>

            <div className="md:order-1 flex flex-col gap-9 lg:gap-7 md:gap-9 sm:gap-12 2xs:gap-14">
               <span className="self-start md:self-center h-9 md:h-10 w-[12rem] md:w-[13rem] bg-primary-300/40 rounded-2xl" />

               <div className="flex gap-4 lg:gap-3 flex-wrap md:justify-center">
                  <span className="h-[42px] xl:h-10.5 lg:h-10 md:h-13 sm:h-12 w-30 bg-primary-300 rounded-full" />
                  <span className="h-[42px] xl:h-10.5 lg:h-10 md:h-13 sm:h-12 w-24 bg-primary-300 rounded-full" />
                  <span className="h-[42px] xl:h-10.5 lg:h-10 md:h-13 sm:h-12 w-34 xl:w-28 bg-primary-300 rounded-full" />
                  <span className="h-[42px] xl:h-10.5 lg:h-10 md:h-13 sm:h-12 w-24 bg-primary-300 rounded-full" />
                  <span className="h-[42px] xl:h-10.5 lg:h-10 md:h-13 sm:h-12 w-34 bg-primary-300 rounded-full" />
                  <span className="h-[42px] xl:h-10.5 lg:h-10 md:h-13 sm:h-12 w-30 xl:w-24 bg-primary-300 rounded-full" />
                  <span className="h-[42px] xl:h-10.5 lg:h-10 md:h-13 sm:h-12 w-34 bg-primary-300 rounded-full" />
                  <span className="h-[42px] xl:h-10.5 lg:h-10 md:h-13 sm:h-12 w-24 bg-primary-300 rounded-full" />
               </div>

               <div className="md:order-2 flex flex-col self-start md:self-center gap-6 mt-5 md:mt-10">
                  <span className="h-9 md:h-10 w-[12rem] bg-primary-300/40 rounded-2xl md:self-center" />
                  <span className="h-11 w-[16rem] bg-primary-300 rounded-2xl" />
               </div>
            </div>
         </div>
      </motion.div>
   );
}

export default Loading;
