import ArticleTemplate, {
   getArticleSubject,
} from '@/src/ui/email/article-template';

import { supabaseAdmin } from '@/src/lib/supabase-admin';
import { resend } from '@/src/lib/resend';

export async function POST(request) {
   // Verify the request is from your CMS
   const secret = request.headers.get('x-api-secret');
   if (secret !== process.env.CMS_API_SECRET) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
   }

   const article = await request.json();

   // Fetch all subscribers
   const { data: subscribers, error } = await supabaseAdmin
      .from('subscribers')
      .select('email, locale, unsubscribe_token');

   if (error) return Response.json({ error: 'DB error' }, { status: 500 });

   // Send to each subscriber
   const results = await Promise.allSettled(
      subscribers.map((subscriber) => {
         const formattedDate = new Date(article.created_at).toLocaleDateString(
            subscriber.locale === 'sr' ? 'sr-Latn-RS' : 'en-US',
            { year: 'numeric', month: 'long', day: 'numeric' },
         );

         return resend.emails.send({
            from: `${subscriber.locale === 'sr' ? 'Етос' : 'Ethos'} <support@updates.ethos-blog.com>`,
            to: subscriber.email,
            subject: getArticleSubject(article.title, subscriber.locale),
            react: ArticleTemplate({
               article: { ...article, created_at: formattedDate },
               locale: subscriber.locale,
               unsubscribeUrl: `${process.env.WEBSITE_URL}/unsubscribe?token=${subscriber.unsubscribe_token}`,
            }),
         });
      }),
   );

   const failed = results.filter((r) => r.status === 'rejected').length;

   return Response.json(
      {
         sent: subscribers.length - failed,
         failed,
      },
      {
         headers: {
            'Access-Control-Allow-Origin': process.env.CMS_URL,
         },
      },
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
