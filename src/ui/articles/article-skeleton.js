function ArticleSkeleton() {
   return (
      <div className="relative max-w-5xl space-y-7 [&_div]:rounded-full animate-skeleton transition-200 py-4 px-2 pl-44">
         <span className="absolute inset-0 m-0 bg-gradient-to-t from-primary dark:from-primary-50" />

         <div className="space-y-8">
            <div className="h-24 bg-primary-300 dark:bg-skeleton !rounded-4xl" />
            <div className="h-10 bg-skeleton w-2/3" />
            <div className="h-1 bg-skeleton" />
         </div>

         <div className="flex justify-between gap-32">
            <div className="h-10 bg-primary-300 dark:bg-primary-300/50 w-1/4" />
            <div className="h-10 bg-primary-300 dark:bg-primary-300/50 w-1/7" />
         </div>

         <div className="flex h-96 justify-center bg-primary-300 dark:bg-primary-300/50 !rounded-4xl" />
      </div>
   );
}

export default ArticleSkeleton;
