'use client';

import {
   FaRegBookmark,
   FaRegComment,
   FaBookmark,
   FaComment,
} from 'react-icons/fa6';
import {
   removeBookmark,
   addBookmark,
   removeLiked,
   addLiked,
} from '@/src/lib/actions';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { authClient } from '@/src/lib/auth-client';

import BackButton from '@/src/ui/buttons/back-button';
import LikeButton from '@/src/ui/buttons/like-button';
import AuthModal from '@/src/ui/modal/auth-modal';
import Button from '@/src/ui/buttons/button';
import Modal from '@/src/ui/modal/modal';
import toast from 'react-hot-toast';

function ArticleOptions({ article, bookmarks, comments }) {
   const t = useTranslations('Article');
   const [isOpen, setIsOpen] = useState();
   const { slug, id: articleID, likes } = article;

   const { data, isPending } = authClient.useSession();
   const session = data?.session;
   const user = data?.user;

   const [mounted, setMounted] = useState(false);
   useEffect(() => setMounted(true), []);

   // - Like logic
   let hasLiked;
   const articleLikeIDs = likes
      .filter((item) => item.type === 'article')
      .map((item) => item.user_id);
   hasLiked = !!articleLikeIDs.find((item) => item === user?.id);

   // - Comment logic
   let hasCommented;
   hasCommented = !!comments.find((item) => item.user_id === user?.id);

   // - Reply logic
   let hasReplied;
   const replies = comments.map((item) => item.replies).flat();
   hasReplied = !!replies.find((item) => item.user_id === user?.id);

   // - Bookmark logic
   const hasBookmarked = !!bookmarks.find(
      (item) => item.user_id === user?.id && item.article_id === articleID,
   );
   const [isBookmarked, setIsBookmarked] = useState(hasBookmarked);

   function handleBookmarkClick() {
      if (!session) return setIsOpen(true);

      if (isBookmarked) {
         removeBookmark(articleID, slug);
         toast.success(t('bookmark-removed'));
      } else {
         addBookmark(articleID, slug);
         toast.success(t('bookmark-added'));
      }

      setIsBookmarked(!isBookmarked);
   }

   useEffect(() => {
      setIsBookmarked(hasBookmarked);
   }, [hasBookmarked]);

   // - Like logic
   const [isLiked, setIsLiked] = useState(hasLiked);

   function handleLike() {
      if (!session) return setIsOpen(true);

      if (isLiked) {
         removeLiked(articleID, 'article', slug);
      } else {
         addLiked(articleID, 'article', slug);
      }

      setIsLiked(!isLiked);
   }

   useEffect(() => {
      setIsLiked(hasLiked);
   }, [hasLiked]);

   return (
      <>
         <div className="flex items-center gap-2 md:hidden">
            <Button>
               <BackButton />
            </Button>
         </div>

         <div className="text-primary-300 text-2xl select-none md:hidden">
            |
         </div>

         <div
            className={`flex items-center gap-1.5 md:gap-3 sm:gap-1.5 ${
               mounted && isPending ? 'pointer-events-none' : ''
            }`}
         >
            <Button handler={handleLike} styles="md:hidden">
               <LikeButton
                  styles="size-[2.68rem]! 2xl:size-10.5! px-[0.5rem]! mt-px"
                  isLiked={isLiked}
               />
            </Button>

            <Button
               styles="ml-1 2xl:mt-px md:hidden"
               handler={(e) => {
                  if (!session) {
                     setIsOpen(true);
                     return;
                  }

                  e.preventDefault();
                  document.querySelector('.comment-section').scrollIntoView({
                     behavior: 'smooth',
                  });
               }}
            >
               {hasCommented || hasReplied ? (
                  <FaComment
                     className={`size-11 2xl:size-10.5 sm:size-9 p-2.5 text-amber-600/45 dark:text-amber-300/53 transition-color`}
                  />
               ) : (
                  <FaRegComment className="size-11 2xl:size-10.5 sm:size-9 p-2.5 text-primary-400 group-hover:text-amber-600/65 dark:text-primary-400 dark:group-hover:text-amber-400/70 transition-color" />
               )}
            </Button>

            <Button handler={handleBookmarkClick} styles="md:hidden 2xl:mt-px">
               {isBookmarked ? (
                  <FaBookmark className="size-10.5 2xl:size-10 p-2.5 text-cyan-600/45 dark:text-cyan-300/50 transition-color" />
               ) : (
                  <FaRegBookmark className="size-10.5 2xl:size-10 p-2.5 text-primary-400 dark:text-primary-400 group-hover:text-cyan-600/60 dark:group-hover:text-cyan-400/60 transition-color" />
               )}
            </Button>

            <AnimatePresence>
               {isOpen && (
                  <Modal closeModal={() => setIsOpen(false)}>
                     <AuthModal
                        onClose={() => setIsOpen(false)}
                        string="generic-label"
                     />
                  </Modal>
               )}
            </AnimatePresence>
         </div>

         <div className="text-primary-300 text-2xl select-none md:hidden">
            |
         </div>
      </>
   );
}

export default ArticleOptions;
