import { getArticles, getAuthors, getCategories } from '@/src/lib/data-service';
import FeaturedArticles from '@/src/ui/articles/featured-articles';

export default async function FeaturedArticlesAsync() {
   const [articles, categories, authors] = await Promise.all([
      getArticles(),
      getCategories(),
      getAuthors(),
   ]);

   return (
      <FeaturedArticles
         articles={articles}
         categories={categories}
         authors={authors}
      />
   );
}
