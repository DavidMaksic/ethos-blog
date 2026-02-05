'use server';

import { revalidatePath, updateTag } from 'next/cache';
import { usernameSchema } from '@/src/utils/helpers';
import { supabase } from '@/src/lib/supabase';
import { headers } from 'next/headers';
import { auth } from '@/src/lib/auth';

export async function updateUser(previousState, formData) {
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) throw new Error('You must be logged in');

   const rawUsername = formData.get('username');
   const parsed = usernameSchema.safeParse({ username: rawUsername });

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

   const { error } = await supabase
      .from('users')
      .update({ username })
      .eq('id', session.user.userID);

   if (error) throw new Error('Username could not be updated');

   revalidatePath('/user/settings');
   return { success: true };
}

export async function updateImage(previousState, formData) {
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) throw new Error('You must be logged in');

   const newImage = formData.get('newImage');
   const oldImage = formData.get('oldImage');
   const userID = formData.get('userID');

   if (!newImage) {
      throw new Error('No file uploaded or invalid type');
   }

   const fileName = `user_image-${userID}-${Math.random()}`;

   // 1. Upload user image
   const { error: imageUploadError } = await supabase.storage
      .from('user-images')
      .upload(fileName, newImage);

   if (imageUploadError) throw new Error(imageUploadError.message);

   // 2. Update image field in user
   const { error: profileImageError } = await supabase
      .from('users')
      .update({
         image: `${process.env.SUPABASE_URL}/storage/v1/object/public/user-images/${fileName}`,
      })
      .eq('id', userID)
      .select();

   if (profileImageError) throw new Error(profileImageError.message);

   // 3. Delete the already present image
   if (oldImage) {
      const image = oldImage.slice(78);

      const { error } = await supabase.storage
         .from('user-images')
         .remove([image]);

      if (error) throw new Error(error.message);
   }

   revalidatePath('/user/settings');
   return { success: true };
}

export async function addBookmark(user, articleID, slug) {
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) throw new Error('You must be logged in');

   const { error } = await supabase.from('bookmarks').insert([
      {
         user_id: user.userID,
         article_id: articleID,
      },
   ]);

   if (error) throw new Error('Article could not be bookmarked');
   updateTag(`article-${slug}`);
}

export async function removeBookmark(user, articleID, slug) {
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) throw new Error('You must be logged in');

   const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', user.userID)
      .eq('article_id', articleID);

   if (error) throw new Error('Bookmark could not be removed');
   updateTag(`article-${slug}`);
}

export async function addComment(previousState, formData) {
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) throw new Error('You must be logged in');

   const comment = formData
      .get('content')
      .replace(/\n\s*\n+/g, '\n\n')
      .replace(/\s+$/, '');
   const userID = formData.get('userID');
   const slug = formData.get('slug');
   const articleID = formData.get('articleID');

   const { error } = await supabase.from('comments').insert({
      content: comment,
      article_id: articleID,
      user_id: userID,
   });

   if (error) throw new Error('Comment could not be posted');

   updateTag(`article-${slug}`);
   return { success: true };
}

export async function editComment(commentID, text, slug) {
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) throw new Error('You must be logged in');
   const cleanedText = text.replace(/\n\s*\n+/g, '\n\n').replace(/\s+$/, '');

   const { error } = await supabase
      .from('comments')
      .update({ content: cleanedText })
      .eq('id', commentID);

   if (error) throw new Error('Comment could not be edited');

   updateTag(`article-${slug}`);
   return { success: true };
}

export async function deleteComment(commentID, slug) {
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) throw new Error('You must be logged in');

   const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentID);

   if (error) throw new Error('Comment could not be deleted');

   updateTag(`article-${slug}`);
   return { success: true };
}

export async function addReply(previousState, formData) {
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) throw new Error('You must be logged in');

   const comment = formData
      .get('content')
      .replace(/\n\s*\n+/g, '\n\n')
      .replace(/\s+$/, '');
   const userID = formData.get('userID');
   const slug = formData.get('slug');
   const commentID = formData.get('commentID');
   const articleID = formData.get('articleID');

   const { error } = await supabase.from('replies').insert({
      content: comment,
      comment_id: commentID,
      article_id: articleID,
      user_id: userID,
   });

   if (error) throw new Error('Reply could not be posted');

   updateTag(`article-${slug}`);
   return { success: true };
}

export async function editReply(replyID, text, slug) {
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) throw new Error('You must be logged in');
   const cleanedText = text.replace(/\n\s*\n+/g, '\n\n').replace(/\s+$/, '');

   const { error } = await supabase
      .from('replies')
      .update({ content: cleanedText })
      .eq('id', replyID);

   if (error) throw new Error('Reply could not be edited');

   updateTag(`article-${slug}`);
   return { success: true };
}

export async function deleteReply(replyID, slug) {
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) throw new Error('You must be logged in');

   const { error } = await supabase.from('replies').delete().eq('id', replyID);

   if (error) throw new Error('Reply could not be deleted');

   updateTag(`article-${slug}`);
   return { success: true };
}

export async function addLiked(userID, articleID, type, slug, targetID) {
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) throw new Error('You must be logged in');

   if (type === 'article') {
      const { error } = await supabase.from('likes').insert([
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
      const { error } = await supabase.from('likes').insert([
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

export async function removeLiked(userID, articleID, type, slug) {
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) throw new Error('You must be logged in');

   const { error } = await supabase
      .from('likes')
      .delete()
      .eq('user_id', userID)
      .eq('article_id', articleID)
      .eq('type', type);

   if (error) throw new Error('Article could not be disliked');
   updateTag(`article-${slug}`);
}
