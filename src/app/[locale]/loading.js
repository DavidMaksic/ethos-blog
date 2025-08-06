'use client';

import { motion } from 'motion/react';

function Loading() {
   return (
      <motion.div
         className="animate-skeleton flex flex-col"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.3 }}
      >
         <div className="h-[26rem] md:h-fit grid items-center grid-cols-2 md:flex! md:flex-col! gap-10 mt-24 2xl:mt-16 lg:mt-12 md:mt-24 sm:mt-14 xs:mt-10 mb-39 2xl:mb-28 lg:mb-22 md:mb-49 sm:mb-44 xs:mb-46.5">
            <div className="md:order-2 md:w-full flex flex-col self-center">
               <span className="mt-3 2xl:mt-0 h-26 lg:h-18 w-11/12 md:w-5/6 md:self-center bg-primary-300/80 rounded-3xl" />
               <span className="mt-8 h-8 w-4/6 md:self-center lg:h-5 bg-primary-300/40 rounded-3xl" />

               <span className="mt-9.5 md:mt-14 md:self-center 2xl:mt-12 w-56.5 2xl:w-54 lg:w-48 md:w-40 h-18 2xl:h-17 lg:h-14 md:h-15 bg-primary-300/80 rounded-full" />
            </div>

            <div className="md:order-1 rounded-3xl md:w-full h-[26rem] 2xl:h-[23rem] lg:h-[20rem] bg-primary-300/40" />
         </div>

         <span className="mt-1 h-[2px] bg-primary-300 rounded-full" />

         <div className="flex flex-col gap-8 2xl:gap-7 mt-16">
            <span className="self-center w-[22rem] lg:w-[18rem] md:w-[20rem] h-8.5 2xl:h-7.5 bg-primary-300/80 rounded-2xl" />

            <div className="grid grid-cols-3 md:flex md:flex-col gap-6 lg:gap-4 md:gap-6 mt-1.5 2xl:mt-3">
               <div className="h-[30rem] lg:h-[25rem] md:h-[20rem] bg-primary-300/80 rounded-2xl" />
               <div className="h-[30rem] lg:h-[25rem] md:h-[20rem] bg-primary-300/80 rounded-2xl" />
               <div className="h-[30rem] lg:h-[25rem] md:h-[20rem] bg-primary-300/80 rounded-2xl" />
            </div>
         </div>

         <span className="mt-14 h-[2px] bg-primary-300 rounded-full" />

         <div className="mt-15 mb-[55px] grid grid-cols-[2fr_1fr] md:grid-cols-1 gap-10 md:gap-11">
            <div className="md:order-2 flex flex-col gap-11 lg:gap-7.5">
               <span className="md:hidden self-start h-7.5 2xl:h-9 lg:h-7.5 w-[12rem] 2xl:w-[16rem] lg:w-[13.5rem] bg-primary-300/40 rounded-2xl" />

               <div className="space-y-6 lg:space-y-4 md:space-y-6">
                  <div className="h-50 2xl:h-54 lg:h-52 md:h-60 sm:h-54 bg-primary-300/80 rounded-3xl" />
                  <div className="h-50 2xl:h-54 lg:h-52 md:h-60 sm:h-54 bg-primary-300/80 rounded-3xl" />
                  <div className="h-50 2xl:h-54 lg:h-52 md:h-60 sm:h-54 bg-primary-300/80 rounded-3xl" />
               </div>
            </div>

            <div className="md:order-1 flex flex-col gap-11 lg:gap-8 md:gap-9">
               <span className="self-start md:self-center h-7.5 2xl:h-9 lg:h-7.5 w-[12rem] 2xl:w-[13rem] lg:w-[11rem] md:w-[13rem] bg-primary-300/40 rounded-2xl" />

               <div className="flex gap-4 flex-wrap md:justify-center md:px-10">
                  <span className="h-[42px] 2xl:h-9.5 md:h-11 w-30 md:w-34 bg-primary-300 rounded-full" />
                  <span className="h-[42px] 2xl:h-9.5 md:h-11 w-24 bg-primary-300 rounded-full" />
                  <span className="h-[42px] 2xl:h-9.5 md:h-11 w-34 2xl:w-24 md:w-30 bg-primary-300 rounded-full" />
                  <span className="h-[42px] 2xl:h-9.5 md:h-11 w-24 lg:w-30 md:w-28 bg-primary-300 rounded-full" />
                  <span className="h-[42px] 2xl:h-9.5 md:h-11 w-34 2xl:w-30 md:w-24 bg-primary-300 rounded-full" />
                  <span className="h-[42px] 2xl:h-9.5 md:h-11 w-30 2xl:w-24 md:w-34 bg-primary-300 rounded-full" />
                  <span className="h-[42px] 2xl:h-9.5 md:h-11 w-34 lg:w-24 bg-primary-300 rounded-full" />
                  <span className="h-[42px] 2xl:h-9.5 md:h-11 w-24 bg-primary-300 rounded-full sm:hidden" />
               </div>
            </div>

            <span className="md:order-3 md:justify-self-center h-14 2xl:h-13 lg:h-12 md:h-16 w-37 2xl:w-44 lg:w-41 md:w-45 2xl:mt-2 lg:mt-[-14px] md:mt-[-8px] bg-primary-300/40 rounded-full" />
         </div>
      </motion.div>
   );
}

export default Loading;
