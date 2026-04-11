'use server';

import {
   usernameSchema,
   commentSchema,
   subscribeSchema,
} from '@/src/lib/schemas';
import WelcomeEmail, {
   getWelcomeSubject,
} from '@/src/ui/email/welcome-template';

import { revalidatePath, updateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';
import { supabaseAdmin } from './supabase-admin';
import { randomUUID } from 'crypto';
import { headers } from 'next/headers';
import { resend } from '@/src/lib/resend';
import { auth } from '@/src/lib/auth';
import { z } from 'zod';

export async function updateUser(previousState, formData) {
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) throw new Error('You must be logged in');

   const t = await getTranslations('Auth');
   const rawUsername = formData.get('username');
   const schema = usernameSchema(t);
   const parsed = schema.safeParse({ username: rawUsername });

   if (!parsed.success) {
      const usernameError = parsed.error.issues.find(
         (issue) => issue.path[0] === 'username',
      )?.message;

      return {
         success: false,
         error: usernameError ?? 'Invalid username',
      };
   }

   const { username } = parsed.data;

   const { error } = await auth.api.updateUser({
      headers: await headers(),
      body: { name: username },
   });

   if (error) throw new Error('Username could not be updated');

   revalidatePath('/user/settings');
   return { success: true };
}

export async function updateImage(previousState, formData) {
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) throw new Error('You must be logged in');

   const userID = session.user.id;
   const newImage = formData.get('newImage');
   const oldImage = formData.get('oldImage');

   if (!newImage) {
      throw new Error('No file uploaded or invalid type');
   }

   const fileName = `user_image-${userID}-${Math.random()}`;

   // 1. Upload user image
   const { error: imageUploadError } = await supabaseAdmin.storage
      .from('user-images')
      .upload(fileName, newImage);

   if (imageUploadError) throw new Error(imageUploadError.message);

   // 2. Update image field in user
   const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/user-images/${fileName}`;

   const { error: profileImageError } = await auth.api.updateUser({
      headers: await headers(),
      body: { image: imageUrl },
   });

   if (profileImageError) throw new Error(profileImageError.message);

   // 3. Delete the already present image
   if (oldImage) {
      const image = oldImage.slice(78);

      const { error } = await supabaseAdmin.storage
         .from('user-images')
         .remove([image]);

      if (error) throw new Error(error.message);
   }

   revalidatePath('/user/settings');
   return { success: true };
}

export async function addBookmark(articleID, slug) {
   const session = await auth.api.getSession({
      headers: await headers(),
   });

   if (!session) throw new Error('You must be logged in');
   const userID = session.user.id;

   const { error } = await supabaseAdmin.from('bookmarks').insert([
      {
         user_id: userID,
         article_id: articleID,
      },
   ]);

   if (error) throw new Error('Article could not be bookmarked');
   updateTag(`article-${slug}`);
}

export async function removeBookmark(articleID, slug) {
   const session = await auth.api.getSession({
      headers: await headers(),
   });

   if (!session) throw new Error('You must be logged in');
   const userID = session.user.id;

   const { error } = await supabaseAdmin
      .from('bookmarks')
      .delete()
      .eq('user_id', userID)
      .eq('article_id', articleID);

   if (error) throw new Error('Bookmark could not be removed');
   updateTag(`article-${slug}`);
}

export async function addComment(previousState, formData, commentLength) {
   const t = await getTranslations('CommentErrors');

   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) throw new Error('You must be logged in');

   const userID = session.user.id;
   const rawContent = formData.get('content');
   const articleID = formData.get('articleID');
   const slug = formData.get('slug');

   const schema = commentSchema(t, commentLength);
   const parsed = schema.safeParse({
      content: rawContent,
   });

   if (!parsed.success) {
      const contentErrors = parsed.error.issues.filter(
         (issue) => issue.path[0] === 'content',
      );

      const contentError =
         contentErrors.length > 0
            ? contentErrors[contentErrors.length - 1].message
            : 'Invalid comment';

      return {
         success: false,
         error: contentError ?? 'Invalid comment',
         id: Math.random(),
      };
   }

   const { content } = parsed.data;
   const { error } = await supabaseAdmin.from('comments').insert({
      content,
      article_id: articleID,
      user_id: userID,
   });

   if (error) throw new Error('Comment could not be posted');

   updateTag(`article-${slug}`);
   return { success: true };
}

export async function editComment(commentID, text, slug, commentLength) {
   const t = await getTranslations('CommentErrors');

   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) throw new Error('You must be logged in');

   const userID = session.user.id;
   const schema = commentSchema(t, commentLength);
   const parsed = schema.safeParse({ content: text });

   if (!parsed.success) {
      const contentErrors = parsed.error.issues.filter(
         (issue) => issue.path[0] === 'content',
      );
      const contentError =
         contentErrors.length > 0
            ? contentErrors[contentErrors.length - 1].message
            : 'Invalid comment';

      return { success: false, error: contentError ?? 'Invalid comment' };
   }

   const { content } = parsed.data;

   const { error } = await supabaseAdmin
      .from('comments')
      .update({ content })
      .eq('id', commentID)
      .eq('user_id', userID);

   if (error) throw new Error('Comment could not be edited');

   updateTag(`article-${slug}`);
   return { success: true };
}

export async function deleteComment(commentID, slug) {
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) throw new Error('You must be logged in');

   const userID = session.user.id;
   const { error } = await supabaseAdmin
      .from('comments')
      .delete()
      .eq('id', commentID)
      .eq('user_id', userID);

   if (error) throw new Error('Comment could not be deleted');

   updateTag(`article-${slug}`);
   return { success: true };
}

export async function addReply(previousState, formData, commentLength) {
   const t = await getTranslations('CommentErrors');

   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) throw new Error('You must be logged in');

   const userID = session.user.id;
   const rawContent = formData.get('content');
   const articleID = formData.get('articleID');
   const commentID = formData.get('commentID');
   const slug = formData.get('slug');

   const schema = commentSchema(t, commentLength);
   const parsed = schema.safeParse({
      content: rawContent,
   });

   if (!parsed.success) {
      const contentErrors = parsed.error.issues.filter(
         (issue) => issue.path[0] === 'content',
      );

      const contentError =
         contentErrors.length > 0
            ? contentErrors[contentErrors.length - 1].message
            : 'Invalid comment';

      return {
         success: false,
         error: contentError ?? 'Invalid comment',
         id: Math.random(),
      };
   }

   const { content } = parsed.data;

   const { error } = await supabaseAdmin.from('replies').insert({
      content,
      comment_id: commentID,
      article_id: articleID,
      user_id: userID,
   });

   if (error) throw new Error('Reply could not be posted');

   updateTag(`article-${slug}`);
   return { success: true };
}

export async function editReply(replyID, text, slug, commentLength) {
   const t = await getTranslations('CommentErrors');

   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) throw new Error('You must be logged in');

   const userID = session.user.id;
   const schema = commentSchema(t, commentLength);
   const parsed = schema.safeParse({ content: text });

   if (!parsed.success) {
      const contentErrors = parsed.error.issues.filter(
         (issue) => issue.path[0] === 'content',
      );
      const contentError =
         contentErrors.length > 0
            ? contentErrors[contentErrors.length - 1].message
            : 'Invalid reply';

      return { success: false, error: contentError ?? 'Invalid reply' };
   }

   const { content } = parsed.data;

   const { error } = await supabaseAdmin
      .from('replies')
      .update({ content })
      .eq('id', replyID)
      .eq('user_id', userID);

   if (error) throw new Error('Reply could not be edited');

   updateTag(`article-${slug}`);
   return { success: true };
}

export async function deleteReply(replyID, slug) {
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) throw new Error('You must be logged in');

   const userID = session.user.id;
   const { error } = await supabaseAdmin
      .from('replies')
      .delete()
      .eq('id', replyID)
      .eq('user_id', userID);

   if (error) throw new Error('Reply could not be deleted');

   updateTag(`article-${slug}`);
   return { success: true };
}

export async function addLiked(articleID, type, slug, targetID) {
   const session = await auth.api.getSession({
      headers: await headers(),
   });

   if (!session) throw new Error('You must be logged in');
   const userID = session.user.id;

   if (type === 'article') {
      const { error } = await supabaseAdmin.from('likes').insert([
         {
            user_id: userID,
            article_id: articleID,
            target_id: articleID,
            type,
         },
      ]);

      if (error) throw new Error('Article could not be liked');
      updateTag(`article-${slug}`);
      return;
   }

   if (type === 'comment' || type === 'reply') {
      const { error } = await supabaseAdmin.from('likes').insert([
         {
            user_id: userID,
            article_id: articleID,
            target_id: targetID,
            type,
         },
      ]);

      if (error) throw new Error('Article could not be liked');
      updateTag(`article-${slug}`);
   }
}

export async function removeLiked(articleID, type, slug) {
   const session = await auth.api.getSession({
      headers: await headers(),
   });

   if (!session) throw new Error('You must be logged in');
   const userID = session.user.id;

   const { error } = await supabaseAdmin
      .from('likes')
      .delete()
      .eq('user_id', userID)
      .eq('article_id', articleID)
      .eq('type', type);

   if (error) throw new Error('Article could not be disliked');
   updateTag(`article-${slug}`);
}

export async function subscribeToNewsletter(prevState, formData) {
   const parsed = subscribeSchema.safeParse({
      email: formData.get('email'),
      locale: formData.get('locale'),
   });

   if (!parsed.success) {
      return { success: false, error: 'Invalid email', id: Date.now() };
   }

   const { email, locale } = parsed.data;

   try {
      const unsubscribe_token = randomUUID();

      const { data, error } = await supabaseAdmin
         .from('subscribers')
         .insert({ email, locale, unsubscribe_token })
         .select('id')
         .single();

      // Ignore duplicate email conflict
      if (error) {
         if (error.code === '23505') {
            return {
               success: false,
               error: 'already_subscribed',
               id: Date.now(),
            };
         }
         throw error;
      }

      if (data) {
         await resend.emails.send({
            from: `${locale === 'sr' ? 'Етос' : 'Ethos'} <support@updates.ethos-blog.com>`,
            to: email,
            subject: getWelcomeSubject(locale),
            react: WelcomeEmail({
               locale,
               unsubscribeUrl: `https://ethos-blog.com/unsubscribe?token=${unsubscribe_token}`,
            }),
         });
      }

      return { success: true };
   } catch (err) {
      console.error(err);
      return { success: false, error: 'Something went wrong', id: Date.now() };
   }
}

export async function unsubscribe(token) {
   const parsed = z.string().uuid().safeParse(token);
   if (!parsed.success) return { success: false };

   const { error } = await supabaseAdmin
      .from('subscribers')
      .delete()
      .eq('unsubscribe_token', token);

   if (error) return { success: false };
   return { success: true };
}
