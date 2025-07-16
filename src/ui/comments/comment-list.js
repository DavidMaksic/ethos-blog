'use client';

import { useTranslations } from 'use-intl';
import { getSortedItems } from '@/src/utils/helpers';
import { useMemo } from 'react';

import Comment from '@/src/ui/comments/comment';
import SortBy from '@/src/ui/operations/sort-by';

function CommentList({
   session,
   comments,
   param,
   articleID,
   users,
   font,
   replies,
   repliesInThisArticle,
   newUser,
   commentsNum,
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
               <div className="flex items-center justify-between mt-[-10px]">
                  <div className="uppercase tracking-wide text-xl md:text-2xl font-medium select-none">
                     <span>{t('Comment.label')}</span>
                     <span
                        className={`text-accent/90 dark:text-accent-200/90 ml-2 ${font}`}
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
               </div>

               <div className="space-y-5">
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
                          />
                       ))}
               </div>
            </>
         ) : null}
      </>
   );
}

export default CommentList;
