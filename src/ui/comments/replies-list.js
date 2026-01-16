import { motion } from 'motion/react';
import useThreadLine from '@/src/hooks/use-thread-line';
import ReplyInput from '@/src/ui/comments/reply-input';
import Reply from '@/src/ui/comments/reply';

function RepliesList({
   optimisticReplies,
   commentID,
   articleID,
   slug,
   users,
   article,
   commentLength,
   author,
   openReplyID,
   setOpenReplyID,
   handleDelete,
   isReplyOpen,
   replyInputRef,
}) {
   // - Calculate vertical line located next to replies
   const { lineHeight, repliesWrapperRef, lastReplyRef } =
      useThreadLine(optimisticReplies);

   return (
      <>
         {/* Thread line */}
         <motion.div
            className="absolute left-0 top-0 w-0.5 bg-primary-300/60 dark:bg-tertiary/80"
            style={{ height: Math.max(0, lineHeight - 32) }}
            animate={{ opacity: optimisticReplies.length > 0 ? 1 : 0 }}
         />

         {/* Reply input */}
         <div ref={repliesWrapperRef}>
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
                  setReplyIsOpen={(prev) => {
                     setOpenReplyID(prev ? commentID : null);
                  }}
                  ref={replyInputRef}
               />
            </motion.div>

            {/* Replies list */}
            {optimisticReplies.map((reply, index) => {
               const isLast = index === optimisticReplies.length - 1;
               return (
                  <Reply
                     key={reply.id}
                     reply={reply}
                     users={users}
                     article={article}
                     commentID={commentID}
                     commentLength={commentLength}
                     onDelete={handleDelete}
                     author={author}
                     lastReplyRef={isLast ? lastReplyRef : null}
                     openReplyID={openReplyID}
                     setOpenReplyID={setOpenReplyID}
                  />
               );
            })}
         </div>
      </>
   );
}

export default RepliesList;
