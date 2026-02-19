import { forwardRef, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'use-intl';
import { motion, AnimatePresence } from 'motion/react';
import { addLiked, removeLiked } from '@/src/lib/actions';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { useMediaQuery } from 'react-responsive';
import { usePathname } from '@/src/i18n/navigation';
import { CommentDate } from '@/src/utils/helpers';
import { RxChevronUp } from 'react-icons/rx';
import { authClient } from '@/src/lib/auth-client';
import { LuReply } from 'react-icons/lu';

import CommentOptions from '@/src/ui/comments/comment-options';
import useFocusReply from '@/src/hooks/use-focus-reply';
import RepliesList from '@/src/ui/comments/replies-list';
import AuthModal from '@/src/ui/modal/auth-modal';
import UserImage from '@/src/ui/image/user-image';
import Modal from '@/src/ui/modal/modal';

const Comment = forwardRef(
   (
      {
         comment,
         commentLength,
         isFirst,
         prevHasReplyOpen,
         article,
         author,
         openReplyID,
         setOpenReplyID,
      },
      ref,
   ) => {
      const [isOpen, setIsOpen] = useState(false);
      const [showReplies, setShowReplies] = useState(true);

      const [mounted, setMounted] = useState(false);
      useEffect(() => setMounted(true), []);

      const { data, isPending } = authClient.useSession();
      const session = data?.session;
      const user = data?.user;

      const t = useTranslations('Comment');

      const locale = useLocale();
      const pathname = usePathname();

      const date = CommentDate(comment.created_at, locale);
      const isMobile = useMediaQuery({ maxWidth: 768 });

      const isAuthor = mounted && user?.email === author.email;
      const articleID = article.id;

      // - Copy link logic
      useEffect(() => {
         const hash = window.location.hash;
         if (!hash) return;

         const timer = setTimeout(() => {
            const element = document.getElementById(hash.substring(1));
            if (element) {
               element.scrollTo({ behavior: 'smooth' });
               element.classList.add('highlight');
               setTimeout(() => element.classList.remove('highlight'), 3000);
            }
         }, 500);

         return () => clearTimeout(timer);
      }, [pathname]);

      // - Replies logic
      const replies = comment.replies;
      const commentID = comment.id;
      const slug = article.slug;

      // - Like logic

      const commentLikeIDs = article.likes.filter(
         (item) => item.type === 'comment' && item.target_id === commentID,
      );
      const hasLiked =
         mounted && commentLikeIDs.some((item) => item.user_id === user?.id);

      const commentLikeCount = commentLikeIDs.length;
      const [likesCount, setLikesCount] = useState(commentLikeCount);
      const [isLiked, setIsLiked] = useState(false);

      function handleLike() {
         if (!session) {
            setIsOpen(true);
            return;
         }

         if (isLiked) {
            setLikesCount((i) => i - 1);
            removeLiked(articleID, 'comment', slug);
         } else {
            setLikesCount((i) => i + 1);
            addLiked(articleID, 'comment', slug, commentID);
         }

         setIsLiked(!isLiked);
      }

      useEffect(() => {
         setIsLiked(hasLiked);
      }, [hasLiked]);

      // - Add focus to reply input when it's opened
      const isReplyOpen = openReplyID === commentID;
      const replyInputRef = useFocusReply(isReplyOpen);

      return (
         <div className={`relative`}>
            <motion.div
               layout
               initial={{ height: 0 }}
               animate={{ height: prevHasReplyOpen || isFirst ? 0 : 18 }}
               exit={{ height: 0 }}
               transition={{ duration: 0.2 }}
            />

            <motion.div
               ref={ref}
               initial={false}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0, ease: 'easeIn' }}
               transition={{ duration: 0.2 }}
               layout="position"
            >
               <div
                  id={`comment-${commentID}`}
                  className={`flex flex-col gap-5 xs:gap-4 bg-secondary dark:bg-primary-200 md:dark:bg-primary-300/15 box-shadow rounded-3xl px-14 sm:px-12 xs:px-10 py-10 sm:py-8 xs:py-5.5 scroll-mt-28! transition duration-300 ${mounted && isPending ? 'pointer-events-none' : ''}`}
               >
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="relative size-10 md:size-11 sm:size-9 select-none">
                           <UserImage url={mounted ? user?.image : undefined} />
                        </div>

                        <div className="flex xs:flex-wrap items-center gap-2 3xs:gap-y-0.5! md:text-2xl sm:text-[1.4rem]">
                           {mounted && (
                              <span className="font-semibold">
                                 {!isMobile
                                    ? user?.name
                                    : user?.name?.split(' ')[0].slice(0, 10)}
                              </span>
                           )}
                           {isAuthor && (
                              <span className="px-2.5 py-0.5 bg-accent-400/20 dark:bg-accent-300/40 text-accent-600 dark:text-accent-50/70 rounded-xl font-semibold dark:font-medium">
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
                        comment={comment}
                        commentLength={commentLength}
                        userID={comment.user_id}
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
                        role="button"
                        onClick={handleLike}
                     >
                        {isLiked ? (
                           <BiSolidLike className="size-4 md:size-6 xs:size-[1.35rem]" />
                        ) : (
                           <BiLike className="size-4 md:size-6 xs:size-[1.35rem]" />
                        )}

                        <span className="tracking-wide font-semibold text-base md:text-xl select-none font-secondary tabular-nums">
                           {likesCount > 0 && likesCount}
                        </span>
                     </div>

                     <div
                        className="flex items-center gap-2 h-9 md:h-11 xs:h-10.5 w-fit rounded-xl px-3 md:px-4 py-1.5 bg-primary-300/20 dark:bg-primary-400/12 text-primary-500/80 hover:bg-primary-200/60 dark:hover:bg-primary-400/20 cursor-pointer transition-75"
                        role="button"
                        onClick={() => {
                           if (!session) return setIsOpen(true);
                           setOpenReplyID(isReplyOpen ? null : commentID);
                           if (!showReplies) setShowReplies(true);
                        }}
                     >
                        <LuReply className="size-4 md:size-6 xs:size-[1.35rem]" />
                        <span className="tracking-wide font-bold text-base md:text-xl xs:text-[1.2rem] select-none">
                           {t('reply-btn')}
                        </span>
                     </div>

                     <AnimatePresence>
                        {replies?.length && (
                           <motion.div
                              className="flex items-center justify-center h-9 md:h-11 xs:h-10.5 w-fit rounded-xl px-2 py-1.5 bg-primary-300/20 dark:bg-primary-400/12 text-primary-500/80 hover:bg-primary-200/60 dark:hover:bg-primary-400/20 cursor-pointer transition-75"
                              role="button"
                              onClick={() =>
                                 setShowReplies((areShown) => !areShown)
                              }
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                           >
                              <RxChevronUp
                                 className={`size-5 md:size-7 xs:size-[1.55rem] xs:stroke-[0.1px] transition-200 ${
                                    showReplies && 'rotate-180'
                                 }`}
                              />
                           </motion.div>
                        )}
                     </AnimatePresence>
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

               <motion.div
                  layoutRoot
                  className="relative ml-0.5 2xl:ml-0"
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{
                     height: showReplies ? 'auto' : 0,
                     opacity: showReplies ? 1 : 0,
                     marginTop:
                        (showReplies && replies.length > 0) || isReplyOpen
                           ? 18
                           : 0,
                  }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.2 }}
               >
                  <RepliesList
                     replies={replies}
                     showReplies={showReplies}
                     commentID={commentID}
                     articleID={articleID}
                     slug={slug}
                     article={article}
                     commentLength={commentLength}
                     author={author}
                     openReplyID={openReplyID}
                     setOpenReplyID={setOpenReplyID}
                     isReplyOpen={isReplyOpen}
                     replyInputRef={replyInputRef}
                  />
               </motion.div>
            </motion.div>
         </div>
      );
   },
);

Comment.displayName = 'Comment';

export default Comment;
