'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import RelatedArticle from '@/src/ui/articles/related-article';

function RelatedArticles({ articles, category, title, author }) {
   const t = useTranslations('Article');

   const array = articles.filter(
      (item) => Number(item.categoryID) === Number(category.id)
   );

   const relatedArticles = array
      .filter((item) => item.title !== title)
      .slice(0, 2);

   if (!relatedArticles.length) return null;

   return (
      <motion.div
         className="flex flex-col gap-4 mt-12"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.3 }}
      >
         <span className="uppercase tracking-wide text-xl md:text-2xl font-medium select-none">
            {t('read-next-label')}
         </span>

         <div className="grid grid-cols-2 sm:grid-cols-1 gap-6 md:gap-5 sm:gap-6">
            {relatedArticles.map((item) => (
               <RelatedArticle article={item} author={author} key={item.id} />
            ))}
         </div>
      </motion.div>
   );
}

export default RelatedArticles;
