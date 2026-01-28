import { format } from 'date-fns';
import { Link } from '@/src/i18n/navigation';
import Image from 'next/image';

function RelatedArticle({ article, author }) {
   const date = format(new Date(article.created_at), 'MMM dd, yyyy');

   return (
      <Link
         href={`/${article.slug}`}
         className="relative grid grid-rows-[auto_1fr] rounded-2xl md:rounded-3xl group cursor-pointer overflow-hidden bg-secondary dark:bg-primary-200 border border-primary-200 hover:-translate-y-0.5 box-shadow hover:shadow-preview dark:hover:shadow-preview-dark transition-[translate,box-shadow] duration-200 select-none group"
      >
         <div className="relative h-80 sm:h-60">
            <Image
               className="object-cover opacity-90 dark:opacity-75 group-hover:opacity-100! dark:group-hover:opacity-90! transition-200"
               src={article.image}
               alt="Article image"
               unoptimized
               fill
            />
         </div>

         <div className="self-center md:flex md:flex-col md:justify-self-center md:gap-1.5 sm:gap-1 px-10 md:px-6 sm:px-8 py-8 2xl:pt-7 md:py-9 md:pb-10 text-center">
            <span className="text-primary-500 dark:text-primary-600/70 text-[1.7rem] md:text-[2.3rem] sm:text-[2.1rem] font-semibold md:dark:font-medium font-title leading-8.5 md:leading-9">
               {article.title}
            </span>

            <div className="mt-1.5 space-x-2 text-primary-400 dark:text-primary-600/45 mb-4 md:mb-0 text-lg md:text-[1.3rem]">
               <span>{date}</span>
               <span className="text-lg">•</span>
               <span>{author.full_name}</span>
            </div>
         </div>
      </Link>
   );
}

export default RelatedArticle;
