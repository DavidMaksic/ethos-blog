import { getTranslations } from 'next-intl/server';
import { getBookmarks } from '@/src/lib/data-service';
import { auth } from '@/src/lib/auth';

import BookmarkOptions from '@/src/ui/bookmarks/bookmark-options';
import BookmarkList from '@/src/ui/bookmarks/bookmark-list';

export async function generateMetadata({ params }) {
   const { locale } = await params;
   return { title: locale === 'en' ? 'Profile' : 'Профил' };
}

async function Page({ searchParams }) {
   const [searchParam, session, t] = await Promise.all([
      searchParams,
      auth(),
      getTranslations('H1'),
   ]);

   const usersBookmarks = await getBookmarks(session.user.userID);

   return (
      <div className="grid grid-rows-[0.1fr_2fr_0.1fr] gap-8 lg:gap-6 h-full">
         <h1 className="sr-only">{t('profile-page-bookmarks')}</h1>

         <div className="flex justify-between">
            <BookmarkOptions param={searchParam} />
         </div>

         <BookmarkList usersBookmarks={usersBookmarks} param={searchParam} />
      </div>
   );
}

export default Page;
