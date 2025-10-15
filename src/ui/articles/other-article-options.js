'use client';

import {
   FaRegBookmark,
   FaRegComment,
   FaBookmark,
   FaComment,
} from 'react-icons/fa';
import {
   removeBookmark,
   removeLiked,
   addBookmark,
   addLiked,
} from '@/src/lib/actions';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { FiLink } from 'react-icons/fi';

import ArticleOptionItem from '@/src/ui/articles/article-option-item';
import LikeButton from '@/src/ui/buttons/like-button';
import AuthModal from '@/src/ui/modal/auth-modal';
import toast from 'react-hot-toast';
import Modal from '@/src/ui/modal/modal';

function OtherArticleOptions({
   article,
   session,
   comments,
   hasReplied,
   hasCommented,
   hasBookmarked,
   hasLiked,
   likeCount,
   bookmarkCount,
   commentsNum,
}) {
   const t = useTranslations();
   const [isOpen, setIsOpen] = useState();
   const articleID = article.id;

   // - Bookmark logic
   const [bookmarksCount, setBookmarksCount] = useState(bookmarkCount);
   const [isBookmarked, setIsBookmarked] = useState(hasBookmarked);

   const handleBookmark = () => {
      if (!session) {
         setIsOpen(true);
         return;
      }

      if (isBookmarked) {
         setBookmarksCount((i) => i - 1);
         removeBookmark(session.user, articleID, article.slug);
         toast.success(t('Article.bookmark-removed'));
      } else {
         setBookmarksCount((i) => i + 1);
         addBookmark(session.user, articleID, article.slug);
         toast.success(t('Article.bookmark-added'));
      }

      setIsBookmarked(!isBookmarked);
   };

   useEffect(() => {
      setIsBookmarked(hasBookmarked);
   }, [hasBookmarked]);

   useEffect(() => {
      setBookmarksCount(bookmarkCount);
   }, [bookmarkCount]);

   // - Like logic
   const [likesCount, setLikesCount] = useState(likeCount);
   const [isLiked, setIsLiked] = useState(hasLiked);

   function handleLike() {
      if (!session) {
         setIsOpen(true);
         return;
      }

      if (isLiked) {
         setLikesCount((i) => i - 1);
         removeLiked(session.user.userID, articleID, 'article', article.slug);
      } else {
         setLikesCount((i) => i + 1);
         addLiked(session.user.userID, articleID, 'article', article.slug);
      }

      setIsLiked(!isLiked);
   }

   useEffect(() => {
      setIsLiked(hasLiked);
   }, [hasLiked]);

   useEffect(() => {
      setLikesCount(likeCount);
   }, [likeCount]);

   return (
      <div className="grid grid-rows-4 sm:grid-rows-1 sm:grid-cols-4 gap-3">
         <ArticleOptionItem
            type="like"
            handler={handleLike}
            isLiked={isLiked}
            count={likesCount}
         >
            <LikeButton isLiked={isLiked} />
         </ArticleOptionItem>

         <ArticleOptionItem
            type="comment"
            hasCommented={hasCommented}
            hasReplied={hasReplied}
            count={commentsNum}
            handler={(e) => {
               e.preventDefault();
               document.querySelector('.comment-section').scrollIntoView({
                  behavior: 'smooth',
               });
            }}
         >
            {hasCommented || hasReplied ? (
               <FaComment
                  className={`size-10 md:size-12 p-2 text-primary-400 group-hover:text-amber-500 dark:text-primary-400 dark:group-hover:text-amber-400/70 transition-color ${
                     !!comments.length &&
                     'text-amber-500/80! dark:text-amber-400/65!'
                  }`}
               />
            ) : (
               <FaRegComment
                  className={`size-10 md:size-12 p-2 text-primary-400 group-hover:text-amber-500 dark:text-primary-400 dark:group-hover:text-amber-400/70 transition-color ${
                     hasCommented && 'text-amber-500! dark:text-amber-400/70!'
                  }`}
               />
            )}
         </ArticleOptionItem>

         <ArticleOptionItem
            type="bookmark"
            count={bookmarksCount}
            isBookmarked={isBookmarked}
            handler={handleBookmark}
         >
            {isBookmarked ? (
               <FaBookmark className="size-10 md:size-12 p-2 text-cyan-500/70 dark:text-cyan-400/60 transition-color" />
            ) : (
               <FaRegBookmark className="size-10 md:size-12 p-2 text-primary-400 dark:text-primary-400/85 group-hover:text-cyan-500 dark:group-hover:text-cyan-400/60 transition-color" />
            )}
         </ArticleOptionItem>

         <ArticleOptionItem
            type="link"
            handler={() => {
               navigator.clipboard.writeText(window?.location.href);
               toast.success(t('Comment.link'));
            }}
         >
            <FiLink className="size-10.5 md:size-12 stroke-[2.2px] p-2 text-primary-400 transition-color" />
         </ArticleOptionItem>

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
   );
}

export default OtherArticleOptions;
