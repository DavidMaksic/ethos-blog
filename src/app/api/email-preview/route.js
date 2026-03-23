import { render } from '@react-email/components';
import ArticleTemplate from '@/src/ui/email/article-template';

export async function GET() {
   const html = await render(
      ArticleTemplate({
         article: {
            title: 'Псеудо-историчари',
            description: 'Раскринкравање "праве" српске историје, 1. део.',
            excerpt:
               'Усвести народа — због количине различитих информација — јача све већа скепса и сумња. Човек одраста слушајући једно, да би био суочен са нечим потпуно супротним. Има ли истине у томе да је је читава званична историја фалсификована? Да ли је земља округла, или равна; да ли је...',
            image: 'https://qjbihfajkucvfxqkvtxk.supabase.co/storage/v1/object/public/article_images/1772649738407.jpeg',
            slug: 'псеудо-историчари',
            created_at: 'March 14, 2026',
            authors: { full_name: 'David Maksić' },
         },
         locale: 'sr',
         unsubscribeUrl: 'https://ethos-blog.com/unsubscribe?token=test',
      }),
   );

   return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
   });
}

// ArticleTemplate({
//          article: {
//             title: 'First Peloponnesian War',
//             description: 'A short description.',
//             excerpt:
//                'After the Persian retreat, recently united Greeks had to decide what to do with the Ionian cities, which were under a constant threat from nearby Persia. Spartans were eager to displace Ionian populace to the Greek mainland, since they considered defense of the Ionian coast futile...',
//             image: 'https://qjbihfajkucvfxqkvtxk.supabase.co/storage/v1/object/public/article_images/1772628470748.jpeg',
//             slug: 'first-peloponnesian-war',
//             created_at: 'March 14, 2026',
//             authors: { full_name: 'David Maksić' },
//          },
//          locale: 'en',
//          unsubscribeUrl: 'https://ethos-blog.com/unsubscribe?token=test',
//       }),
