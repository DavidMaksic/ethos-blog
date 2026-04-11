'use client';

import { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import mediumZoom from 'medium-zoom';
import Image from 'next/image';

function RemoteArticleImage({
   src,
   width,
   height,
   blurDataURL,
   isTransparent,
}) {
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
      <span
         className={`bn-visual-media block w-full relative overflow-hidden ${!isTransparent && `border border-primary-300/70 dark:border-primary-300/25 ${!loaded && `border-transparent!`}`}`}
      >
         <span
            className={`absolute inset-0 transition-opacity duration-700 ${isTransparent ? 'scale-85' : 'scale-110'} ${
               loaded ? 'opacity-0' : 'opacity-90 dark:opacity-75'
            }`}
            style={{
               backgroundImage: blurDataURL ? `url(${blurDataURL})` : undefined,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               filter: 'blur(20px)',
            }}
         />
         <Image
            ref={imgRef}
            className={`article-image transition-opacity duration-700 ${
               loaded ? 'opacity-90 dark:opacity-75' : 'opacity-0'
            }`}
            src={src}
            alt="Article image"
            width={width}
            height={height}
            quality={60}
            data-transparent={isTransparent ? 'true' : undefined}
            onLoad={() => setTimeout(() => setLoaded(true), 50)}
            style={{ width: '100%', height: 'auto' }}
         />
      </span>
   );
}

export default RemoteArticleImage;
