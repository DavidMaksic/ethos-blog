import { getArticles, getCategories, getUser } from '@/src/lib/data-service';
import { auth } from '@/src/lib/auth';

import BookmarkOptions from '@/src/ui/bookmarks/bookmark-options';
import BookmarkList from '@/src/ui/bookmarks/bookmark-list';

export async function generateMetadata({ params }) {
   const { locale } = await params;
   return { title: locale === 'en' ? 'Profile' : 'Профил' };
}

async function Page({ searchParams }) {
   const [searchParam, session, articles, categories] = await Promise.all([
      searchParams,
      auth(),
      getArticles(),
      getCategories(),
   ]);

   const { bookmarks } = await getUser(session.user.email);
   const bookmarkIDs = JSON.parse(bookmarks).flat();

   return (
      <div className="grid grid-rows-[0.1fr_2fr_0.1fr] gap-8 lg:gap-6 h-full">
         <div className="flex justify-between">
            <BookmarkOptions param={searchParam} />
         </div>

         <BookmarkList
            bookmarkIDs={bookmarkIDs}
            articles={articles}
            categories={categories}
            param={searchParam}
         />
      </div>
   );
}

export default Page;
