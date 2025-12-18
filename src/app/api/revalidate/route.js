import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(req) {
   const auth = req.headers.get('authorization');

   if (auth !== `Bearer ${process.env.REVALIDATE_SECRET}`) {
      return new Response('Unauthorized', { status: 401 });
   }

   const { slug, type } = await req.json();

   revalidateTag(`article-${slug}`);

   if (type === 'multiple-routes') {
      const locales = ['en', 'sr'];

      locales.forEach((locale) => {
         revalidatePath(`/${locale}`);
         revalidatePath(`/${locale}/archive`);
      });
   }

   return Response.json({ revalidated: true });
}
