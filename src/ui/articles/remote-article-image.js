'use client';

import { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { getImageProps } from 'next/image';
import mediumZoom from 'medium-zoom';

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
            margin: isMobile ? 14 : 60,
         });
      }, 300);

      return () => {
         clearTimeout(timer);
         zoomRef.current?.detach();
      };
   }, [loaded, isMobile]);

   const { props } = getImageProps({
      src,
      width,
      height,
      alt: 'Article image',
      quality: 60,
   });
   const { srcSet, ...imgProps } = props;

   return (
      <span
         className={`bn-visual-media block w-full relative overflow-hidden rounded-[1.6rem] sm:rounded-[1.35rem] ${!isTransparent && `border border-primary-300/70 dark:border-primary-300/25 ${!loaded && `border-transparent!`}`}`}
      >
         <span
            className={`absolute inset-0 transition-opacity duration-500 ${isTransparent ? 'scale-85' : 'scale-110'} ${
               loaded ? 'opacity-0' : 'opacity-90 dark:opacity-75'
            }`}
            style={{
               backgroundImage: blurDataURL ? `url(${blurDataURL})` : undefined,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               filter: 'blur(20px)',
            }}
         />
         <img
            ref={imgRef}
            {...imgProps}
            className={`transition-opacity duration-300 ${
               loaded ? 'opacity-90 dark:opacity-75' : 'opacity-0'
            }`}
            data-transparent={isTransparent ? 'true' : undefined}
            onLoad={() => setTimeout(() => setLoaded(true), 50)}
            style={{ width: '100%', height: 'auto' }}
         />
      </span>
   );
}

export default RemoteArticleImage;
