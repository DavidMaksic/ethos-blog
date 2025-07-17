import {
   getArticlePreviews,
   getCategories,
   getUser,
} from '@/src/lib/data-service';
import { auth } from '@/src/lib/auth';
import BookmarkList from '@/src/ui/bookmarks/bookmark-list';

export async function generateMetadata({ params }) {
   const { locale } = await params;
   return { title: locale === 'en' ? 'Profile' : 'Профил' };
}

async function Page({ searchParams }) {
   const { user } = await auth();
   const { bookmarks } = await getUser(user.email);

   const searchParam = await searchParams;
   const articles = await getArticlePreviews();
   const categories = await getCategories();
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
