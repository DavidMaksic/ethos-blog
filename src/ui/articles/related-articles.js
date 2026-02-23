import { getRelatedArticles } from '@/src/utils/helpers';
import { getTranslations } from 'next-intl/server';
import RelatedArticle from '@/src/ui/articles/related-article';

async function RelatedArticles({ article, articles, author, commentsNum }) {
   const t = await getTranslations('Article');
   const relatedArticles = getRelatedArticles(articles, article);

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
