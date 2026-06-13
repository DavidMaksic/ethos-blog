'use client';

import { useTranslations } from 'next-intl';
import { usePrevious } from '@/src/hooks/use-previous';
import SortBy from '@/src/ui/operations/sort-by';

function CommentListHeader({ comments, commentsNum }) {
   const t = useTranslations();
   const prevCommentsNum = usePrevious(commentsNum);

   return (
      <div className="flex items-center justify-between mt-[-10px] xs:mt-0">
         <div className="uppercase tracking-wide text-xl md:text-2xl font-medium select-none">
            <span>{t('Comment.label')}</span>
            <span className="text-accent/90 dark:text-accent-200/90 ml-2 font-secondary">
               ({comments.length ? commentsNum : prevCommentsNum})
            </span>
         </div>

         <SortBy
            options={[
               {
                  value: 'created_at-asc',
                  label: t('Sort.latest'),
               },
               {
                  value: 'created_at-desc',
                  label: t('Sort.oldest'),
               },
            ]}
         />
      </div>
   );
}

export default CommentListHeader;
