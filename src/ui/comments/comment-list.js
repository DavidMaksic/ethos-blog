'use client';

import { useTranslations } from 'use-intl';
import { getSortedItems } from '@/src/utils/helpers';
import { useMemo } from 'react';
import { motion } from 'motion/react';

import Comment from '@/src/ui/comments/comment';
import SortBy from '@/src/ui/operations/sort-by';

function CommentList({
   session,
   comments,
   param,
   articleID,
   users,
   replies,
   repliesInThisArticle,
   newUser,
   commentsNum,
   author,
}) {
   const t = useTranslations();

   const sortedComments = useMemo(() => {
      if (!param?.sort) return comments;

      return getSortedItems(param, comments);
   }, [param, comments]);

   return (
      <>
         {comments.length ? (
            <>
               <motion.div
                  className="flex items-center justify-between mt-[-10px] xs:mt-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
               >
                  <div className="uppercase tracking-wide text-xl md:text-2xl font-medium select-none">
                     <span>{t('Comment.label')}</span>
                     <span
                        className={`text-accent/90 dark:text-accent-200/90 ml-2 font-secondary`}
                     >
                        ({commentsNum})
                     </span>
                  </div>

                  <SortBy
                     options={[
                        {
                           value: 'created_at-asc',
                           label: t('Sort.latest'),
                        },
                        {
                           value: 'created_at-desc',
                           label: t('Sort.oldest'),
                        },
                     ]}
                     param={param}
                  />
               </motion.div>

               <motion.div
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
               >
                  {sortedComments
                     ? sortedComments.map((item) => (
                          <Comment
                             comment={item}
                             users={users}
                             session={session}
                             key={item.id}
                             articleID={articleID}
                             replies={replies}
                             repliesInThisArticle={repliesInThisArticle}
                             newUser={newUser}
                             author={author}
                          />
                       ))
                     : comments.map((item) => (
                          <Comment
                             comment={item}
                             users={users}
                             session={session}
                             key={item.id}
                             articleID={articleID}
                             replies={replies}
                             repliesInThisArticle={repliesInThisArticle}
                             newUser={newUser}
                             author={author}
                          />
                       ))}
               </motion.div>
            </>
         ) : null}
      </>
   );
}

export default CommentList;
