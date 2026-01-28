import { getTranslations } from 'next-intl/server';
import RelatedArticle from '@/src/ui/articles/related-article';

async function RelatedArticles({
   articles,
   category,
   title,
   author,
   commentsNum,
}) {
   const t = await getTranslations('Article');

   const array = articles.filter(
      (item) => Number(item.category_id) === Number(category.id),
   );

   const relatedArticles = array
      .filter((item) => item.title !== title)
      .slice(0, 2);

   if (!relatedArticles.length) return null;

   return (
      <div className={`flex flex-col gap-4 ${commentsNum && 'mt-12'}`}>
         <span className="uppercase tracking-wide text-xl md:text-2xl font-medium select-none">
            {t('read-next-label')}
         </span>

         <div className="grid grid-cols-2 md:grid-cols-1 gap-6 md:gap-5 sm:gap-6">
            {relatedArticles.map((item) => (
               <RelatedArticle article={item} author={author} key={item.id} />
            ))}
         </div>
      </div>
   );
}

export default RelatedArticles;
