import { getLocale, getTranslations } from 'next-intl/server';
import OrnamentalDivider from './ornamental-divider';
import NewsletterForm from './newsletter-form';
import RemoteImage from '../image/remote-image';

import image1 from '@/public/newsletter-images/newsletter-1.webp';
import image2 from '@/public/newsletter-images/newsletter-2.webp';
import image3 from '@/public/newsletter-images/newsletter-3.webp';
import image4 from '@/public/newsletter-images/newsletter-4.webp';
import image5 from '@/public/newsletter-images/newsletter-5.webp';
import image6 from '@/public/newsletter-images/newsletter-6.webp';
import image7 from '@/public/newsletter-images/newsletter-7.webp';
import image8 from '@/public/newsletter-images/newsletter-8.webp';
import image9 from '@/public/newsletter-images/newsletter-9.webp';
import image10 from '@/public/newsletter-images/newsletter-10.webp';
import image11 from '@/public/newsletter-images/newsletter-11.webp';
import image12 from '@/public/newsletter-images/newsletter-12.webp';
import image13 from '@/public/newsletter-images/newsletter-13.webp';
import image14 from '@/public/newsletter-images/newsletter-14.webp';
import image15 from '@/public/newsletter-images/newsletter-15.webp';
import image16 from '@/public/newsletter-images/newsletter-16.webp';
import image17 from '@/public/newsletter-images/newsletter-17.webp';
import image18 from '@/public/newsletter-images/newsletter-18.webp';
import image19 from '@/public/newsletter-images/newsletter-19.webp';
import image20 from '@/public/newsletter-images/newsletter-20.webp';
import image21 from '@/public/newsletter-images/newsletter-21.webp';
import image22 from '@/public/newsletter-images/newsletter-22.webp';
import image23 from '@/public/newsletter-images/newsletter-23.webp';
import image24 from '@/public/newsletter-images/newsletter-24.webp';
import image25 from '@/public/newsletter-images/newsletter-25.webp';
import image26 from '@/public/newsletter-images/newsletter-26.webp';
import image27 from '@/public/newsletter-images/newsletter-27.webp';
import image28 from '@/public/newsletter-images/newsletter-28.webp';
import image29 from '@/public/newsletter-images/newsletter-29.webp';
import image30 from '@/public/newsletter-images/newsletter-30.webp';

const images = [
   {
      id: 1,
      url: image1,
      credit: 'Relic Entertainment',
   },
   {
      id: 2,
      url: image2,
      credit: 'Relic Entertainment',
   },
   {
      id: 3,
      url: image3,
      credit: 'Relic Entertainment',
   },
   {
      id: 4,
      url: image4,
      credit: 'Relic Entertainment',
   },
   {
      id: 5,
      url: image5,
      credit: 'Mohawk Games',
   },
   {
      id: 6,
      url: image6,
      credit: 'Relic Entertainment',
   },
   {
      id: 7,
      url: image7,
      credit: 'Paradox Interactive',
   },
   {
      id: 8,
      url: image8,
      credit: 'Relic Entertainment',
   },
   {
      id: 9,
      url: image9,
      credit: 'Relic Entertainment',
   },
   {
      id: 10,
      url: image10,
      credit: 'Relic Entertainment',
   },
   {
      id: 11,
      url: image11,
      credit: 'Relic Entertainment',
   },
   {
      id: 12,
      url: image12,
      credit: 'Relic Entertainment',
   },
   {
      id: 13,
      url: image13,
      credit: 'Paradox Interactive',
   },
   {
      id: 14,
      url: image14,
      credit: 'Paradox Interactive',
   },
   {
      id: 15,
      url: image15,
      credit: 'Paradox Interactive',
   },
   {
      id: 16,
      url: image16,
      credit: 'Paradox Interactive',
   },
   {
      id: 17,
      url: image17,
      credit: 'Paradox Interactive',
   },
   {
      id: 18,
      url: image18,
      credit: 'Paradox Interactive',
   },
   {
      id: 19,
      url: image19,
      credit: 'Paradox Interactive',
   },
   {
      id: 20,
      url: image20,
      credit: 'Crytek',
   },
   {
      id: 21,
      url: image21,
      credit: 'Warhorse Studios',
   },
   {
      id: 22,
      url: image22,
      credit: 'Relic Entertainment',
   },
   {
      id: 23,
      url: image23,
      credit: 'Mohawk Games',
   },
   {
      id: 24,
      url: image24,
      credit: 'Mohawk Games',
   },
   {
      id: 25,
      url: image25,
      credit: 'Mohawk Games',
   },
   {
      id: 26,
      url: image26,
      credit: 'Mohawk Games',
   },
   {
      id: 27,
      url: image27,
      credit: 'Ubisoft',
   },
   {
      id: 28,
      url: image28,
      credit: 'Ubisoft',
   },
   {
      id: 29,
      url: image29,
      credit: 'Ubisoft',
   },
   {
      id: 30,
      url: image30,
      credit: 'Ubisoft',
   },
];

export default async function NewsletterSignup() {
   const [locale, t] = await Promise.all([getLocale(), getTranslations()]);
   const image = images[Math.floor(Math.random() * images.length)];

   return (
      <section className="relative w-7xl 2xl:w-full rounded-4xl mb-14 self-center py-50 lg:py-30 md:py-26 xs:py-30 px-24 md:px-20 sm:px-14 xs:px-10 3xs:px-8 border border-quaternary dark:border-primary-300/20 bg-white dark:bg-primary-300/10 lg:shadow-dashboard lg:dark:shadow-none">
         <OrnamentalDivider />
         <NewsletterForm locale={locale} credit={image.credit} />
         <RemoteImage
            imageUrl={image.url}
            imageBlur={image.url.blurDataURL}
            round="rounded-4xl"
            styles="absolute lg:hidden translate-x-[20%] xs:translate-x-[45%] object-cover object-top-right [mask-image:linear-gradient(to_right,transparent,black)] [mask-mode:alpha] [mask-size:100%_100%] [mask-repeat:no-repeat]"
            opacity="opacity-100 dark:opacity-70"
            alt="Newsletter image"
            isBookmark={true}
         />

         <p className="absolute right-6 bottom-2 text-base lg:text-base text-white/25 dark:text-white/15 lg:hidden">
            {t('Auth.credit')}
            {image.credit}
         </p>
      </section>
   );
}
