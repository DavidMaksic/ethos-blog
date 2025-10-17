import { getArticles, getAuthors, getCategories } from '@/src/lib/data-service';
import LatestArticles from '@/src/ui/articles/latest-articles';

export default async function LatestArticlesAsync() {
   const [articles, categories, authors] = await Promise.all([
      getArticles(),
      getCategories(),
      getAuthors(),
   ]);

   return (
      <LatestArticles
         articles={articles}
         categories={categories}
         authors={authors}
      />
   );
}
