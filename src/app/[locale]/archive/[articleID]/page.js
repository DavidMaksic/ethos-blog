import {
   Cormorant_Garamond,
   Gentium_Book_Plus,
   Cormorant_SC,
   Crimson_Text,
   EB_Garamond,
   Parisienne,
} from 'next/font/google';
import {
   getCategories,
   getArticles,
   getComments,
   getSettings,
   getAuthors,
   getReplies,
   getArticle,
   getUsers,
   getUser,
} from '@/src/lib/data-service';
import { HiOutlineUserCircle } from 'react-icons/hi2';
import { format } from 'date-fns';
import { auth } from '@/src/lib/auth';

import OtherArticleOptions from '@/src/ui/articles/other-article-options';
import RelatedArticles from '@/src/ui/articles/related-articles';
import ArticleContent from '@/src/ui/articles/article-content';
import ArticleHeading from '@/src/ui/articles/article-heading';
import CommentInput from '@/src/ui/comments/comment-input';
import ArticleImage from '@/src/ui/articles/article-image';
import CommentList from '@/src/ui/comments/comment-list';
import RemoteImage from '@/src/ui/remote-image';
import Options from '@/src/ui/options';

const cormorantSC = Cormorant_SC({
   subsets: ['latin'],
   display: 'swap',
   weight: ['300', '400', '500', '600', '700'],
});

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

const parisienne = Parisienne({
   subsets: ['latin'],
   display: 'swap',
   weight: ['400'],
});

const gentium = Gentium_Book_Plus({
   subsets: ['cyrillic'],
   display: 'swap',
   style: ['normal', 'italic'],
   weight: ['400', '700'],
});

const crimsonText = Crimson_Text({
   subsets: ['latin'],
   display: 'swap',
   style: ['normal', 'italic'],
   weight: ['400', '600', '700'],
});

async function Page({ params, searchParams }) {
   const param = await params;
   const searchParam = await searchParams;

   // - Users and authors logic
   const session = await auth();
   const allUsers = await getUsers();
   const user = await getUser(session?.user?.email);

   const articles = await getArticles();
   const article = await getArticle(param?.articleID);

   const authors = await getAuthors();
   const author = authors?.find((item) => item.id === article.author_id);

   // - Comment logic
   const comments = await getComments();
   const filteredComments = comments.filter(
      (item) => item.article_id === article.id
   );

   let hasCommented;
   hasCommented = !!filteredComments.find((item) => item.user_id === user?.id);

   // - Reply logic
   const replies = await getReplies();
   const repliesInThisArticle = replies?.filter(
      (item) => item.article_id === article.id
   );

   let hasReplied;
   hasReplied = !!repliesInThisArticle.find(
      (item) => item.user_id === user?.id
   );

   // - Categories logic
   const categories = await getCategories();
   const category = categories?.find((item) => item.id === article?.categoryID);

   // - Other logic
   const { comment_length: commentLength } = await getSettings();
   const date = format(new Date(article.created_at), 'MMM dd, yyyy');
   const commentsNum = repliesInThisArticle?.length + filteredComments?.length;

   return (
      <main className="flex flex-col">
         <article
            className={`relative max-w-5xl xl:max-w-[46rem] md:max-w-full self-center flex flex-col gap-6 py-2 px-24 xl:px-0 pb-22 xl:pt-4 md:pt-6 sm:pt-4 transition-200 ${cormorantGaramond.variable} ${ebGaramond.variable}`}
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

            <ArticleContent
               content={article?.content}
               srbFont={gentium.className}
               engFont={crimsonText.className}
               article={article}
            />

            <div className="flex sm:flex-col gap-6 mt-12">
               <OtherArticleOptions
                  article={article}
                  session={session}
                  allUsers={allUsers}
                  user={user}
                  count={article.likes}
                  comments={filteredComments}
                  hasCommented={hasCommented}
                  hasReplied={hasReplied}
                  commentsNum={commentsNum}
               />

               <div className="size-full flex flex-col items-center self-center gap-4 bg-secondary dark:bg-primary-200 rounded-3xl px-12 xl:px-16! md:px-12! sm:px-11! py-12 pb-14 text-3xl box-shadow transition-bg_border">
                  <div className="relative size-28 md:size-30">
                     {author?.profile_image ? (
                        <RemoteImage
                           imageUrl={author.profile_image}
                           alt="User image"
                           styles="block aspect-square object-cover object-center rounded-full dark:opacity-90"
                        />
                     ) : (
                        <HiOutlineUserCircle className="size-30 stroke-[0.5px] text-primary-400/70 dark:text-primary-300" />
                     )}
                  </div>

                  <div className="flex flex-col gap-6 self-center text-center">
                     <div className="flex flex-col md:gap-1">
                        <span
                           className={`text-accent-400 dark:text-accent text-[2.5rem] md:text-5xl w-fit self-center ${parisienne.className}`}
                        >
                           {author.full_name}
                        </span>
                        <span
                           className={`text-xl text-primary-400 ${cormorantSC.className}`}
                        >
                           {date}
                        </span>
                     </div>

                     {author?.description_en || author?.description_srb ? (
                        <p className="text-xl md:text-2xl">
                           {article.language === 'English'
                              ? author.description_en
                              : author.description_srb}
                        </p>
                     ) : (
                        <p className="text-xl md:text-2xl">
                           {article.language === 'English'
                              ? 'Is an author writing for Ethos blog.'
                              : 'Је аутор који пише за Етос блог.'}
                        </p>
                     )}
                  </div>
               </div>
            </div>

            <CommentInput
               session={session}
               oldUser={session?.user}
               newUser={user}
               article={article}
               commentLength={commentLength}
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
