import { useEffect, useOptimistic, useState } from 'react';
import { useLocale, useTranslations } from 'use-intl';
import { commentLikes, deleteReply } from '@/src/lib/actions';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { useLocalStorage } from '@/src/hooks/use-local-storage';
import { AnimatePresence } from 'motion/react';
import { useMediaQuery } from 'react-responsive';
import { CommentDate } from '@/src/utils/helpers';
import { RxChevronUp } from 'react-icons/rx';
import { useRouter } from '@/src/i18n/navigation';
import { LuReply } from 'react-icons/lu';

import CommentOptions from '@/src/ui/comments/comment-options';
import useCommentLike from '@/src/hooks/use-comment-like';
import useCommentLine from '@/src/hooks/use-comment-line';
import RemoteImage from '@/src/ui/remote-image';
import ReplyInput from '@/src/ui/comments/reply-input';
import AuthModal from '@/src/ui/modal/auth-modal';
import Modal from '@/src/ui/modal/modal';
import Reply from '@/src/ui/comments/reply';
import toast from 'react-hot-toast';

function Comment({
   comment,
   users,
   session,
   slug,
   articleID,
   newUser,
   author,
}) {
   const [isOpen, setIsOpen] = useState(false);
   const [replyIsOpen, setReplyIsOpen] = useState(false);
   const [replyClicked, setReplyClicked] = useState(false);
   const [showReplies, setShowReplies] = useState(true);
   const t = useTranslations('Comment');

   const locale = useLocale();
   const date = CommentDate(comment.created_at, locale);

   const user = users.find((item) => item.id === comment.user_id);
   const isAuthor = user.email === author.email;

   const [commentCount, setCommentCount] = useState(comment.likes);
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

   // - Comment like logic
   const [likedComments, setLikedComments] = useLocalStorage(
      [],
      'likedComments'
   );

   const replies = comment.replies;
   const commentID = comment.id;
   const isLiked = useCommentLike(commentID, likedComments);

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

   const isMobile = useMediaQuery({ maxWidth: 768 });

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
                        <RemoteImage
                           imageUrl={user.image}
                           alt="User image"
                           styles="block aspect-square object-cover object-center rounded-full dark:opacity-90"
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
                  commentID={commentID}
                  userID={comment.user_id}
                  slug={slug}
                  articleID={articleID}
                  session={session}
               />
            </div>

            <p className="font-secondary text-[1.4rem] 2xl:text-[1.3rem] md:text-[1.6rem] xs:text-[1.5rem] md:leading-9 xs:leading-[1.4] whitespace-pre-line">
               {comment.content}
            </p>

            <div className="flex items-center gap-2 md:gap-2.5 mt-2 md:mt-3">
               <div
                  className={`flex items-center gap-2 h-9 md:h-11 xs:h-10.5 w-fit rounded-xl px-3 py-1.5 bg-primary-300/20 dark:bg-primary-400/12 text-primary-500/80 hover:bg-primary-200/60 dark:hover:bg-primary-400/20 cursor-pointer transition-75 ${
                     commentCount === 0 && 'gap-0!'
                  }`}
                  onClick={() => {
                     if (isLiked) {
                        setLikedComments((items) =>
                           items.filter((item) => item.id !== commentID)
                        );
                        const newCount = commentCount - 1;
                        setCommentCount(() => commentCount - 1);

                        commentLikes(commentID, newCount, slug);
                     } else {
                        setLikedComments((items) => [
                           ...items,
                           { id: commentID, isLiked: true },
                        ]);
                        const newCount = commentCount + 1;
                        setCommentCount(() => commentCount + 1);

                        commentLikes(commentID, newCount, slug);
                     }
                  }}
               >
                  {isLiked ? (
                     <BiSolidLike className="size-4 md:size-6 xs:size-[1.35rem]" />
                  ) : (
                     <BiLike className="size-4 md:size-6 xs:size-[1.35rem]" />
                  )}

                  <span className="tracking-wide font-semibold text-base md:text-xl select-none font-secondary">
                     {commentCount > 0 && commentCount}
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
               className={`absolute w-0.5 bg-quaternary dark:bg-tertiary rounded-full ${
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
                  newUser={newUser}
                  session={session}
                  user={user}
                  setReplyIsOpen={setReplyIsOpen}
               />
            )}

            {showReplies &&
               optimisticReplies?.map((item) => (
                  <Reply
                     reply={item}
                     session={session}
                     key={item.id}
                     users={users}
                     slug={slug}
                     articleID={articleID}
                     commentID={commentID}
                     newUser={newUser}
                     user={user}
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
