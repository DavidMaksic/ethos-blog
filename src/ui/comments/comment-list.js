'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import { getSortedItems } from '@/src/utils/helpers';
import Comment from '@/src/ui/comments/comment';

function CommentList({ comments, article, users, commentLength, author }) {
   const searchParams = useSearchParams();
   const sort = searchParams.get('sort');

   const sortedComments = !sort
      ? [...comments].reverse()
      : [...getSortedItems(sort, comments)];

   return (
      <>
         <AnimatePresence>
            {comments.length > 0 && (
               <motion.div
                  initial={false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  layout
               >
                  <AnimatePresence mode="popLayout">
                     {sortedComments
                        ? sortedComments.map((item) => (
                             <Comment
                                comment={item}
                                commentLength={commentLength}
                                users={users}
                                article={article}
                                author={author}
                                key={item.id}
                             />
                          ))
                        : comments.map((item) => (
                             <Comment
                                comment={item}
                                commentLength={commentLength}
                                users={users}
                                article={article}
                                author={author}
                                key={item.id}
                             />
                          ))}
                  </AnimatePresence>
               </motion.div>
            )}
         </AnimatePresence>
      </>
   );
}

export default CommentList;
