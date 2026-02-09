'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import RemoteImage from '@/src/ui/image/remote-image';
import image1 from '@/public/image-1.webp';
import image2 from '@/public/image-2.webp';
import image3 from '@/public/image-3.jpg';
import image4 from '@/public/image-4.jpg';
import image5 from '@/public/image-5.webp';
import image6 from '@/public/image-6.jpg';
import image7 from '@/public/image-7.jpg';
import image8 from '@/public/image-8.webp';
import image9 from '@/public/image-9.webp';

const images = [
   {
      id: 1,
      url: image1,
      credit: 'Creative Assembly',
   },
   {
      id: 2,
      url: image2,
      credit: 'Creative Assembly',
   },
   {
      id: 3,
      url: image3,
      credit: 'Creative Assembly',
   },
   {
      id: 4,
      url: image4,
      credit: 'Creative Assembly',
   },
   {
      id: 5,
      url: image5,
      credit: 'Creative Assembly',
   },
   {
      id: 6,
      url: image6,
      credit: 'Creative Assembly',
   },
   {
      id: 7,
      url: image7,
      credit: 'Creative Assembly',
   },
   {
      id: 8,
      url: image8,
      credit: 'Creative Assembly',
   },
   {
      id: 9,
      url: image9,
      credit: 'Creative Assembly',
   },
];

function LoginImage() {
   const t = useTranslations('Auth');

   const [image, setImage] = useState(null);
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
      const randomImage = images[Math.floor(Math.random() * images.length)];
      setImage(randomImage);
   }, []);

   if (!image) return null;

   return (
      <section className="fixed inset-0 -z-10">
         <div className="relative size-full">
            <RemoteImage
               styles="object-cover"
               imageUrl={image.url}
               alt="Login image"
               opacity="opacity-95 dark:opacity-70"
               priority
            />
            <div className="absolute inset-0" />
            <span
               className={`absolute right-4 bottom-2 text-lg lg:text-base text-white/60 ${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
            >
               {t('img-credit')}
               {image.credit}
            </span>
         </div>
      </section>
   );
}

export default LoginImage;
