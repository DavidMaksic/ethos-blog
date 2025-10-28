import { getTranslations } from 'next-intl/server';
import { WEBSITE_URL } from '@/src/utils/config';
import { getAuthors } from '@/src/lib/data-service';
import Author from '@/src/ui/author';

export async function generateMetadata({ params }) {
   const [param, authors, t] = await Promise.all([
      params,
      getAuthors(),
      getTranslations('Page-descriptions'),
   ]);
   const { locale } = param;
   const prefix = locale === 'en' ? '' : `/${locale}`;

   return {
      title: t('about-name'),
      alternates: {
         canonical: `${WEBSITE_URL}${prefix}/about`,
         languages: {
            en: `${WEBSITE_URL}/about`,
            sr: `${WEBSITE_URL}/sr/about`,
         },
      },
      authors: authors.map((author) => ({ name: author.full_name })),
   };
}

async function Page({ params }) {
   const [param, authors, t] = await Promise.all([
      params,
      getAuthors(),
      getTranslations(),
   ]);

   const { locale } = param;
   const prefix = locale === 'en' ? '' : `/${locale}`;

   const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: t('Page-descriptions.about-name'),
      description: t('Page-descriptions.about'),
      url: `${WEBSITE_URL}${prefix}/about`,
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
         '@id': `${WEBSITE_URL}${prefix}/about`,
      },
   };

   return (
      <>
         <h1 className="sr-only">{t('H1.about-page')}</h1>
         <div className="grid grid-cols-10 items-stretch gap-y-2 2xl:gap-y-0 gap-x-8 2xl:gap-x-6 2xl:mt-3 py-4">
            <section
               className={`space-y-6 col-span-6 md:col-span-full py-10 lg:py-8 md:pb-9 px-14 lg:px-12 md:mb-6 bg-white dark:bg-primary-300/10 border border-quaternary dark:border-primary-300/15 rounded-2xl md:rounded-3xl box-shadow font-medium`}
            >
               <h2 className="text-4xl text-primary-600/75 font-bold">
                  {t('About.label')}
               </h2>
               <p className="text-[1.35rem] leading-7.5 md:leading-8 md:text-2xl">
                  {t('About.description')}
               </p>
            </section>

            <section className="space-y-1.5 col-span-4 md:col-span-7 sm:col-span-8 py-10 lg:py-8 md:pb-9 px-14 lg:px-12 bg-white dark:bg-primary-300/10 border border-quaternary dark:border-primary-300/15 rounded-2xl md:rounded-3xl box-shadow font-medium">
               <h2 className="text-4xl text-primary-600/75 font-bold">
                  {t('About.label-2')}
               </h2>
               <span className="text-primary-400 text-[1.4rem]">
                  {t('About.ipa')}
               </span>
               <p className="text-[1.35rem] leading-7.5 md:leading-8 md:text-2xl mt-3">
                  {t.rich('About.etymology', {
                     em: (chunks) => <em>{chunks}</em>,
                  })}
               </p>
            </section>

            {authors?.map((item) => (
               <Author author={item} key={item.id} styles="mt-6" />
            ))}
         </div>

         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
            }}
         />
      </>
   );
}

export default Page;
