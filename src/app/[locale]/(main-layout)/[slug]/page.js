import {
   getBookmarks,
   getArticles,
   getSettings,
   getArticle,
   getUsers,
} from '@/src/lib/data-service';
import { getTranslations } from 'next-intl/server';
import { WEBSITE_URL } from '@/src/utils/config';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/src/i18n/routing';
import { format } from 'date-fns';

import OtherArticleOptions from '@/src/ui/articles/other-article-options';
import ArticleAuthorInfo from '@/src/ui/articles/article-author-info';
import RelatedArticles from '@/src/ui/articles/related-articles';
import ArticleOptions from '@/src/ui/articles/article-options';
import ArticleContent from '@/src/ui/articles/article-content';
import ArticleHeading from '@/src/ui/articles/article-heading';
import CommentInput from '@/src/ui/comments/comment-input';
import ArticleImage from '@/src/ui/articles/article-image';
import CommentList from '@/src/ui/comments/comment-list';
import ImageZoom from '@/src/ui/image-zoom';
import Options from '@/src/ui/options';

export const dynamic = 'force-static';
export const revalidate = 300;

export async function generateMetadata({ params }) {
   const [param, t] = await Promise.all([params, getTranslations()]);

   const { slug, locale } = param;
   const {
      title,
      description,
      image,
      authors: { full_name },
   } = await getArticle(slug);

   const prefix = locale === 'en' ? '' : `/${locale}`;

   return {
      title: title ? title : t('Page-descriptions.article-name'),
      description: description ? description : t('Page-descriptions.article'),
      alternates: {
         canonical: `${WEBSITE_URL}${prefix}/${slug}`,
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
         url: `${WEBSITE_URL}${prefix}/${slug}`,
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
   };
}

async function Page({ params }) {
   const [param, articles, allUsers, bookmarks, comment_length] =
      await Promise.all([
         params,
         getArticles(),
         getUsers(),
         getBookmarks(),
         getSettings(),
      ]);

   const { slug, locale } = param;

   if (!hasLocale(routing.locales, slug)) {
      notFound();
   }

   // - Article logic
   const article = await getArticle(slug);

   const {
      comments,
      image,
      title,
      description,
      categories: category,
      authors: author,
      created_at,
      updated_at,
   } = article;

   // - Other logic
   const date = format(new Date(article.created_at), 'MMM dd, yyyy');
   const prefix = locale === `en` ? '' : `/${locale}`;
   const replies = comments.map((item) => item.replies).flat();
   const commentsNum = replies?.length + comments?.length;

   const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      url: `${WEBSITE_URL}${prefix}/${slug}`,
      headline: title,
      description: description,
      author: {
         '@type': 'Person',
         name: author.full_name,
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
      mainEntityOfPage: {
         '@type': 'WebPage',
         '@id': `${WEBSITE_URL}${prefix}/${slug}`,
      },
   };

   return (
      <article className="flex flex-col">
         <div className="relative max-w-5xl 2xl:max-w-[46rem] md:max-w-full self-center flex flex-col gap-6 xs:gap-4 py-2 px-24 2xl:px-0 pb-22 2xl:pt-8 md:pt-6 sm:pt-4 transition-200">
            <ArticleHeading article={article} />

            <ArticleImage article={article} author={author} date={date}>
               <ArticleOptions
                  article={article}
                  comments={comments}
                  bookmarks={bookmarks}
               />
            </ArticleImage>

            <ImageZoom />
            <ArticleContent content={article?.content} article={article} />

            <ArticleAuthorInfo article={article} author={author} date={date}>
               <OtherArticleOptions
                  article={article}
                  comments={comments}
                  bookmarks={bookmarks}
                  commentsNum={commentsNum}
               />
            </ArticleAuthorInfo>

            <CommentInput
               article={article}
               commentLength={comment_length.comment_length}
            />

            <CommentList
               comments={comments}
               article={article}
               users={allUsers}
               commentsNum={commentsNum}
               commentLength={comment_length.comment_length}
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

         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
            }}
         />
      </article>
   );
}

export default Page;
