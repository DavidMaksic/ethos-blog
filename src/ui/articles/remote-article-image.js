'use client';

import { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import mediumZoom from 'medium-zoom';
import Image from 'next/image';

function RemoteArticleImage({
   src,
   className,
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
      <span className={`block w-full relative overflow-hidden ${className}`}>
         {blurDataURL && (
            <span
               className={`absolute inset-0 transition-opacity duration-700 ${isTransparent ? 'scale-80' : 'scale-110'} ${
                  loaded ? 'opacity-0' : 'opacity-90 dark:opacity-75'
               }`}
               style={{
                  backgroundImage: `url(${blurDataURL})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(20px)',
               }}
            />
         )}
         <Image
            ref={imgRef}
            className={`${loaded ? className : ''} article-image transition-opacity duration-700 ${
               loaded ? 'opacity-90 dark:opacity-75' : 'opacity-0'
            }`}
            src={src}
            alt="Article image"
            width={width}
            height={height}
            quality={60}
            onLoad={() => setTimeout(() => setLoaded(true), 50)}
            style={{ width: '100%', height: 'auto' }}
         />
      </span>
   );
}

export default RemoteArticleImage;
