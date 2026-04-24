import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
import MobileLoginImage from './mobile-login-image';

import image1 from '@/public/login-images/image-1.webp';
import image2 from '@/public/login-images/image-2.webp';
import image3 from '@/public/login-images/image-3.webp';
import image4 from '@/public/login-images/image-4.webp';
import image5 from '@/public/login-images/image-5.webp';
import image6 from '@/public/login-images/image-6.webp';
import image7 from '@/public/login-images/image-7.webp';
import image8 from '@/public/login-images/image-8.webp';
import image9 from '@/public/login-images/image-9.webp';
import image10 from '@/public/login-images/image-10.webp';
import image11 from '@/public/login-images/image-11.webp';
import image12 from '@/public/login-images/image-12.webp';
import image13 from '@/public/login-images/image-13.webp';
import image14 from '@/public/login-images/image-14.webp';
import image15 from '@/public/login-images/image-15.webp';
import image16 from '@/public/login-images/image-16.webp';
import image17 from '@/public/login-images/image-17.webp';
import image18 from '@/public/login-images/image-18.webp';
import image19 from '@/public/login-images/image-19.webp';
import image20 from '@/public/login-images/image-20.webp';
import image21 from '@/public/login-images/image-21.webp';
import image22 from '@/public/login-images/image-22.webp';
import image23 from '@/public/login-images/image-23.webp';
import image24 from '@/public/login-images/image-24.webp';
import image25 from '@/public/login-images/image-25.webp';

const images = [
   {
      id: 1,
      url: image1,
      lightMode: true,
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
      lightMode: true,
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
      lightMode: true,
   },
   {
      id: 9,
      url: image9,
      credit: 'Relic Entertainment',
      lightMode: true,
   },
   {
      id: 10,
      url: image10,
      credit: 'Relic Entertainment',
      lightMode: true,
   },
   {
      id: 11,
      url: image11,
      credit: 'Relic Entertainment',
      lightMode: true,
   },
   {
      id: 12,
      url: image12,
      credit: 'Relic Entertainment',
      lightMode: true,
   },
   {
      id: 13,
      url: image13,
      credit: 'Paradox Interactive',
      lightMode: true,
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
      lightMode: true,
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
      lightMode: true,
   },
   {
      id: 18,
      url: image18,
      credit: 'Paradox Interactive',
      lightMode: true,
   },
   {
      id: 19,
      url: image19,
      credit: 'Paradox Interactive',
      lightMode: true,
   },
   {
      id: 20,
      url: image20,
      credit: 'Paradox Interactive',
      lightMode: true,
   },
   {
      id: 21,
      url: image21,
      credit: 'Paradox Interactive',
   },
   {
      id: 22,
      url: image22,
      credit: 'Paradox Interactive',
   },
   {
      id: 23,
      url: image23,
      credit: 'Crytek',
      lightMode: true,
   },
   {
      id: 24,
      url: image24,
      credit: 'Warhorse Studios',
      lightMode: true,
   },
   {
      id: 25,
      url: image25,
      credit: 'Relic Entertainment',
      lightMode: true,
   },
];

async function LoginBackground() {
   const [cookieStore, t] = await Promise.all([cookies(), getTranslations()]);

   const theme = cookieStore.get('theme')?.value ?? 'dark';
   const eligibleImages =
      theme === 'light' ? images.filter((img) => img.lightMode) : images;

   const image =
      eligibleImages[Math.floor(Math.random() * eligibleImages.length)];

   return (
      <section className="fixed inset-0 -z-10">
         <div className="relative size-full">
            <div className="absolute inset-0 hidden md:block auth-background-gradient" />

            <MobileLoginImage
               url={image.url}
               credit={image.credit}
               creditLabel={t('Auth.credit')}
            />
         </div>
      </section>
   );
}

export default LoginBackground;
