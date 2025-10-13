import { supabase } from '@/src/lib/supabase';

export async function getArticles() {
   const { data, error } = await supabase
      .from('articles')
      .select(
         'id, category_id, created_at, title, image, description, author_id, featured, language, code, slug, updated_at, authors (full_name), categories(*)'
      )
      .eq('status', 'published')
      .order('id', { ascending: false });

   if (error) throw new Error('Articles could not be loaded');

   return data;
}

export async function getArticle(slug) {
   const { data, error } = await supabase
      .from('articles')
      .select(
         '*, categories (*), authors (*), likes(*), comments (*, replies (*))'
      )
      .eq('slug', slug)
      .single();

   if (error) throw new Error('Article could not be loaded');

   return data;
}

export async function getMainArticles() {
   const { data, error } = await supabase
      .from('articles')
      .select('id, title, image, description, language, slug')
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
      .select('*, likes(id, type)')
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

export async function getComments() {
   const { data, error } = await supabase
      .from('comments')
      .select('*, replies (*, articles (title, slug)), articles (title, slug)')
      .order('id', { ascending: false });

   if (error) throw new Error('Comments could not be loaded');

   return data;
}

export async function getBookmarks(userID) {
   const { data, error } = await supabase
      .from('bookmarks')
      .select(
         '*, articles (id, created_at, title, image, category_id, slug, categories(*))'
      )
      .eq('user_id', userID);

   if (error) throw new Error('Bookmarks could not be loaded');

   return data;
}

export async function isBookmarked(articleID, userID) {
   if (!userID) return false;

   const { data, error } = await supabase
      .from('bookmarks')
      .select('id')
      .eq('article_id', articleID)
      .eq('user_id', userID);

   if (error) throw new Error('Bookmarks could not be loaded');

   return data.length > 0;
}

export async function getBookmarksCount(articleID, userID) {
   if (articleID) {
      const { count, error } = await supabase
         .from('bookmarks')
         .select('id', { count: 'exact', head: true })
         .eq('article_id', articleID);

      if (error) throw new Error('Bookmarks count could not be loaded');

      return count || 0;
   }

   if (userID) {
      const { count, error } = await supabase
         .from('bookmarks')
         .select('id', { count: 'exact', head: true })
         .eq('user_id', userID);

      if (error) throw new Error('Bookmarks count count could not be loaded');

      return count || 0;
   }
}

export async function getSettings() {
   const { data, error } = await supabase.from('settings').select().single();

   if (error) throw new Error('Setting could not be loaded');

   return data;
}
