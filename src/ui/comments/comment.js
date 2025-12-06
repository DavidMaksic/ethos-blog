import { addLiked, deleteReply, removeLiked } from '@/src/lib/actions';
import { useEffect, useOptimistic, useState } from 'react';
import { useLocale, useTranslations } from 'use-intl';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { AnimatePresence } from 'motion/react';
import { useMediaQuery } from 'react-responsive';
import { CommentDate } from '@/src/utils/helpers';
import { RxChevronUp } from 'react-icons/rx';
import { useRouter } from '@/src/i18n/navigation';
import { LuReply } from 'react-icons/lu';
import { useAuth } from '@/src/context/auth-context';

import CommentOptions from '@/src/ui/comments/comment-options';
import useCommentLine from '@/src/hooks/use-comment-line';
import ReplyInput from '@/src/ui/comments/reply-input';
import AuthModal from '@/src/ui/modal/auth-modal';
import Modal from '@/src/ui/modal/modal';
import Reply from '@/src/ui/comments/reply';
import toast from 'react-hot-toast';
import Image from 'next/image';

function Comment({ comment, commentLength, users, article, author }) {
   const [isOpen, setIsOpen] = useState(false);
   const [replyIsOpen, setReplyIsOpen] = useState(false);
   const [replyClicked, setReplyClicked] = useState(false);
   const [showReplies, setShowReplies] = useState(true);
   const { session } = useAuth();
   const t = useTranslations('Comment');

   const locale = useLocale();
   const date = CommentDate(comment.created_at, locale);
   const isMobile = useMediaQuery({ maxWidth: 768 });

   const user = users.find((item) => item.id === comment.user_id);
   const isAuthor = user.email === author.email;
   const articleID = article.id;

   const router = useRouter();

   // - Copy link logic
   useEffect(() => {
      const hash = window.location.hash;
      if (hash) {
         const target = document.getElementById(hash.substring(1));
         if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            target.classList.add('highlight');
            setTimeout(() => target.classList.remove('highlight'), 2000);
         }
      }
   }, [router.asPath]);

   const replies = comment.replies;
   const commentID = comment.id;
   const slug = article.slug;

   // - Comment line logic
   const { containerRef, lastItemRef, lineHeight } = useCommentLine(
      replies,
      replyClicked,
      replyIsOpen,
      showReplies
   );

   const [optimisticReplies, optimisticDelete] = useOptimistic(
      replies,
      (curReplies, replyID) => {
         return curReplies.filter((item) => item.id === replyID);
      }
   );

   // - Deleting reply logic
   async function handleDelete(replyID) {
      optimisticDelete(replyID);
      await deleteReply(replyID, slug);
      toast.success(t('reply-deleted'));
   }

   // - Like logic
   let hasLiked;
   const commentLikeIDs = article.likes.filter(
      (item) => item.type === 'comment' && item.target_id === commentID
   );
   hasLiked = commentLikeIDs.length;

   const commentCount = commentLikeIDs.length;
   const [likesCount, setLikesCount] = useState(commentCount);
   const [isLiked, setIsLiked] = useState(hasLiked);

   function handleLike() {
      if (!session) {
         setIsOpen(true);
         return;
      }

      if (isLiked) {
         setLikesCount((i) => i - 1);
         removeLiked(session.user.userID, articleID, 'comment', slug);
      } else {
         setLikesCount((i) => i + 1);
         addLiked(session.user.userID, articleID, 'comment', slug, commentID);
      }

      setIsLiked(!isLiked);
   }

   useEffect(() => {
      setIsLiked(hasLiked);
   }, [hasLiked]);

   return (
      <>
         <div
            id={`comment-${commentID}`}
            className="flex flex-col gap-5 xs:gap-4 bg-secondary dark:bg-primary-200 md:dark:bg-primary-300/15 box-shadow rounded-3xl px-14 sm:px-12 xs:px-10 py-10 sm:py-8 xs:py-5.5 scroll-mt-28! transition duration-300"
         >
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                  {user?.image && (
                     <div className="relative size-10 md:size-11 sm:size-9 select-none">
                        <Image
                           className="block aspect-square object-cover object-center rounded-full dark:opacity-90"
                           fill
                           src={user.image}
                           alt="User image"
                           priority={true}
                           quality={60}
                           sizes="100vw"
                        />
                     </div>
                  )}

                  <div className="flex xs:flex-wrap items-center gap-2 md:text-2xl sm:text-[1.4rem]">
                     <span className="font-semibold">
                        {user.username
                           ? !isMobile
                              ? user.username
                              : user.username.split(' ')[0].slice(0, 10)
                           : !isMobile
                           ? user.name
                           : user.name.split(' ')[0].slice(0, 10)}
                     </span>
                     {isAuthor && (
                        <span className="px-2.5 py-0.5 bg-accent-400/20 dark:bg-accent-300/40 text-accent-600 dark:text-accent-50/70 rounded-xl font-semibold dark:font-medium">
                           {t('author')}
                        </span>
                     )}
                     <span className="text-primary-400">•</span>
                     <span className="font-thin text-primary-400">{date}</span>
                  </div>
               </div>

               <CommentOptions
                  comment={comment}
                  commentLength={commentLength}
                  userID={comment.user_id}
                  articleID={articleID}
                  slug={slug}
               />
            </div>

            <p className="font-secondary text-[1.4rem] 2xl:text-[1.3rem] md:text-[1.6rem] xs:text-[1.5rem] md:leading-9 xs:leading-[1.4] whitespace-pre-line">
               {comment.content}
            </p>

            <div className="flex items-center gap-2 md:gap-2.5 mt-2 md:mt-3">
               <div
                  className={`flex items-center gap-2 h-9 md:h-11 xs:h-10.5 w-fit rounded-xl px-3 py-1.5 bg-primary-300/20 dark:bg-primary-400/12 text-primary-500/80 hover:bg-primary-200/60 dark:hover:bg-primary-400/20 cursor-pointer transition-75 ${
                     likesCount === 0 && 'gap-0!'
                  }`}
                  onClick={handleLike}
               >
                  {isLiked ? (
                     <BiSolidLike className="size-4 md:size-6 xs:size-[1.35rem]" />
                  ) : (
                     <BiLike className="size-4 md:size-6 xs:size-[1.35rem]" />
                  )}

                  <span className="tracking-wide font-semibold text-base md:text-xl select-none font-secondary">
                     {likesCount > 0 && likesCount}
                  </span>
               </div>

               <div
                  className="flex items-center gap-2 h-9 md:h-11 xs:h-10.5 w-fit rounded-xl px-3 md:px-4 py-1.5 bg-primary-300/20 dark:bg-primary-400/12 text-primary-500/80 hover:bg-primary-200/60 dark:hover:bg-primary-400/20 cursor-pointer transition-75"
                  onClick={() => {
                     if (!session) setIsOpen(true);
                     if (session) setReplyIsOpen((isOpen) => !isOpen);
                  }}
               >
                  <LuReply className="size-4 md:size-6 xs:size-[1.35rem]" />
                  <span className="tracking-wide font-bold text-base md:text-xl xs:text-[1.2rem] select-none">
                     {t('reply-btn')}
                  </span>
               </div>

               {optimisticReplies?.length ? (
                  <div
                     className="flex items-center justify-center h-9 md:h-11 xs:h-10.5 w-fit rounded-xl px-2 py-1.5 bg-primary-300/20 dark:bg-primary-400/12 text-primary-500/80 hover:bg-primary-200/60 dark:hover:bg-primary-400/20 cursor-pointer transition-75"
                     onClick={() => setShowReplies((areShown) => !areShown)}
                  >
                     <RxChevronUp
                        className={`size-5 md:size-7 xs:size-[1.55rem] xs:stroke-[0.1px] transition-200 ${
                           showReplies && 'rotate-180'
                        }`}
                     />
                  </div>
               ) : null}
            </div>

            <AnimatePresence>
               {isOpen && (
                  <Modal closeModal={() => setIsOpen(false)}>
                     <AuthModal
                        onClose={() => setIsOpen(false)}
                        string="comment-label"
                     />
                  </Modal>
               )}
            </AnimatePresence>
         </div>

         <div className="relative">
            <div
               className={`absolute w-0.5 2xs:w-[0.15rem] bg-primary-300 2xl:bg-primary-400/27 dark:bg-tertiary 2xl:dark:bg-tertiary/90 rounded-full ${
                  !optimisticReplies?.length || !showReplies ? 'hidden' : ''
               }`}
               style={{ height: `${lineHeight}px`, top: 0 }}
               ref={containerRef}
            />

            {replyIsOpen && (
               <ReplyInput
                  slug={slug}
                  articleID={articleID}
                  commentID={commentID}
                  commentLength={commentLength}
                  setReplyIsOpen={setReplyIsOpen}
               />
            )}

            {showReplies &&
               optimisticReplies?.map((item) => (
                  <Reply
                     reply={item}
                     key={item.id}
                     users={users}
                     article={article}
                     commentID={commentID}
                     commentLength={commentLength}
                     lastItemRef={lastItemRef}
                     setReplyClicked={setReplyClicked}
                     onDelete={handleDelete}
                     author={author}
                  />
               ))}
         </div>
      </>
   );
}

export default Comment;
