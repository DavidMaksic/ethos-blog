import {
   getArticles,
   getCategories,
   getComments,
   getSettings,
   getAuthors,
   getReplies,
   getArticle,
   getUsers,
   getUser,
} from '@/src/lib/data-service';
import {
   Cormorant_Garamond,
   Crimson_Text,
   EB_Garamond,
} from 'next/font/google';
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

const ebGaramond = EB_Garamond({
   subsets: ['latin'],
   display: 'swap',
   style: ['normal', 'italic'],
   weight: ['400', '500', '600', '700', '800'],
   variable: '--font-ebGaramond',
});

const cormorantGaramond = Cormorant_Garamond({
   subsets: ['latin'],
   display: 'swap',
   weight: ['400', '500', '600', '700'],
   variable: '--font-cormorant-garamond',
});

const crimsonText = Crimson_Text({
   subsets: ['latin'],
   display: 'swap',
   style: ['normal', 'italic'],
   weight: ['400', '600', '700'],
   variable: '--font-crimson',
});

export async function generateMetadata({ params }) {
   const param = await params;
   const { title } = await getArticle(param.articleID);

   return {
      title: title ? title : 'Article',
   };
}

async function Page({ params, searchParams }) {
   const [
      param,
      searchParam,
      session,
      articles,
      allUsers,
      authors,
      comments,
      replies,
      categories,
      comment_length,
   ] = await Promise.all([
      params,
      searchParams,
      auth(),
      getArticles(),
      getUsers(),
      getAuthors(),
      getComments(),
      getReplies(),
      getCategories(),
      getSettings(),
   ]);

   // - Users and authors logic
   const user = await getUser(session?.user?.email);
   const article = await getArticle(param?.articleID);
   const author = authors?.find((item) => item.id === article.author_id);

   // - Comment logic
   const filteredComments = comments.filter(
      (item) => item.article_id === article.id
   );

   let hasCommented;
   hasCommented = !!filteredComments.find((item) => item.user_id === user?.id);

   // - Reply logic
   const repliesInThisArticle = replies?.filter(
      (item) => item.article_id === article.id
   );

   let hasReplied;
   hasReplied = !!repliesInThisArticle.find(
      (item) => item.user_id === user?.id
   );

   // - Categories logic
   const category = categories?.find((item) => item.id === article?.categoryID);

   // - Other logic
   const date = format(new Date(article.created_at), 'MMM dd, yyyy');
   const commentsNum = repliesInThisArticle?.length + filteredComments?.length;

   return (
      <main className="flex flex-col">
         <article
            className={`relative max-w-5xl 2xl:max-w-[46rem] md:max-w-full self-center flex flex-col gap-6 xs:gap-4 py-2 px-24 2xl:px-0 pb-22 2xl:pt-8 md:pt-6 sm:pt-4 transition-200 ${cormorantGaramond.variable} ${ebGaramond.variable} ${crimsonText.variable}`}
         >
            <ArticleHeading article={article} />

            <ArticleImage
               article={article}
               author={author}
               user={user}
               session={session}
               hasReplied={hasReplied}
               hasCommented={hasCommented}
               category={category}
               date={date}
            />

            <ArticleContent content={article?.content} article={article} />

            <ArticleAuthorInfo article={article} author={author} date={date}>
               <OtherArticleOptions
                  article={article}
                  session={session}
                  allUsers={allUsers}
                  user={user}
                  comments={filteredComments}
                  hasCommented={hasCommented}
                  hasReplied={hasReplied}
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
               comments={filteredComments}
               param={searchParam}
               articleID={article.id}
               users={allUsers}
               font={ebGaramond.className}
               replies={replies}
               repliesInThisArticle={repliesInThisArticle}
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
         </article>
      </main>
   );
}

export default Page;
