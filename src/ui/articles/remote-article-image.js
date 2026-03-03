'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

function RemoteArticleImage({
   src,
   className,
   blurDataURL,
   isTransparent,
   width,
   height,
}) {
   const [loaded, setLoaded] = useState(false);
   const imgRef = useRef(null);

   useEffect(() => {
      if (imgRef.current?.complete) setTimeout(() => setLoaded(true), 50);
   }, []);

   return (
      <span
         className={`block w-full relative overflow-hidden ${className}`}
         style={{ aspectRatio: `${width} / ${height}` }}
      >
         {blurDataURL && (
            <span
               className={`absolute inset-0 transition-opacity duration-300 ${isTransparent ? 'scale-80' : 'scale-110'} ${
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
            className={`${loaded ? className : ''} transition-opacity duration-700 ${
               loaded ? 'opacity-100' : 'opacity-0'
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
