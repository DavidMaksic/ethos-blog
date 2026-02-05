import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { addLiked, removeLiked } from '@/src/lib/actions';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { CommentDate } from '@/src/utils/helpers';
import { useAuth } from '@/src/context/auth-context';
import { LuReply } from 'react-icons/lu';

import CommentOptions from '@/src/ui/comments/comment-options';
import useFocusReply from '@/src/hooks/use-focus-reply';
import ReplyInput from '@/src/ui/comments/reply-input';
import AuthModal from '@/src/ui/modal/auth-modal';
import UserImage from '@/src/ui/image/user-image';
import Modal from '@/src/ui/modal/modal';

function Reply({
   reply,
   showReplies,
   users,
   article,
   commentID,
   commentLength,
   author,
   lastReplyRef,
   openReplyID,
   setOpenReplyID,
}) {
   const [isOpen, setIsOpen] = useState(false);
   const { id: articleID, slug } = article;
   const { session, user } = useAuth();

   const replyID = reply.id;
   const t = useTranslations('Comment');

   const currentUser = users.find((item) => item.id === reply.user_id);
   const isAuthor = currentUser.email === author.email;

   const isMobile = useMediaQuery({ maxWidth: 768 });
   const locale = useLocale();
   const date = CommentDate(reply.created_at, locale);

   // - Like logic
   let hasLiked;
   const replyLikeIDs = article.likes.filter(
      (item) => item.type === 'reply' && item.target_id === replyID,
   );
   hasLiked = replyLikeIDs.length;
   const replyCount = replyLikeIDs.length;
   const [likesCount, setLikesCount] = useState(replyCount);
   const [isLiked, setIsLiked] = useState(hasLiked);

   function handleLike() {
      if (!session) {
         setIsOpen(true);
         return;
      }

      if (isLiked) {
         setLikesCount((i) => i - 1);
         removeLiked(user.userID, articleID, 'reply', slug);
      } else {
         setLikesCount((i) => i + 1);
         addLiked(user.userID, articleID, 'reply', slug, replyID);
      }

      setIsLiked(!isLiked);
   }

   useEffect(() => {
      setIsLiked(hasLiked);
   }, [hasLiked]);

   // - Add focus to reply input when it's opened
   const isReplyOpen = openReplyID === reply.id;
   const replyInputRef = useFocusReply(isReplyOpen);

   return (
      <motion.div
         initial={{ height: 0, opacity: 0 }}
         animate={{
            height: showReplies ? 'auto' : 0,
            opacity: showReplies ? 1 : 0,
         }}
         exit={{ height: 0, opacity: 0 }}
         transition={{ duration: 0.2 }}
      >
         <div className="relative" ref={lastReplyRef}>
            <div className="absolute left-10 top-1/2 size-[38px] 2xl:size-10 -translate-x-full -translate-y-[85%] xs:-translate-y-[110%] 2xs:-translate-y-[120%] 2xl:-translate-x-[101%] 2xs:-translate-x-full">
               <span
                  className="absolute size-10 md:size-9.5 xs:size-7 border-l-2 2xs:border-l-1 border-b-2 2xs:border-b-1 rounded-bl-full border-primary-300/65 dark:border-tertiary"
                  aria-hidden="true"
               />
            </div>

            <div
               id={`comment-${replyID}`}
               className="flex flex-col gap-5 xs:gap-4 bg-secondary/65 dark:bg-primary-200/49 md:dark:bg-primary-300/10 box-shadow dark:border-primary-300/10 rounded-3xl px-14 sm:px-12 xs:px-10 py-10 sm:py-8 xs:py-5.5 ml-14 xs:ml-10 mb-5 scroll-mt-28! transition duration-300"
            >
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     {currentUser?.image && (
                        <div className="relative size-10 md:size-11 sm:size-9">
                           <UserImage url={currentUser.image} />
                        </div>
                     )}

                     <div className="flex xs:flex-wrap items-center gap-x-2 md:text-2xl sm:text-[1.4rem]">
                        <span className="font-semibold">
                           {currentUser.username
                              ? !isMobile
                                 ? currentUser.username
                                 : currentUser.username
                                      .split(' ')[0]
                                      .slice(0, 10)
                              : !isMobile
                                ? currentUser.name
                                : currentUser.name.split(' ')[0].slice(0, 10)}
                        </span>
                        {isAuthor && (
                           <span className="px-2.5 pt-px pb-0.5 bg-accent-400/20 dark:bg-accent-300/40 text-accent-600 dark:text-accent-50/70 rounded-xl font-semibold dark:font-medium">
                              {t('author')}
                           </span>
                        )}
                        <span className="text-primary-400">•</span>
                        <span className="font-thin text-primary-400">
                           {date}
                        </span>
                     </div>
                  </div>

                  <CommentOptions
                     userID={reply.user_id}
                     slug={slug}
                     comment={reply}
                     commentLength={commentLength}
                     replyID={replyID}
                  />
               </div>

               <p className="font-secondary text-[1.4rem] 2xl:text-[1.3rem] md:text-[1.6rem] xs:text-[1.5rem] md:leading-9 xs:leading-[1.4] whitespace-pre-line">
                  {reply.content}
               </p>

               <div className="flex items-center gap-2 md:gap-2.5 mt-2 md:mt-3">
                  <div
                     className={`flex items-center gap-2 h-9 md:h-11 xs:h-10.5 w-fit rounded-xl px-3 py-1.5 bg-primary-300/15 dark:bg-primary-400/12 md:dark:bg-primary-400/12 text-primary-500/80 hover:bg-primary-200/60 dark:hover:bg-primary-400/20 cursor-pointer transition-75 ${
                        likesCount === 0 && 'gap-0!'
                     }`}
                     onClick={handleLike}
                  >
                     {isLiked ? (
                        <BiSolidLike className="size-4 md:size-6 xs:size-[1.35rem]" />
                     ) : (
                        <BiLike className="size-4 md:size-6 xs:size-[1.35rem]" />
                     )}

                     <span className="tracking-wide font-semibold text-base select-none font-secondary">
                        {likesCount > 0 && likesCount}
                     </span>
                  </div>

                  <div
                     className="flex items-center gap-2 h-9 md:h-11 xs:h-10.5 w-fit rounded-xl px-3 md:px-4 py-1.5 bg-primary-300/15 dark:bg-primary-400/12 md:dark:bg-primary-400/12 text-primary-500/80 hover:bg-primary-200/60 dark:hover:bg-primary-400/20 cursor-pointer transition-75"
                     onClick={() => {
                        if (!session) return setIsOpen(true);
                        setOpenReplyID(isReplyOpen ? null : reply.id);
                     }}
                  >
                     <LuReply className="size-4 md:size-6 xs:size-[1.35rem]" />
                     <span className="tracking-wide font-bold text-base md:text-xl xs:text-[1.2rem] select-none">
                        {t('reply-btn')}
                     </span>
                  </div>
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
         </div>

         <motion.div
            layout
            initial={false}
            animate={{
               height: isReplyOpen ? 'auto' : 0,
               opacity: isReplyOpen ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
         >
            <ReplyInput
               slug={slug}
               articleID={articleID}
               commentID={commentID}
               commentLength={commentLength}
               setReplyIsOpen={(isOpen) =>
                  setOpenReplyID(isOpen ? reply.id : null)
               }
               ref={replyInputRef}
            />
         </motion.div>
      </motion.div>
   );
}

export default Reply;
