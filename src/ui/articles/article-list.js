import ArticleItem from '@/src/ui/articles/article-item';

function ArticleList({ latestArticles, categories }) {
   return (
      <div className="grid grid-rows-3 gap-6">
         {latestArticles?.map((item) => (
            <ArticleItem article={item} categories={categories} key={item.id} />
         ))}
      </div>
   );
}

export default ArticleList;
