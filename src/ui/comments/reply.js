import { useLocale, useTranslations } from 'next-intl';
import { addLiked, removeLiked } from '@/src/lib/actions';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { useMediaQuery } from 'react-responsive';
import { CommentDate } from '@/src/utils/helpers';
import { useAuth } from '@/src/context/auth-context';
import { LuReply } from 'react-icons/lu';

import CommentOptions from '@/src/ui/comments/comment-options';
import ReplyInput from '@/src/ui/comments/reply-input';
import AuthModal from '@/src/ui/modal/auth-modal';
import Modal from '@/src/ui/modal/modal';
import Image from 'next/image';

function Reply({
   reply,
   users,
   article,
   commentID,
   commentLength,
   lastItemRef,
   setReplyClicked,
   onDelete,
   author,
}) {
   const [isOpen, setIsOpen] = useState(false);
   const [replyIsOpen, setReplyIsOpen] = useState(false);

   const { id: articleID, slug } = article;
   const { session } = useAuth();

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
      (item) => item.type === 'reply' && item.target_id === replyID
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
         removeLiked(session.user.userID, articleID, 'reply', slug);
      } else {
         setLikesCount((i) => i + 1);
         addLiked(session.user.userID, articleID, 'reply', slug, replyID);
      }

      setIsLiked(!isLiked);
   }

   useEffect(() => {
      setIsLiked(hasLiked);
   }, [hasLiked]);

   return (
      <>
         <div className="relative last:mb-12" ref={lastItemRef}>
            <div className="absolute left-10 top-1/2 w-10 h-10 -translate-x-full 4k:-translate-y-[40%]! 2k:-translate-y-[60%] -translate-y-[85%] xs:-translate-y-[110%] 2xs:-translate-y-[120%] 2xl:-translate-x-[101%] 2xs:-translate-x-full">
               <div className="size-full 4k:border-l-3! 2k:border-l-2 border-l-1 2xl:border-l-2 4k:border-b-3! 2k:border-b-2 border-b-1 2xl:border-b-2 2k:border-primary-400/40 border-primary-400/50 2xl:border-primary-400/25 2k:dark:border-quaternary/70 dark:border-quaternary/90 2xl:dark:border-quaternary/70 rounded-bl-full" />
            </div>

            <div
               id={`comment-${replyID}`}
               className="flex flex-col gap-5 xs:gap-4 bg-secondary/65 dark:bg-primary-200/49 md:dark:bg-primary-300/10 box-shadow dark:border-primary-300/10 rounded-3xl px-14 sm:px-12 xs:px-10 py-10 sm:py-8 xs:py-5.5 ml-14 mb-4 scroll-mt-28! transition duration-300"
            >
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     {currentUser?.image && (
                        <div className="relative size-10 md:size-11 sm:size-9">
                           <Image
                              className="block aspect-square object-cover object-center rounded-full dark:opacity-90"
                              fill
                              src={currentUser.image}
                              alt="User image"
                              priority={true}
                              quality={60}
                              sizes="100vw"
                           />
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
                     id={replyID}
                     userID={reply.user_id}
                     slug={slug}
                     comment={reply}
                     commentLength={commentLength}
                     replyID={replyID}
                     articleID={articleID}
                     onDelete={onDelete}
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
                        if (!session) setIsOpen(true);
                        if (session) {
                           setReplyIsOpen((isOpen) => !isOpen);
                           setReplyClicked((isOpen) => !isOpen);
                        }
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

         <div className={`mt-4 ${replyIsOpen ? 'block' : 'hidden'}`}>
            <ReplyInput
               slug={slug}
               articleID={articleID}
               commentID={commentID}
               commentLength={commentLength}
               setReplyIsOpen={setReplyIsOpen}
            />
         </div>
      </>
   );
}

export default Reply;
