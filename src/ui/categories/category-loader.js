function CategoryLoader() {
   return (
      <div className="flex gap-4 flex-wrap mt-[-1.4px] animate-skeleton">
         <span className="border px-3.5 md:px-4 pl-4 py-1.5 pb-[0.3rem] lg:pb-[0.4rem] md:pb-[0.6rem] xs:pb-[0.55rem] md:py-2 lg:font-bold text-[1.415rem] 2xl:text-[1.3rem] lg:text-[1.2rem] md:text-2xl text-transparent bg-primary-300/35 dark:bg-primary-300/30 rounded-full font-semibold">
            History
         </span>
         <span className="border px-3.5 pl-4 py-1.5 text-[1.415rem] text-transparent bg-primary-300/35 dark:bg-primary-300/30 rounded-full font-semibold">
            Warfare
         </span>
         <span className="border px-3.5 pl-4 py-1.5 text-[1.415rem] text-transparent bg-primary-300/35 dark:bg-primary-300/30 rounded-full font-semibold">
            Education
         </span>
      </div>
   );
}

export default CategoryLoader;
