import { render } from '@react-email/components';
import WelcomeTemplate from '@/src/ui/email/welcome-template';

export async function GET() {
   const html = await render(
      WelcomeTemplate({
         locale: 'en',
         unsubscribeUrl: 'https://ethos-blog.com/unsubscribe?token=test',
      }),
   );

   return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
   });
}
