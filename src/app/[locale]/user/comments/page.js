import {
   getArticles,
   getComments,
   getReplies,
   getUsers,
   getUser,
} from '@/src/lib/data-service';
import { getTranslations } from 'next-intl/server';
import { auth } from '@/src/lib/auth';

import UserCommentLabel from '@/src/ui/user-comment-label';
import UserCommentList from '@/src/ui/comments/user-comment-list';
import SortBy from '@/src/ui/operations/sort-by';

export async function generateMetadata({ params }) {
   const { locale } = await params;
   return { title: locale === 'en' ? 'Profile' : 'Профил' };
}

async function Page({ searchParams }) {
   const [searchParam, session, articles, users, replies, t] =
      await Promise.all([
         searchParams,
         auth(),
         getArticles(),
         getUsers(),
         getReplies(),
         getTranslations(),
      ]);

   const user = await getUser(session?.user.email);

   const updatedReplies = replies.map((item) => ({
      ...item,
      isReply: true,
   }));

   const comments = await getComments();
   if (!comments.length) return <span>bruh</span>;

   const mergedArray = [...comments, ...updatedReplies];
   const userComments = mergedArray.filter(
      (item) => item.user_id === session.user.userID
   );

   return (
      <div className="space-y-6 lg:space-y-4">
         <div className="flex items-center justify-between">
            <UserCommentLabel />

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
               param={searchParam}
            />
         </div>

         <div className="flex flex-col gap-4">
            {userComments.length > 0 ? (
               <UserCommentList
                  param={searchParam}
                  allComments={comments}
                  comments={userComments}
                  articles={articles}
                  users={users}
                  user={user}
               />
            ) : (
               <span className="self-center mt-44 sm:mt-56 sm:mb-44 text-primary-400 text-3xl border border-tertiary dark:border-primary-300/15 rounded-3xl py-8 px-12 bg-white dark:bg-primary-300/15">
                  {t('Comment.no-comments')}
               </span>
            )}
         </div>
      </div>
   );
}

export default Page;
