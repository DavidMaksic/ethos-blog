import { supabase } from '@/src/lib/supabase';
import { cache } from 'react';

export const getArticles = cache(async () => {
   const { data, error } = await supabase
      .from('articles')
      .select(
         'id, categoryID, created_at, title, image, description, author_id, featured, language, slug, updated_at'
      )
      .eq('status', 'published')
      .order('id', { ascending: false });

   if (error) throw new Error('Articles could not be loaded');

   return data;
});

export const getArticle = cache(async (slug) => {
   const { data, error } = await supabase
      .from('articles')
      .select()
      .eq('slug', slug)
      .single();

   if (error) throw new Error('Article could not be loaded');

   return data;
});

export const getMainArticles = cache(async () => {
   const { data, error } = await supabase
      .from('articles')
      .select('id, title, image, description, language, slug')
      .eq('status', 'published')
      .eq('main_feature', 'true')
      .order('index');

   if (error) throw new Error('Articles could not be loaded');

   return data;
});

export const getCategories = cache(async () => {
   const { data, error } = await supabase.from('categories').select();

   if (error) throw new Error('Categories could not be loaded');
   return data;
});

export const getAuthors = cache(async () => {
   const { data, error } = await supabase
      .from('authors')
      .select()
      .order('id', { ascending: true });

   if (error) throw new Error('Authors could not be loaded');

   return data;
});

export const getUser = cache(async (email) => {
   const { data, error } = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .maybeSingle();

   if (error) throw new Error('User could not be loaded');

   return data;
});

export const getUsers = cache(async () => {
   const { data, error } = await supabase.from('users').select();

   if (error) throw new Error('User could not be created');

   return data;
});

export async function createUser(newUser) {
   const { data, error } = await supabase.from('users').insert([newUser]);

   if (error) throw new Error('User could not be created');

   return data;
}

export const getComments = cache(async () => {
   const { data, error } = await supabase
      .from('comments')
      .select()
      .order('id', { ascending: false });

   if (error) throw new Error('Comments could not be loaded');

   return data;
});

export const getReplies = cache(async () => {
   const { data, error } = await supabase
      .from('replies')
      .select()
      .order('id', { ascending: true });

   if (error) throw new Error('Replies could not be loaded');

   return data;
});

export const getSettings = cache(async () => {
   const { data, error } = await supabase.from('settings').select().single();

   if (error) throw new Error('Setting could not be updated');

   return data;
});
