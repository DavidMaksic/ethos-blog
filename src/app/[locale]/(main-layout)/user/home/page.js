import { FaRegComments, FaRegHeart } from 'react-icons/fa';
import { getTranslations } from 'next-intl/server';
import { LuBookmark } from 'react-icons/lu';
import { getUser } from '@/src/lib/data-service';
import { auth } from '@/src/lib/auth';

import ProfileInfo from '@/src/ui/profile/profile-info';
import JoinedDate from '@/src/ui/joined-date';
import Stats from '@/src/ui/stats';

export async function generateMetadata({ params }) {
   const { locale } = await params;
   return { title: locale === 'en' ? 'Profile' : 'Профил' };
}

async function Page() {
   const [session, t] = await Promise.all([auth(), getTranslations()]);
   const { user } = session;
   const extendedUser = await getUser(user.email);

   const likeCount = extendedUser.likes.filter(
      (item) => item.type === 'article'
   ).length;
   const commentCount = [...extendedUser.comments, ...extendedUser.replies]
      .length;
   const bookmarkCount = extendedUser.bookmarks.length;

   return (
      <div className="flex gap-4 md:flex-col">
         <h1 className="sr-only">{t('H1.profile-page-overview')}</h1>

         <div className="space-y-4">
            <ProfileInfo oldUser={user} newUser={extendedUser} />
            <JoinedDate user={user} />
         </div>

         <div className="space-y-4">
            <div className="flex gap-4 2xl:flex-wrap">
               <Stats
                  title={t('Profile.user-stat-1')}
                  value={likeCount}
                  icon={
                     <FaRegHeart className="text-red-600/40 dark:text-red-300/80 transition-color" />
                  }
                  color="bg-red-300/20 dark:bg-red-300/30"
               />
               <Stats
                  title={t('Profile.user-stat-2')}
                  value={commentCount ? commentCount : '--'}
                  icon={
                     <FaRegComments className="text-amber-700/50 dark:text-amber-300/70 transition-color" />
                  }
                  color="bg-amber-300/20 dark:bg-amber-300/30"
               />
            </div>

            <Stats
               title={t('Profile.user-stat-3')}
               value={bookmarkCount ? bookmarkCount : '--'}
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
