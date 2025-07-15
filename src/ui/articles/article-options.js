'use client';

import {
   FaRegBookmark,
   FaRegComment,
   FaBookmark,
   FaComment,
} from 'react-icons/fa';
import {
   removeBookmark,
   addBookmark,
   removeLiked,
   updateLikes,
   addLiked,
} from '@/src/lib/actions';
import { useLocalStorage } from '@/src/hooks/use-local-storage';
import { AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import useBookmark from '@/src/hooks/use-bookmark';
import BackButton from '@/src/ui/buttons/back-button';
import LikeButton from '@/src/ui/buttons/like-button';
import AuthModal from '@/src/ui/modal/auth-modal';
import useLike from '@/src/hooks/use-like';
import Button from '@/src/ui/buttons/button';
import Modal from '@/src/ui/modal/modal';
import toast from 'react-hot-toast';

function ArticleOptions({
   articleID,
   count,
   session,
   user,
   hasCommented,
   hasReplied,
}) {
   const t = useTranslations('Article');
   const [isOpen, setIsOpen] = useState();

   const isBookmarked = useBookmark(articleID, session, user);

   // Likes logic
   const [likedArticles, setLikedArticles] = useLocalStorage(
      [],
      'likedArticles'
   );

   const isLiked = useLike(articleID, likedArticles);

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

         <div className="flex items-center gap-2 md:gap-3 sm:gap-1.5">
            <Button
               handler={() => {
                  if (isLiked) {
                     setLikedArticles((items) =>
                        items.filter((item) => item.articleID !== articleID)
                     );
                     if (count === 0) return;
                     const newCount = count - 1;

                     removeLiked(session.user, articleID);
                     updateLikes(articleID, newCount);
                  } else {
                     setLikedArticles((items) => [
                        ...items,
                        { articleID, isLiked: true },
                     ]);
                     const newCount = count + 1;

                     addLiked(session.user, articleID);
                     updateLikes(articleID, newCount);
                  }
               }}
               styles="xs:hidden"
            >
               <LikeButton
                  styles="size-9.5! md:size-11! sm:size-10!"
                  articleID={articleID}
                  likedArticles={likedArticles}
                  isLiked={isLiked}
               />
            </Button>

            <Button
               styles="ml-px"
               handler={(e) => {
                  e.preventDefault();
                  document.querySelector('.comment-section').scrollIntoView({
                     behavior: 'smooth',
                  });
               }}
            >
               {hasCommented || hasReplied ? (
                  <FaComment
                     className={`size-10 md:size-11 sm:size-10 p-2 text-amber-600/45 dark:text-amber-300/53 transition-color`}
                  />
               ) : (
                  <FaRegComment className="size-9.5 md:size-11 sm:size-10 p-2 text-primary-400 group-hover:text-amber-600/65 dark:text-primary-400 dark:group-hover:text-amber-400/70 transition-color" />
               )}
            </Button>

            <Button styles="sm:hidden">
               {isBookmarked ? (
                  <FaBookmark
                     className="size-9.5 md:size-10.5 p-2 text-cyan-600/45 dark:text-cyan-300/50 transition-color"
                     onClick={() => {
                        if (!session) setIsOpen(true);
                        if (session) {
                           removeBookmark(session.user, articleID);
                           toast.success(t('bookmark-removed'));
                        }
                     }}
                  />
               ) : (
                  <FaRegBookmark
                     className="size-9.5 md:size-10.5 p-2 text-primary-400 dark:text-primary-400 group-hover:text-cyan-600/60 dark:group-hover:text-cyan-400/60 transition-color"
                     onClick={() => {
                        if (!session) setIsOpen(true);
                        if (session) {
                           addBookmark(session.user, articleID);
                           toast.success(t('bookmark-added'));
                        }
                     }}
                  />
               )}
            </Button>

            <AnimatePresence>
               {isOpen && (
                  <Modal closeModal={() => setIsOpen(false)}>
                     <AuthModal
                        onClose={() => setIsOpen(false)}
                        string="bookmark-label"
                     />
                  </Modal>
               )}
            </AnimatePresence>
         </div>

         <div className="text-primary-300 text-2xl select-none">|</div>
      </>
   );
}

export default ArticleOptions;
