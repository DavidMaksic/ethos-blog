import { supabase } from '@/src/lib/supabase';

export async function getArticles() {
   const { data, error } = await supabase
      .from('articles')
      .select(
         'id, category_id, created_at, title, image, description, author_id, featured, code, slug, updated_at, authors (full_name), categories(*)',
      )
      .eq('status', 'published')
      .order('id', { ascending: false });

   if (error) throw new Error('Articles could not be loaded');

   return data;
}

export async function getArticle(slug) {
   const url = `${process.env.SUPABASE_URL}/rest/v1/articles?select=*,categories(*),authors(*),likes(*),comments(*,replies(*))&comments.order=created_at.asc&comments.replies.order=created_at.asc&slug=eq.${slug}`;

   const res = await fetch(url, {
      headers: {
         apikey: process.env.SUPABASE_KEY,
         Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
      },
      next: {
         tags: [`article-${slug}`],
      },
   });

   if (!res.ok) throw new Error('Failed to fetch article');
   const data = await res.json();
   return data[0];
}

export async function getMainArticles() {
   const { data, error } = await supabase
      .from('articles')
      .select('id, title, image, description, slug, code')
      .eq('status', 'published')
      .eq('main_feature', 'true')
      .order('index');

   if (error) throw new Error('Articles could not be loaded');

   return data;
}

export async function getCategories() {
   const { data, error } = await supabase
      .from('categories')
      .select('*, articles ( id )')
      .eq('articles.status', 'published');

   if (error) throw new Error('Categories could not be loaded');
   return data;
}

export async function getAuthors() {
   const { data, error } = await supabase
      .from('authors')
      .select()
      .order('id', { ascending: true });

   if (error) throw new Error('Authors could not be loaded');

   return data;
}

export async function getUser(email) {
   const { data, error } = await supabase
      .from('users')
      .select(
         '*, likes(id, type), bookmarks(*), comments(*, articles (title, slug)), replies(*, articles (title, slug), comments(user_id))',
      )
      .eq('email', email)
      .maybeSingle();

   if (error) throw new Error('User could not be loaded');

   return data;
}

export async function getUsers() {
   const { data, error } = await supabase.from('users').select();

   if (error) throw new Error('User could not be created');

   return data;
}

export async function createUser(newUser) {
   const { data, error } = await supabase.from('users').insert([newUser]);

   if (error) throw new Error('User could not be created');

   return data;
}

export async function getBookmarks() {
   const { data, error } = await supabase.from('bookmarks').select();

   if (error) throw new Error('Bookmarks could not be loaded');

   return data;
}

export async function getBookmarksByID(userID) {
   const { data, error } = await supabase
      .from('bookmarks')
      .select(
         '*, articles (id, created_at, title, image, category_id, slug, categories(*))',
      )
      .eq('user_id', userID);

   if (error) throw new Error('Bookmarks could not be loaded');

   return data;
}

export async function getSettings() {
   const { data, error } = await supabase.from('settings').select().single();

   if (error) throw new Error('Setting could not be loaded');

   return data;
}
