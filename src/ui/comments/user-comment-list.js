'use client';

import { getSortedItems } from '@/src/utils/helpers';
import { useMemo } from 'react';
import UserComment from '@/src/ui/comments/user-comment';

function UserCommentList({
   param,
   allComments,
   comments,
   articles,
   users,
   user,
}) {
   const sortedComments = useMemo(() => {
      return getSortedItems(param, comments);
   }, [param, comments]);

   return (
      <>
         {sortedComments?.length ? (
            <div className="max-h-[650px] xl:max-h-[36.5rem] lg:max-h-[35.5rem] md:max-h-[48rem] sm:max-h-[67vh] xs:max-h-[70vh] overflow-y-scroll scrollbar rounded-3xl bg-white dark:bg-primary-300/10 border border-quaternary dark:border-primary-300/15 box-shadow">
               {sortedComments?.map((item) => (
                  <UserComment
                     allComments={allComments}
                     comment={item}
                     articles={articles}
                     users={users}
                     user={user}
                     key={item.id}
                  />
               ))}
            </div>
         ) : (
            <div className="h-[32rem] lg:h-[28rem] md:h-[34rem] max-w-full rounded-3xl bg-primary-300/25 dark:bg-primary-300/15 animate-skeleton" />
         )}
      </>
   );
}

export default UserCommentList;
