import { Cormorant_SC } from 'next/font/google';
import { format } from 'date-fns';
import { Link } from '@/src/i18n/navigation';
import RemoteImage from '@/src/ui/remote-image';

const cormorantSC = Cormorant_SC({
   subsets: ['latin'],
   display: 'swap',
   weight: ['300', '400', '500', '600', '700'],
});

function RelatedArticle({ article, author }) {
   const date = format(new Date(article.created_at), 'MMM dd, yyyy');

   return (
      <Link
         href={`/${article.id}`}
         className="relative flex flex-col rounded-2xl group cursor-pointer overflow-hidden bg-secondary dark:bg-primary-200 border border-primary-200 hover:scale-102 transition-[scale] duration-200 select-none box-shadow group"
      >
         <div className="relative h-48 2xl:h-44 md:h-80 sm:h-60">
            <RemoteImage
               imageUrl={article.image}
               alt="Article image"
               styles="object-cover opacity-90 dark:opacity-75 group-hover:opacity-100! dark:group-hover:opacity-90! transition-200"
            />
         </div>

         <div className="self-center md:flex md:flex-col md:gap-1 px-10 md:px-6 sm:px-8 py-8 2xl:pt-7 text-center">
            <span
               className={`text-primary-500 dark:text-primary-600/70 text-[1.7rem] md:text-[1.9rem] sm:text-[2.1rem] font-medium md:font-semibold md:dark:font-medium ${cormorantSC.className} leading-8.5 md:leading-9`}
            >
               {article.title}
            </span>

            <div className="mt-1.5 space-x-2 text-primary-400 dark:text-primary-600/60 mb-4 sm:mb-0 text-lg md:text-xl sm:text-[1.3rem]">
               <span>{date}</span>
               <span className="text-lg">•</span>
               <span>{author.full_name}</span>
            </div>
         </div>
      </Link>
   );
}

export default RelatedArticle;
