import { HiOutlineUserCircle } from 'react-icons/hi2';
import RemoteImage from '@/src/ui/remote-image';

function ArticleAuthorInfo({ article, author, date, children }) {
   return (
      <div className="flex sm:flex-col gap-6 mt-12">
         {children}

         <div className="size-full flex flex-col items-center self-center gap-4 bg-secondary dark:bg-primary-200 xs:dark:bg-primary-300/15 rounded-3xl px-18 2xl:px-16! md:px-12! sm:px-11! xs:px-8! py-12 pb-14 text-3xl box-shadow transition-bg_border">
            <div className="relative size-28 md:size-30 select-none">
               {author?.profile_image ? (
                  <RemoteImage
                     imageUrl={author.profile_image}
                     alt="User image"
                     styles="block aspect-square object-cover object-center rounded-full dark:opacity-90"
                  />
               ) : (
                  <HiOutlineUserCircle className="size-30 stroke-[0.5px] text-primary-400/70 dark:text-primary-300" />
               )}
            </div>

            <div className="flex flex-col gap-6 self-center text-center">
               <div className="flex flex-col md:gap-1">
                  <span className="text-accent-400 dark:text-accent text-[2.5rem] md:text-5xl w-fit self-center font-logo">
                     {author.full_name}
                  </span>
                  <span className="text-xl text-primary-400 font-title">
                     {date}
                  </span>
               </div>

               {author?.description_en || author?.description_srb ? (
                  <p className="text-[1.35rem] leading-7.5 md:text-2xl">
                     {article.language === 'English'
                        ? author.description_en
                        : author.description_srb}
                  </p>
               ) : (
                  <p className="text-[1.35rem] leading-7.5 md:leading-8 md:text-2xl">
                     {article.language === 'English'
                        ? 'Is an author writing for Ethos blog.'
                        : 'Је аутор који пише за Етос блог.'}
                  </p>
               )}
            </div>
         </div>
      </div>
   );
}

export default ArticleAuthorInfo;
