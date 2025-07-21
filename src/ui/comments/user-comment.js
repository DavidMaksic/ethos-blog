'use client';

import { useTranslations } from 'next-intl';
import { EB_Garamond } from 'next/font/google';
import { format } from 'date-fns';
import { Link } from '@/src/i18n/navigation';

const ebGaramond = EB_Garamond({
   subsets: ['latin'],
   display: 'swap',
   style: ['normal', 'italic'],
   weight: ['400', '500', '600', '700'],
});

function UserComment({ comment, users, user, articles, allComments }) {
   const t = useTranslations('Comment');
   const date = format(new Date(comment.created_at), 'MMM dd, yyyy');

   const commentedArticle = articles.find(
      (item) => item.id === comment.article_id
   );

   const repliedToID = allComments.find(
      (item) => item.id === comment.comment_id
   )?.user_id;

   const repliedTo = users.find((item) => item.id === repliedToID);

   const title = commentedArticle.title;
   const fullUrl = `/${commentedArticle.id}/#comment-${comment.id}`;

   return (
      <Link
         href={fullUrl}
         className="flex flex-col gap-5 last:border-b-transparent border-b border-b-quaternary dark:border-b-primary-300/23 lg:dark:border-b-primary-300/28 hover:bg-primary-300/10 dark:hover:bg-primary-300/7 px-14 lg:px-12 xs:px-10 pt-8 lg:pt-6 pb-11 lg:pb-8 scroll-mt-28! transition select-none cursor-pointer"
      >
         <div className="flex items-center gap-4">
            <div className="flex items-center xs:grid xs:grid-cols-1 gap-2 xs:gap-y-px lg:text-[1.1rem] md:text-xl">
               <span className="font-bold md:hidden">
                  {user.username ? user.username : user.name}
               </span>
               <p className="text-primary-400 md:hidden">
                  {comment.isReply ? t('user-replied') : t('user-commented')}{' '}
                  {repliedTo ? (
                     <>
                        {repliedTo.id === comment.user_id ? (
                           <span>{t('user-replied-to-himself')}</span>
                        ) : (
                           <>
                              <span className="mr-1.5">{t('user-to')}</span>
                              <span className="font-bold text-text mr-1.5">
                                 {repliedTo.username
                                    ? repliedTo.username
                                    : repliedTo.name}
                              </span>
                              <span>{t('user-on')}</span>
                           </>
                        )}
                     </>
                  ) : (
                     ''
                  )}
               </p>
               <span className="text-accent font-medium dark:font-normal text-nowrap">
                  {title.length > 40 ? `${title.slice(0, 40)}...` : title}
               </span>
               <span className="text-primary-400 lg:hidden md:block xs:hidden">
                  •
               </span>
               <span className="font-thin text-primary-400 lg:hidden md:block text-nowrap">
                  {date}
               </span>
            </div>
         </div>

         <p
            className={`${ebGaramond.className} text-[1.35rem] lg:text-xl md:text-[1.62rem] xs:text-[1.5rem] xs:leading-[1.4] whitespace-pre-line`}
         >
            {comment.content}
         </p>
      </Link>
   );
}

export default UserComment;
