'use client';

import { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import mediumZoom from 'medium-zoom';
import Image from 'next/image';

function MainImage({ article }) {
   const { image, image_blur } = article;
   const [loaded, setLoaded] = useState(false);
   const imgRef = useRef(null);
   const zoomRef = useRef(null);
   const isMobile = useMediaQuery({ maxWidth: 768 });

   useEffect(() => {
      if (imgRef.current?.complete) setTimeout(() => setLoaded(true), 50);
   }, []);

   useEffect(() => {
      if (!loaded || !imgRef.current) return;

      const timer = setTimeout(() => {
         zoomRef.current = mediumZoom(imgRef.current, {
            margin: isMobile ? 22 : 60,
         });
      }, 300);

      return () => {
         clearTimeout(timer);
         zoomRef.current?.detach();
      };
   }, [loaded, isMobile]);

   return (
      <div className="relative h-[24rem] 2xl:h-[21rem] sm:h-[17rem] overflow-hidden rounded-3xl">
         {image_blur && (
            <div
               className={`absolute inset-0 scale-110 transition-opacity duration-300 ${loaded ? 'opacity-0' : 'opacity-90 dark:opacity-75'}`}
               style={{
                  backgroundImage: `url(${image_blur})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(20px)',
               }}
            />
         )}
         <Image
            ref={imgRef}
            className={`main-image absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-90 dark:opacity-75' : 'opacity-0'}`}
            src={image}
            alt="Main image"
            fetchPriority="high"
            onLoad={() => setTimeout(() => setLoaded(true), 50)}
            unoptimized
            preload
            fill
         />
      </div>
   );
}

export default MainImage;
