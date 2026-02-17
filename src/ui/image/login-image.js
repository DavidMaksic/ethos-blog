'use client';

import { useEffect, useState } from 'react';
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
import { useTheme } from 'next-themes';
import { useMediaQuery } from 'react-responsive';

const images = [
   {
      id: 1,
      url: image1,
      title: 'Queen Matilda of England',
      credit: 'Creative Assembly',
      lightMode: true,
   },
   {
      id: 2,
      url: image2,
      title: 'Order of the Dragon',
      credit: 'Creative Assembly',
   },
   {
      id: 3,
      url: image3,
      title: 'Fall of Constantinople',
      credit: 'Creative Assembly',
   },
   {
      id: 4,
      url: image4,
      title: 'A Roman Triumph',
      credit: 'Andrew Carrick Gow',
      lightMode: true,
   },
   {
      id: 5,
      url: image5,
      title: 'Roman Legionaries',
      credit: 'Creative Assembly',
   },
   {
      id: 6,
      url: image6,
      title: 'Hagia Sophia',
      credit: 'Creative Assembly',
      lightMode: true,
   },
   {
      id: 7,
      url: image7,
      title: 'Lighthouse of Alexandria',
      credit: 'Creative Assembly',
   },
   {
      id: 8,
      url: image8,
      title: 'Mongol Warriors',
      credit: 'Creative Assembly',
      lightMode: true,
   },
   {
      id: 9,
      url: image9,
      title: 'British Longbowmen',
      credit: 'Creative Assembly',
      lightMode: true,
   },
];

function LoginImage() {
   const { resolvedTheme } = useTheme();
   const [image, setImage] = useState(null);
   const isMobile = useMediaQuery({ maxWidth: 768 });

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
            <p
               className={`absolute right-4 bottom-2 text-lg lg:text-base text-white/80 dark:text-white/60 ${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
            >
               <span className="italic">{image.title}</span>, {image.credit}
            </p>
         </div>
      </section>
   );
}

export default LoginImage;
