function Loading() {
   return (
      <div className="relative grid grid-cols-10 items-center gap-y-8 lg:gap-y-6 md:gap-y-6 gap-x-8 xl:gap-x-6 animate-skeleton xl:mt-4 py-4">
         <div className="bg-primary-300/40 md:col-span-full col-span-6 h-66 xl:h-70 lg:h-73 md:h-72 sm:h-89 p-10 px-14 rounded-2xl" />
         <div className="bg-primary-300/80 col-span-4 md:col-span-7 sm:col-span-8 h-66 xl:h-70 lg:h-73 md:h-60 p-10 px-14 rounded-2xl" />

         <div className="col-span-5 md:col-span-full h-[27rem] lg:h-[31.5rem] bg-primary-300/40 p-10 px-14 rounded-2xl" />
         <div className="col-span-5 md:col-span-full h-[27rem] lg:h-[31.5rem] bg-primary-300/80 p-10 px-14 rounded-2xl" />
      </div>
   );
}

export default Loading;
