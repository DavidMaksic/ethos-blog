import { render } from '@react-email/components';
import ResetPasswordTemplate from '@/src/ui/email/reset-password-template';

export async function GET() {
   const html = await render(
      ResetPasswordTemplate({
         user: {
            name: 'David',
            email: 'test@gmail.com',
         },
         url: 'https://ethos-blog.com/unsubscribe?token=test',
      }),
   );

   return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
   });
}
