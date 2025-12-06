import { getComments, getUsers, getUser } from '@/src/lib/data-service';
import { getTranslations } from 'next-intl/server';
import { getSortedItems } from '@/src/utils/helpers';
import { auth } from '@/src/lib/auth';

import UserCommentLabel from '@/src/ui/user-comment-label';
import UserComment from '@/src/ui/comments/user-comment';
import SortBy from '@/src/ui/operations/sort-by';

export async function generateMetadata({ params }) {
   const { locale } = await params;
   return { title: locale === 'en' ? 'Profile' : 'Профил' };
}

async function Page({ searchParams }) {
   const [searchParam, session, comments, users, t] = await Promise.all([
      searchParams,
      auth(),
      getComments(),
      getUsers(),
      getTranslations(),
   ]);

   const user = await getUser(session?.user.email);
   const replies = comments.map((item) => item.replies).flat();

   const mergedArray = [...comments, ...replies];
   const userComments = mergedArray.filter(
      (item) => item.user_id === session.user.userID
   );
   const sortedComments = getSortedItems(searchParam?.sort, userComments);

   return (
      <div className="flex flex-col gap-8 lg:gap-6">
         <h1 className="sr-only">{t('H1.profile-page-comments')}</h1>

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
            />
         </div>

         {sortedComments?.length ? (
            <div
               className={`max-h-[650px] 2xl:max-h-[597px] xl:max-h-[46.7rem] lg:max-h-[35.5rem] md:max-h-[47.55rem] sm:max-h-[67vh] xs:max-h-[70vh] overflow-y-scroll scrollbar rounded-3xl bg-white dark:bg-primary-300/10 border border-quaternary dark:border-primary-300/15 box-shadow ${
                  sortedComments?.length === 1 && 'mb-70'
               }`}
            >
               {sortedComments?.map((item) => (
                  <UserComment
                     comment={item}
                     comments={comments}
                     users={users}
                     user={user}
                     key={item.id}
                  />
               ))}
            </div>
         ) : (
            <span className="self-center mt-55 sm:mt-60 sm:mb-44 text-primary-400 text-3xl border border-tertiary dark:border-primary-300/15 rounded-3xl py-8 px-12 bg-white dark:bg-primary-300/15">
               {t('Comment.no-comments')}
            </span>
         )}
      </div>
   );
}

export default Page;
