import {
   getBookmarksCount,
   isBookmarked,
   getArticles,
   getSettings,
   getArticle,
   getUsers,
   getUser,
} from '@/src/lib/data-service';
import { getTranslations } from 'next-intl/server';
import { WEBSITE_URL } from '@/src/utils/config';
import { format } from 'date-fns';
import { auth } from '@/src/lib/auth';

import OtherArticleOptions from '@/src/ui/articles/other-article-options';
import ArticleAuthorInfo from '@/src/ui/articles/article-author-info';
import RelatedArticles from '@/src/ui/articles/related-articles';
import ArticleContent from '@/src/ui/articles/article-content';
import ArticleHeading from '@/src/ui/articles/article-heading';
import CommentInput from '@/src/ui/comments/comment-input';
import ArticleImage from '@/src/ui/articles/article-image';
import CommentList from '@/src/ui/comments/comment-list';
import Options from '@/src/ui/options';
import ArticleOptions from '@/src/ui/articles/article-options';

export async function generateMetadata({ params }) {
   const [param, t] = await Promise.all([params, getTranslations()]);

   const { slug, locale } = param;
   const {
      title,
      description,
      image,
      created_at,
      updated_at,
      authors: { full_name },
   } = await getArticle(slug);

   const path = locale === 'en' ? '' : `/${locale}`;

   const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      url: `${WEBSITE_URL}${path}/${slug}`,
      headline: title,
      description: description,
      author: {
         '@type': 'Person',
         name: full_name,
      },
      datePublished: created_at,
      dateModified: updated_at,
      image: {
         '@type': 'ImageObject',
         url: image,
         width: 1200,
         height: 628,
      },
      keywords: ['Ethos Blog', 'Blog post', 'Article'],
   };

   return {
      title: title ? title : t('Page-descriptions.article-name'),
      description: description ? description : t('Page-descriptions.article'),
      alternates: {
         canonical: `${WEBSITE_URL}${path}/${slug}`,
         languages: {
            en: `${WEBSITE_URL}/${slug}`,
            sr: `${WEBSITE_URL}/sr/${slug}`,
         },
      },
      creator: full_name,
      openGraph: {
         title: title ? title : t('Page-descriptions.article-name'),
         description: description
            ? description
            : t('Page-descriptions.article'),
         url: `${WEBSITE_URL}${path}/${slug}`,
         siteName: t('Logo'),
         locale: locale,
         type: 'website',
         images: [
            {
               url: image,
               width: 1200,
               height: 630,
               alt: title,
            },
         ],
      },
      twitter: {
         card: 'summary_large_image',
         title: title ? title : t('Page-descriptions.article-name'),
         description: description
            ? description
            : t('Page-descriptions.article'),
         images: [image],
      },
      other: {
         'script:ld+json': JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      },
   };
}

async function Page({ params, searchParams }) {
   const [param, searchParam, session, articles, allUsers, comment_length] =
      await Promise.all([
         params,
         searchParams,
         auth(),
         getArticles(),
         getUsers(),
         getSettings(),
      ]);

   // - Article logic
   const [user, article] = await Promise.all([
      getUser(session?.user?.email),
      getArticle(param?.slug),
   ]);

   const { id, comments, categories: category, authors: author } = article;

   // - Comment logic
   let hasCommented;
   hasCommented = !!comments.find((item) => item.user_id === user?.id);

   // - Reply logic
   let hasReplied;
   const replies = comments.map((item) => item.replies).flat();
   hasReplied = !!replies.find((item) => item.user_id === user?.id);

   // - Bookmark logic
   const [hasBookmarked, bookmarkCount] = await Promise.all([
      isBookmarked(user.id),
      getBookmarksCount(id),
   ]);

   // - Other logic
   const date = format(new Date(article.created_at), 'MMM dd, yyyy');
   const commentsNum = replies?.length + comments?.length;

   return (
      <article className="flex flex-col">
         <div className="relative max-w-5xl 2xl:max-w-[46rem] md:max-w-full self-center flex flex-col gap-6 xs:gap-4 py-2 px-24 2xl:px-0 pb-22 2xl:pt-8 md:pt-6 sm:pt-4 transition-200">
            <ArticleHeading article={article} />

            <ArticleImage article={article} author={author} date={date}>
               <ArticleOptions
                  slug={article.slug}
                  articleID={article.id}
                  count={article.likes}
                  session={session}
                  hasCommented={hasCommented}
                  hasReplied={hasReplied}
                  hasBookmarked={hasBookmarked}
               />
            </ArticleImage>

            <ArticleContent content={article?.content} article={article} />

            <ArticleAuthorInfo article={article} author={author} date={date}>
               <OtherArticleOptions
                  article={article}
                  session={session}
                  comments={comments}
                  hasReplied={hasReplied}
                  hasCommented={hasCommented}
                  hasBookmarked={hasBookmarked}
                  bookmarkCount={bookmarkCount}
                  commentsNum={commentsNum}
               />
            </ArticleAuthorInfo>

            <CommentInput
               session={session}
               oldUser={session?.user}
               newUser={user}
               article={article}
               commentLength={comment_length.comment_length}
            />

            <CommentList
               session={session}
               comments={comments}
               param={searchParam}
               articleID={article.id}
               users={allUsers}
               newUser={user}
               commentsNum={commentsNum}
               author={author}
            />

            <RelatedArticles
               articles={articles}
               category={category}
               title={article.title}
               author={author}
            />

            <Options />
         </div>
      </article>
   );
}

export default Page;
