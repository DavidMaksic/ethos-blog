import { getArticles, getCategories, getUser } from '@/src/lib/data-service';
import { auth } from '@/src/lib/auth';
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
      <div className="flex flex-col justify-between sm:gap-7">
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
