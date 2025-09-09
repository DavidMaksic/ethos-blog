import { getTranslations } from 'next-intl/server';

async function UserCommentLabel() {
   const t = await getTranslations('Comment');

   return (
      <h2 className="text-4xl lg:text-3xl md:text-4xl text-primary-500 dark:text-primary-600/65">
         {t('user-label')}
      </h2>
   );
}

export default UserCommentLabel;
