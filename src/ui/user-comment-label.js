import { getTranslations } from 'next-intl/server';

async function UserCommentLabel() {
   const t = await getTranslations('Comment');

   return (
      <h1 className="text-4xl lg:text-3xl md:text-4xl text-primary-500 dark:text-primary-600/65">
         {t('user-label')}
      </h1>
   );
}

export default UserCommentLabel;
