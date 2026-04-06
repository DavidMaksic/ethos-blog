import ArticleTemplate from '@/src/ui/email/article-template';
import { supabaseAdmin } from '@/src/lib/supabase-admin';
import { resend } from '@/src/lib/resend';

const BATCH_SIZE = 100;

function chunkArray(array, size) {
   const chunks = [];
   for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
   }
   return chunks;
}

export async function POST(request) {
   const secret = request.headers.get('x-api-secret');
   if (secret !== process.env.CMS_API_SECRET) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
   }

   const article = await request.json();

   const { data: subscribers, error } = await supabaseAdmin
      .from('subscribers')
      .select('email, locale, unsubscribe_token')
      .eq('locale', article.code);

   if (error) return Response.json({ error: 'DB error' }, { status: 500 });

   const emails = subscribers.map((subscriber) => {
      const formattedDate = new Date(article.created_at).toLocaleDateString(
         subscriber.locale === 'sr' ? 'sr-Latn-RS' : 'en-US',
         { year: 'numeric', month: 'long', day: 'numeric' },
      );

      return {
         from: `${subscriber.locale === 'sr' ? 'Етос' : 'Ethos'} <support@updates.ethos-blog.com>`,
         to: subscriber.email,
         subject: article.title,
         react: ArticleTemplate({
            article: { ...article, created_at: formattedDate },
            locale: subscriber.locale,
            unsubscribeUrl: `${process.env.WEBSITE_URL}/unsubscribe?token=${subscriber.unsubscribe_token}`,
         }),
      };
   });

   const chunks = chunkArray(emails, BATCH_SIZE);

   const results = await Promise.allSettled(
      chunks.map((chunk) => resend.batch.send(chunk)),
   );

   const sent = results
      .filter((r) => r.status === 'fulfilled')
      .reduce((acc, r) => acc + (r.value?.data?.length ?? 0), 0);

   const failed = results
      .filter((r) => r.status === 'rejected')
      .reduce((acc) => acc + BATCH_SIZE, 0);

   return Response.json(
      { sent, failed },
      { headers: { 'Access-Control-Allow-Origin': process.env.CMS_URL } },
   );
}

export async function OPTIONS() {
   return new Response(null, {
      headers: {
         'Access-Control-Allow-Origin': process.env.CMS_URL,
         'Access-Control-Allow-Methods': 'POST, OPTIONS',
         'Access-Control-Allow-Headers': 'Content-Type, x-api-secret',
      },
   });
}
