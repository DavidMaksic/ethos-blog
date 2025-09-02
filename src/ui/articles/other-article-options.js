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
   updateLikes,
   addLiked,
} from '@/src/lib/actions';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '@/src/hooks/use-local-storage';
import { useTranslations } from 'next-intl';
import { useLikeContext } from '@/src/context/like-context';
import { FiLink } from 'react-icons/fi';

import ArticleOptionItem from '@/src/ui/articles/article-option-item';
import useBookmark from '@/src/hooks/use-bookmark';
import LikeButton from '@/src/ui/buttons/like-button';
import AuthModal from '@/src/ui/modal/auth-modal';
import useLike from '@/src/hooks/use-like';
import toast from 'react-hot-toast';
import Modal from '@/src/ui/modal/modal';

function OtherArticleOptions({
   article,
   session,
   allUsers,
   user,
   comments,
   hasCommented,
   hasReplied,
   commentsNum,
}) {
   const t = useTranslations();
   const [isOpen, setIsOpen] = useState();
   const articleID = article.id;

   // 1. Bookmark logic
   const allBookmarks = allUsers
      .map((item) => JSON.parse(item.bookmarks))
      .filter((item) => item.length)
      .flat();

   const bookmarks = allBookmarks.filter((item) => item === articleID);
   const [bookmarksCount, setBookmarksCount] = useState(bookmarks.length);

   const isBookmarkedDB = useBookmark(articleID, session, user);
   const [isBookmarked, setIsBookmarked] = useState(isBookmarkedDB);

   const handleBookmark = () => {
      if (!session) {
         setIsOpen(true);
         return;
      }

      if (isBookmarked) {
         setBookmarksCount((i) => i - 1);
         removeBookmark(session.user, articleID);
         toast.success(t('Article.bookmark-removed'));
      } else {
         setBookmarksCount((i) => i + 1);
         addBookmark(session.user, articleID);
         toast.success(t('Article.bookmark-added'));
      }

      setIsBookmarked(!isBookmarked);
   };

   useEffect(() => {
      setIsBookmarked(isBookmarkedDB);
   }, [isBookmarkedDB]);

   // 2. Likes logic
   const [likedArticles, setLikedArticles] = useLocalStorage(
      [],
      'likedArticles'
   );

   const isLiked = useLike(articleID, likedArticles);
   const { likesCount, setLikesCount } = useLikeContext();

   useEffect(() => {
      setLikesCount(article.likes);
   }, []); // eslint-disable-line

   return (
      <div className="grid grid-rows-4 sm:grid-rows-1 sm:grid-cols-4 gap-3">
         <ArticleOptionItem
            type="like"
            count={likesCount}
            isLiked={isLiked}
            handler={() => {
               if (isLiked) {
                  setLikedArticles((items) =>
                     items.filter((item) => item.articleID !== articleID)
                  );
                  if (likesCount === 0) return;
                  const newCount = likesCount - 1;
                  setLikesCount(() => likesCount - 1);

                  removeLiked(session.user, articleID);
                  updateLikes(articleID, newCount);
               } else {
                  setLikedArticles((items) => [
                     ...items,
                     { articleID, isLiked: true },
                  ]);
                  const newCount = likesCount + 1;
                  setLikesCount(() => likesCount + 1);

                  addLiked(session.user, articleID);
                  updateLikes(articleID, newCount);
               }
            }}
         >
            <LikeButton
               articleID={articleID}
               likedArticles={likedArticles}
               setLikedArticles={setLikedArticles}
               isLiked={isLiked}
            />
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

         {isOpen && (
            <Modal closeModal={() => setIsOpen(false)}>
               <AuthModal
                  onClose={() => setIsOpen(false)}
                  string="bookmark-label"
               />
            </Modal>
         )}
      </div>
   );
}

export default OtherArticleOptions;
