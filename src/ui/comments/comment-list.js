'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'use-intl';
import { getSortedItems } from '@/src/utils/helpers';

import Comment from '@/src/ui/comments/comment';
import SortBy from '@/src/ui/operations/sort-by';

function CommentList({
   comments,
   article,
   users,
   commentsNum,
   commentLength,
   author,
}) {
   const t = useTranslations();
   const searchParams = useSearchParams();
   const sort = searchParams.get('sort');

   const sortedComments = !sort
      ? [...comments].reverse()
      : [...getSortedItems(sort, comments)];

   return (
      <>
         {comments.length ? (
            <>
               <div className="flex items-center justify-between mt-[-10px] xs:mt-0">
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
                  />
               </div>

               <div className="space-y-5">
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
               </div>
            </>
         ) : null}
      </>
   );
}

export default CommentList;
