function ArticleHeading({ article }) {
   return (
      <div className="flex flex-col gap-2 xs:gap-1 text-center">
         <h1 className="relative styled_text font-normal! md:font-medium! sm:font-semibold! text-6xl 2xl:text-[3.4rem] md:text-6xl sm:text-5xl sm:leading-13 xs:leading-12.5 pb-2 bg-gradient-to-r from-gray-600 to-gray-500/90 dark:from-slate-300 dark:to-slate-300/80 font-title">
            {article.title}
         </h1>
         <h2 className="font-medium! text-2xl 2xl:text-[1.4rem] xs:text-[1.45rem] text-primary-500/80 w-5/6 xs:w-[80%] self-center">
            {article.description}
         </h2>
      </div>
   );
}

export default ArticleHeading;
