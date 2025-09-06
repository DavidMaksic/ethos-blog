import { getTranslations } from 'next-intl/server';
import { WEBSITE_URL } from '@/src/utils/config';
import { getAuthors } from '@/src/lib/data-service';
import AboutBlocks from '@/src/ui/about-blocks';

export async function generateMetadata({ params }) {
   const [param, authors, t] = await Promise.all([
      params,
      getAuthors(),
      getTranslations(),
   ]);
   const { locale } = param;

   const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: t('about-name'),
      description: t('about'),
      url: `${WEBSITE_URL}/${locale}/about`,
      inLanguage: locale,
      keywords: [
         'Ethos Blog',
         'About',
         'Authors',
         'History',
         'Theology',
         'Christian Philosophy',
         'Moral Ethics',
         'Culture',
      ],
      mainEntityOfPage: {
         '@type': 'WebPage',
         '@id': `${WEBSITE_URL}/${locale}/about`,
      },
   };

   return {
      title: t('about-name'),
      alternates: {
         canonical: `${WEBSITE_URL}/${locale}/about`,
         languages: {
            en: `${WEBSITE_URL}/en/about`,
            sr: `${WEBSITE_URL}/sr/about`,
         },
      },
      authors: authors.map((author) => ({ name: author.full_name })),
      other: {
         'script:ld+json': JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      },
   };
}

async function Page() {
   const authors = await getAuthors();

   return <AboutBlocks authors={authors} />;
}

export default Page;
