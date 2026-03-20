import { getLocale, getTranslations } from 'next-intl/server';
import OrnamentalDivider from './ornamental-divider';
import NewsletterForm from './newsletter-form';
import RemoteImage from '../image/remote-image';

import image1 from '@/public/newsletter-1.webp';
import image2 from '@/public/newsletter-2.webp';
import image3 from '@/public/newsletter-3.webp';
import image4 from '@/public/newsletter-4.webp';
import image5 from '@/public/newsletter-5.webp';
import image7 from '@/public/newsletter-7.webp';
import image8 from '@/public/image-8.webp';
import image9 from '@/public/newsletter-9.webp';
import image10 from '@/public/newsletter-10.webp';
import image11 from '@/public/newsletter-11.webp';
import image12 from '@/public/image-12.webp';
import image13 from '@/public/newsletter-13.webp';
import image14 from '@/public/image-14.webp';
import image15 from '@/public/newsletter-15.webp';
import image17 from '@/public/newsletter-17.webp';
import image18 from '@/public/newsletter-18.webp';
import image19 from '@/public/image-19.webp';
import image20 from '@/public/newsletter-20.webp';
import image21 from '@/public/newsletter-21.webp';
import image23 from '@/public/image-23.webp';
import image24 from '@/public/newsletter-24.webp';
import image25 from '@/public/newsletter-25.webp';
import image26 from '@/public/newsletter-26.jpg';
import image27 from '@/public/newsletter-27.jpg';
import image28 from '@/public/newsletter-28.jpg';
import image29 from '@/public/newsletter-29.jpg';
import image31 from '@/public/newsletter-31.jpg';
import image32 from '@/public/newsletter-32.jpg';
import image33 from '@/public/newsletter-33.jpg';
import image34 from '@/public/newsletter-34.jpg';

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
      id: 7,
      url: image7,
      credit: 'Relic Entertainment',
   },
   {
      id: 8,
      url: image8,
      credit: 'Paradox Interactive',
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
      credit: 'Paradox Interactive',
   },
   {
      id: 21,
      url: image21,
      credit: 'Paradox Interactive',
   },
   {
      id: 23,
      url: image23,
      credit: 'Crytek',
   },
   {
      id: 24,
      url: image24,
      credit: 'Warhorse Studios',
   },
   {
      id: 25,
      url: image25,
      credit: 'Relic Entertainment',
   },
   {
      id: 26,
      url: image26,
      credit: 'Relic Entertainment',
   },
   {
      id: 27,
      url: image27,
      credit: 'Relic Entertainment',
   },
   {
      id: 28,
      url: image28,
      credit: 'Relic Entertainment',
   },
   {
      id: 29,
      url: image29,
      credit: 'Relic Entertainment',
   },
   {
      id: 31,
      url: image31,
      credit: 'Relic Entertainment',
   },
   {
      id: 32,
      url: image32,
      credit: 'Relic Entertainment',
   },
   {
      id: 33,
      url: image33,
      credit: 'Relic Entertainment',
   },
   {
      id: 34,
      url: image34,
      credit: 'Relic Entertainment',
   },
];

export default async function NewsletterSignup() {
   const [locale, t] = await Promise.all([getLocale(), getTranslations()]);
   const image = images[Math.floor(Math.random() * images.length)];

   return (
      <section className="relative w-7xl 2xl:w-full rounded-4xl mb-14 self-center py-50 lg:py-30 md:py-26 xs:py-30 px-24 md:px-20 sm:px-16 xs:px-10 3xs:px-8 border border-quaternary dark:border-primary-300/20 bg-white dark:bg-primary-300/10 lg:shadow-dashboard lg:dark:shadow-none">
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
