import {
   getArticleMetadata,
   getArticleSlugs,
   getBookmarks,
   getArticles,
   getSettings,
   getArticle,
} from '@/src/lib/data-service';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { WEBSITE_URL } from '@/src/utils/config';
import { format } from 'date-fns';

import OtherArticleOptions from '@/src/ui/articles/other-article-options';
import ArticleAuthorInfo from '@/src/ui/articles/article-author-info';
import CommentListHeader from '@/src/ui/header/comment-list-header';
import AnimationWrapper from '@/src/ui/articles/animation-wrapper';
import RelatedArticles from '@/src/ui/articles/related-articles';
import ArticleOptions from '@/src/ui/articles/article-options';
import ArticleContent from '@/src/ui/articles/article-content';
import ArticleHeading from '@/src/ui/articles/article-heading';
import CommentInput from '@/src/ui/comments/comment-input';
import ArticleImage from '@/src/ui/articles/article-image';
import CommentList from '@/src/ui/comments/comment-list';
import Options from '@/src/ui/operations/options';
import NotFound from '@/src/app/[locale]/(main-layout)/not-found';

export const dynamic = 'force-static';
export const revalidate = 604800;

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
   } = await getArticleMetadata(slug);

   const prefix = locale === 'en' ? '' : `/${locale}`;

   return {
      title: title ? title : t('Page-descriptions.article-name'),
      description: description ? description : t('Page-descriptions.article'),
      alternates: {
         canonical: `${WEBSITE_URL}${prefix}/${slug}`,
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
         type: 'article',
         publishedTime: created_at,
         modifiedTime: updated_at,
         authors: [full_name],
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

export async function generateStaticParams() {
   const articles = await getArticleSlugs();

   return articles.map((article) => ({
      locale: article.code,
      slug: article.slug,
   }));
}

async function Page({ params }) {
   const { slug, locale } = await params;
   setRequestLocale(locale);

   const [article, articles, bookmarks, comment_length, t] = await Promise.all([
      getArticle(slug),
      getArticles(),
      getBookmarks(),
      getSettings(),
      getTranslations(),
   ]);

   if (!article) return NotFound();

   const {
      comments,
      image,
      title,
      description,
      authors: author,
      created_at,
      updated_at,
      categories,
   } = article;

   // - Other logic
   const date = format(new Date(article.created_at), 'MMM dd, yyyy');
   const prefix = locale === 'en' ? '' : `/${locale}`;
   const replies = comments.map((item) => item.replies).flat();
   const commentsNum = replies?.length + comments?.length;

   const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      url: `${WEBSITE_URL}${prefix}/${slug}`,
      headline: title,
      description: description,
      publisher: {
         '@type': 'Organization',
         name: t('Logo'),
         url: WEBSITE_URL,
      },
      author: {
         '@type': 'Person',
         name: author.full_name,
         url: `${WEBSITE_URL}${prefix}/about`,
      },
      datePublished: created_at,
      dateModified: updated_at,
      image: {
         '@type': 'ImageObject',
         url: image,
         width: 1200,
         height: 628,
      },
      keywords: [categories.category, 'Ethos Blog'],
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

            <ArticleContent content={article?.content} article={article} />

            <ArticleAuthorInfo author={author} date={date}>
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

            <AnimationWrapper type="comments" comments={comments}>
               <CommentListHeader
                  comments={comments}
                  commentsNum={commentsNum}
               />
            </AnimationWrapper>

            <AnimationWrapper type="comments" comments={comments}>
               <CommentList
                  comments={comments}
                  article={article}
                  commentLength={comment_length.comment_length}
                  author={author}
               />
            </AnimationWrapper>

            <AnimationWrapper type="other">
               <RelatedArticles
                  article={article}
                  articles={articles}
                  author={author}
                  commentsNum={commentsNum}
               />
            </AnimationWrapper>

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
