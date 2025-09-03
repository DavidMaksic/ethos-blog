import { format } from 'date-fns';
import { Link } from '@/src/i18n/navigation';
import RemoteImage from '@/src/ui/remote-image';

function FeaturedItem({ article, authors }) {
   const date = format(new Date(article.created_at), 'MMM dd, yyyy');
   const author = authors?.find((item) => item.id === article.author_id);

   return (
      <Link
         href={`/${article.slug}`}
         prefetch
         className="relative flex flex-col justify-between h-[30rem] lg:h-[25rem] md:h-[20rem] rounded-xl p-10 2xl:p-8 lg:p-6 md:p-9 xs:p-8 group cursor-pointer hover:translate-y-[-6px] transition duration-300 hover:shadow-2xl dark:hover:shadow-none select-none"
      >
         <span className="absolute inset-[-1px] m-0 bg-gradient-to-t from-primary-800 dark:from-primary-200/80 group-hover:from-primary-900 dark:group-hover:from-primary-200 z-10 pointer-events-none rounded-xl md:rounded-2xl dark:rounded-[10px] transition duration-300 group-hover:saturate-120" />

         <RemoteImage
            imageUrl={article.image}
            alt="Article image"
            styles="rounded-xl md:rounded-2xl absolute inset-0 h-full w-full object-cover"
         />

         <span />

         <div className="z-20 space-y-1">
            <div className="space-x-2 text-primary-300/70 dark:text-primary-600/60 md:text-2xl">
               <span>{date}</span>
               <span className="text-lg">•</span>
               <span>{author.full_name}</span>
            </div>

            <h2
               className="text-primary dark:text-primary-600/95 text-[1.9rem] lg:text-[1.6rem] md:text-4xl sm:text-[2rem] xs:text-[2.1rem] font-medium font-title leading-9.5 2xl:leading-9 lg:leading-8 md:leading-10"
               style={{ textShadow: '2px 2px 12px rgba(0, 0, 0, 1)' }}
            >
               {article.title}
            </h2>
         </div>
      </Link>
   );
}

export default FeaturedItem;
