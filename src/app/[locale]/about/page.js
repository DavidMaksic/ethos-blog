import { getTranslations } from 'next-intl/server';
import { WEBSITE_URL } from '@/src/utils/config';
import { getAuthors } from '@/src/lib/data-service';
import AboutBlocks from '@/src/ui/about-blocks';

export async function generateMetadata({ params }) {
   const [param, t] = await Promise.all([params, getTranslations()]);
   const isEnglish = param?.locale === 'en';

   const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: t('about-name'),
      description: t('about'),
      url: isEnglish ? `${WEBSITE_URL}/about` : `${WEBSITE_URL}/sr/about`,
      inLanguage: isEnglish ? 'en' : 'sr',
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
         '@id': isEnglish ? `${WEBSITE_URL}/about` : `${WEBSITE_URL}/sr/about`,
      },
   };

   return {
      title: t('about-name'),
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
