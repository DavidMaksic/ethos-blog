import { revalidatePath, revalidateTag } from 'next/cache';
import { LOCALES_ALT } from '@/src/utils/config';

export async function POST(req) {
   const auth = req.headers.get('authorization');
   if (auth !== `Bearer ${process.env.REVALIDATE_SECRET}`) {
      return new Response('Unauthorized', { status: 401 });
   }

   try {
      const { slug, changes } = await req.json();
      console.log('Revalidate called with:', { slug, changes });
      s;

      // 1. Handle featuring
      if (changes?.action === 'feature-update') {
         LOCALES_ALT.forEach((locale) => {
            revalidatePath(`/${locale}`);
         });
      }

      // 2. Handle creation or deletion
      if (changes?.action === 'delete' || changes?.action === 'create') {
         LOCALES_ALT.forEach((locale) => {
            revalidatePath(`/${locale}`);
            revalidatePath(`/${locale}/archive`);
         });
      }

      // 3. Handle update
      if (changes?.action === 'update') {
         if (changes?.content || changes?.metadata) {
            revalidateTag(`article-${slug}`, 'max');
         }

         if (changes?.metadata) {
            LOCALES_ALT.forEach((locale) => {
               revalidatePath(`/${locale}`);
               revalidatePath(`/${locale}/archive`);
            });
         }
      }

      return new Response(JSON.stringify({ revalidated: true }), {
         status: 200,
         headers: { 'Content-Type': 'application/json' },
      });
   } catch (err) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
         status: 400,
      });
   }
}
