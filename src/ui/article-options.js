'use client';

import { RiHeartAdd2Fill, RiHeartAdd2Line } from 'react-icons/ri';
import { FaRegComment } from 'react-icons/fa';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { useState } from 'react';

import BackButton from '@/src/ui/buttons/back-button';
import Button from '@/src/ui/buttons/button';
import toast from 'react-hot-toast';

function ArticleOptions() {
   const [isLiked, setIsLiked] = useState(false);
   const [isBookmarked, setIsBookmarked] = useState(false);

   return (
      <>
         <div className="flex items-center gap-1.5">
            <Button>
               <BackButton />
            </Button>

            {/* <Button>
               <LinkURL />
            </Button> */}
         </div>

         <div className="text-primary-300 text-2xl select-none">|</div>

         <div className="flex items-center gap-1.5">
            <Button handler={() => setIsLiked((isLiked) => !isLiked)}>
               {isLiked ? (
                  <RiHeartAdd2Fill className="text-primary-400 group-hover:text-red-400/70! dark:text-primary-400 dark:group-hover:text-primary-500 transition-color" />
               ) : (
                  <RiHeartAdd2Line className="text-primary-400 group-hover:text-red-400/70! dark:text-primary-400 dark:group-hover:text-primary-500 transition-color" />
               )}
            </Button>

            <Button styles="ml-px">
               <FaRegComment className="size-5.5! text-primary-400 group-hover:text-amber-500 dark:text-primary-400 dark:group-hover:text-amber-400/70 transition-color" />
            </Button>

            <Button
               styles="py-[9px]! px-[9px]!"
               handler={() => {
                  setIsBookmarked((isLiked) => !isLiked);

                  if (!isBookmarked) {
                     toast.success('Article bookmarked');
                  } else {
                     toast.success('Article removed from bookmarks');
                  }
               }}
            >
               {isBookmarked ? (
                  <BsBookmarkFill className="stroke-[0.6px] dark:stroke-[0.4px] size-[19.5px]! text-primary-400 group-hover:text-cyan-500/70 dark:text-primary-400 dark:group-hover:text-cyan-400/60 transition-color" />
               ) : (
                  <BsBookmark className="stroke-[0.6px] dark:stroke-[0.4px] size-[19.5px]! text-primary-400 group-hover:text-cyan-500 dark:text-primary-400 dark:group-hover:text-cyan-400/60 transition-color" />
               )}
            </Button>
         </div>

         <div className="text-primary-300 text-2xl select-none">|</div>
      </>
   );
}

export default ArticleOptions;
