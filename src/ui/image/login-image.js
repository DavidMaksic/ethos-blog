'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'next-themes';
import { motion } from 'motion/react';

import RemoteImage from '@/src/ui/image/remote-image';
import image1 from '@/public/image-1.webp';
import image2 from '@/public/image-2.webp';
import image3 from '@/public/image-3.jpg';
import image4 from '@/public/image-4.jpg';
import image5 from '@/public/image-5.jpg';
import image6 from '@/public/image-6.webp';
import image7 from '@/public/image-7.jpg';
import image8 from '@/public/image-8.webp';
import image9 from '@/public/image-9.webp';
import image10 from '@/public/image-10.webp';
import image11 from '@/public/image-11.webp';
import image12 from '@/public/image-12.webp';
import image13 from '@/public/image-13.webp';
import image14 from '@/public/image-14.webp';
import image15 from '@/public/image-15.webp';
import image16 from '@/public/image-16.webp';
import image17 from '@/public/image-17.webp';
import image18 from '@/public/image-18.webp';
import image19 from '@/public/image-19.webp';
import image20 from '@/public/image-20.webp';
import image21 from '@/public/image-21.webp';

const images = [
   {
      id: 1,
      url: image1,
      credit: 'Creative Assembly',
      lightMode: true,
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
      lightMode: true,
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
      lightMode: true,
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
      lightMode: true,
   },
   {
      id: 9,
      url: image9,
      credit: 'Creative Assembly',
      lightMode: true,
   },
   {
      id: 10,
      url: image10,
      credit: 'Creative Assembly',
      lightMode: true,
   },
   {
      id: 11,
      url: image11,
      credit: 'Creative Assembly',
      lightMode: true,
   },
   {
      id: 12,
      url: image12,
      credit: 'Creative Assembly',
   },
   {
      id: 13,
      url: image13,
      credit: 'Creative Assembly',
      lightMode: true,
   },
   {
      id: 14,
      url: image14,
      credit: 'Creative Assembly',
      lightMode: true,
   },
   {
      id: 15,
      url: image15,
      credit: 'Creative Assembly',
      lightMode: true,
   },
   {
      id: 16,
      url: image16,
      credit: 'Creative Assembly',
   },
   {
      id: 17,
      url: image17,
      credit: 'Creative Assembly',
   },
   {
      id: 18,
      url: image18,
      credit: 'Creative Assembly',
   },
   {
      id: 19,
      url: image19,
      credit: 'Creative Assembly',
   },
   {
      id: 20,
      url: image20,
      credit: 'Creative Assembly',
   },
   {
      id: 21,
      url: image21,
      credit: 'Creative Assembly',
   },
];

function LoginImage() {
   const { resolvedTheme } = useTheme();
   const [image, setImage] = useState(null);
   const isMobile = useMediaQuery({ maxWidth: 768 });
   const t = useTranslations('Auth');

   const [mounted, setMounted] = useState(false);
   useEffect(() => setMounted(true), []);

   useEffect(() => {
      if (!mounted || !resolvedTheme) return;

      const eligibleImages =
         resolvedTheme === 'light'
            ? images.filter((img) => img.lightMode)
            : images;

      if (eligibleImages.length === 0) return;

      const randomImage =
         eligibleImages[Math.floor(Math.random() * eligibleImages.length)];

      setImage(randomImage);
   }, [mounted, resolvedTheme]);

   if (!mounted || !image || isMobile) {
      return (
         <section className="fixed inset-0 -z-10 hidden md:block auth-background-gradient" />
      );
   }

   return (
      <section className="fixed inset-0 -z-10 md:hidden">
         <div className="relative size-full">
            <RemoteImage
               styles="object-cover"
               imageUrl={image.url}
               alt="Login image"
               opacity="opacity-95 dark:opacity-70"
               priority
            />
            <div className="absolute inset-0" />
            <motion.p
               className="absolute right-4 bottom-2 text-lg lg:text-base  text-white/80 dark:text-white/60"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.7 }}
            >
               {t('credit')}
               {image.credit}
            </motion.p>
         </div>
      </section>
   );
}

export default LoginImage;
