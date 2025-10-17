import { getMainArticles } from '@/src/lib/data-service';
import MainArticles from '@/src/ui/articles/main-articles';

export default async function MainArticlesAsync() {
   const articles = await getMainArticles();
   return <MainArticles articles={articles} />;
}
