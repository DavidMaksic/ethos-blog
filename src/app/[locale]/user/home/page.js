import { getComments, getReplies, getUser } from '@/src/lib/data-service';
import { FaRegComments, FaRegHeart } from 'react-icons/fa';
import { getTranslations } from 'next-intl/server';
import { LuBookmark } from 'react-icons/lu';
import { auth } from '@/src/lib/auth';

import ProfileInfo from '@/src/ui/profile/profile-info';
import JoinedDate from '@/src/ui/joined-date';
import Stats from '@/src/ui/stats';

export async function generateMetadata({ params }) {
   const { locale } = await params;
   return { title: locale === 'en' ? 'Profile' : 'Профил' };
}

async function Page() {
   const [session, comments, replies, t] = await Promise.all([
      auth(),
      getComments(),
      getReplies(),
      getTranslations('Profile'),
   ]);

   const { user } = session;
   const newUser = await getUser(user.email);

   const likesLength = JSON.parse(newUser?.liked).flat().length;
   const bookmarksLength = JSON.parse(newUser?.bookmarks).flat().length;

   const mergedArray = [...comments, ...replies];
   const commentsLength = mergedArray.filter(
      (item) => item.user_id === newUser.id
   ).length;

   return (
      <div className="flex gap-4 md:flex-col">
         <div className="space-y-4">
            <ProfileInfo oldUser={user} newUser={newUser} />
            <JoinedDate user={user} />
         </div>

         <div className="space-y-4">
            <div className="flex gap-4 2xl:flex-wrap">
               <Stats
                  title={t('user-stat-1')}
                  value={likesLength}
                  icon={
                     <FaRegHeart className="text-red-600/40 dark:text-red-300/80 transition-color" />
                  }
                  color="bg-red-300/20 dark:bg-red-300/30"
               />
               <Stats
                  title={t('user-stat-2')}
                  value={commentsLength ? commentsLength : '--'}
                  icon={
                     <FaRegComments className="text-amber-700/50 dark:text-amber-300/70 transition-color" />
                  }
                  color="bg-amber-300/20 dark:bg-amber-300/30"
               />
            </div>

            <Stats
               title={t('user-stat-3')}
               value={bookmarksLength ? bookmarksLength : '--'}
               icon={
                  <LuBookmark className="text-cyan-700/50 dark:text-cyan-300/70 transition-color" />
               }
               color="bg-cyan-300/20 dark:bg-cyan-300/30"
            />
         </div>
      </div>
   );
}

export default Page;
