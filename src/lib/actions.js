'use server';

import { auth, signIn, signOut } from '@/src/lib/auth';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/src/lib/supabase';

export async function signInAction() {
   await signIn('google', { redirectTo: '/user/home' });
}

export async function signOutAction() {
   await signOut({ redirectTo: '/' });
}

export async function updateUser(previousState, formData) {
   const session = await auth();
   if (!session) throw new Error('You must be logged in');

   const name = formData.get('username');

   const { error } = await supabase
      .from('users')
      .update({ username: name })
      .eq('id', session.user.userID);

   if (error) throw new Error('Username could not be updated');

   revalidatePath('/user/settings');
   return { success: true };
}

export async function updateImage(previousState, formData) {
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

export async function updateLikes(articleID, count, slug) {
   const { error } = await supabase
      .from('articles')
      .update({ likes: count })
      .eq('id', articleID);

   if (error) throw new Error('Article could not be liked');
   revalidatePath(`/${slug}`);
   revalidatePath(`/sr/${slug}`);
}

export async function addBookmark(user, articleID, slug) {
   const {
      data: [userBookmarks],
      error,
   } = await supabase.from('users').select('bookmarks').eq('id', user.userID);

   if (error) {
      throw new Error('Bookmarks could not be fetched');
   }

   const allIDs = JSON.parse(userBookmarks.bookmarks).filter(
      (item) => item !== articleID
   );

   const { error1 } = await supabase
      .from('users')
      .update({ bookmarks: [...allIDs, articleID] })
      .eq('id', user.userID);

   const { error2 } = await supabase.from('bookmarks').insert([
      {
         user_id: user.userID,
         article_id: articleID,
      },
   ]);

   if (error1 || error2) throw new Error('Article could not be bookmarked');
   revalidatePath(`/${slug}`);
   revalidatePath(`/sr/${slug}`);
}

export async function removeBookmark(user, articleID, slug) {
   const {
      data: [userBookmarks],
      error,
   } = await supabase.from('users').select('bookmarks').eq('id', user.userID);

   if (error) {
      throw new Error('Bookmarks could not be fetched');
   }

   const allIDs = JSON.parse(userBookmarks.bookmarks).filter(
      (item) => item !== articleID
   );

   const { error1 } = await supabase
      .from('users')
      .update({ bookmarks: [...allIDs] })
      .eq('id', user.userID);

   const { error2 } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', user.userID);

   if (error1 || error2) throw new Error('Bookmark could not be removed');
   revalidatePath(`/${slug}`);
   revalidatePath(`/sr/${slug}`);
}

export async function addComment(previousState, formData) {
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

   revalidatePath(`/${slug}`);
   revalidatePath(`/sr/${slug}`);
   return { success: true };
}

export async function deleteComment(commentID, slug) {
   const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentID);

   if (error) throw new Error('Comment could not be deleted');

   revalidatePath(`/${slug}`);
   revalidatePath(`/sr/${slug}`);
   return { success: true };
}

export async function commentLikes(commentID, count, slug) {
   const { error } = await supabase
      .from('comments')
      .update({ likes: count })
      .eq('id', commentID);

   if (error) throw new Error('Comment could not be liked');
   revalidatePath(`/${slug}`);
   revalidatePath(`/sr/${slug}`);
}

export async function replyLikes(replyID, count, slug) {
   const { error } = await supabase
      .from('replies')
      .update({ likes: count })
      .eq('id', replyID);

   if (error) throw new Error('Reply could not be liked');
   revalidatePath(`/${slug}`);
   revalidatePath(`/sr/${slug}`);
}

export async function addReply(previousState, formData) {
   const comment = formData.get('content');
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

   revalidatePath(`/${slug}`);
   revalidatePath(`/sr/${slug}`);
   return { success: true };
}

export async function deleteReply(replyID, slug) {
   const { error } = await supabase.from('replies').delete().eq('id', replyID);

   if (error) throw new Error('Reply could not be deleted');

   revalidatePath(`/${slug}`);
   revalidatePath(`/sr/${slug}`);
   return { success: true };
}

export async function addLiked(user, articleID) {
   const {
      data: [userLikedArticles],
      error,
   } = await supabase.from('users').select('liked').eq('id', user.userID);

   if (error) {
      throw new Error('Liked IDs could not be fetched');
   }

   const allIDs = JSON.parse(userLikedArticles.liked).filter(
      (item) => item !== articleID
   );

   const { error1 } = await supabase
      .from('users')
      .update({ liked: [...allIDs, articleID] })
      .eq('id', user.userID);

   if (error1) throw new Error('Liked ID could not be uploaded');
}

export async function removeLiked(user, articleID) {
   const {
      data: [userLikedArticles],
      error,
   } = await supabase.from('users').select('liked').eq('id', user.userID);

   if (error) {
      throw new Error('Liked IDs could not be fetched');
   }

   const allIDs = JSON.parse(userLikedArticles.liked).filter(
      (item) => item !== articleID
   );

   const { error1 } = await supabase
      .from('users')
      .update({ liked: [...allIDs] })
      .eq('id', user.userID);

   if (error1) throw new Error('Liked ID could not be uploaded');
}
