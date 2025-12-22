import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(req) {
   const auth = req.headers.get('authorization');

   if (auth !== `Bearer ${process.env.REVALIDATE_SECRET}`) {
      return new Response('Unauthorized', { status: 401 });
   }

   const { slug, changes } = await req.json();

   if (changes.content || changes.metadata) {
      revalidateTag(`article-${slug}`, 'max');
   }

   if (changes.metadata) {
      const locales = ['en', 'sr'];

      locales.forEach((locale) => {
         revalidatePath(`/${locale}`);
         revalidatePath(`/${locale}/archive`);
      });
   }

   return Response.json({ revalidated: true });
}
