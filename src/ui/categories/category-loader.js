function CategoryLoader() {
   return (
      <div className="flex gap-4 flex-wrap mt-[-1.4px] animate-skeleton">
         <span className="border px-3.5 pl-4 py-1.5 text-[1.415rem] text-transparent bg-primary-300/35 dark:bg-primary-300/30 rounded-full font-semibold">
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
