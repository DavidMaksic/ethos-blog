'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

function RemoteImage({
   imageRef = null,
   imageUrl,
   imageBlur = null,
   round,
   styles,
   opacity,
   alt,
   isBookmark = false,
   ...props
}) {
   const [loaded, setLoaded] = useState(false);
   const opacitySetting = opacity ? opacity : 'opacity-95 dark:opacity-80';
   const [mounted, setMounted] = useState(false);
   const ref = useRef(null);

   useEffect(() => setMounted(true), []);
   useEffect(() => {
      if (ref.current?.complete) setTimeout(() => setLoaded(true), 50);
   }, [mounted]);

   return (
      <div className={`absolute inset-0 overflow-hidden ${round}`}>
         <span
            className={`absolute inset-0 scale-110 transition-opacity duration-300 ${loaded ? 'opacity-0' : opacitySetting} ${isBookmark && styles}`}
            style={{
               backgroundImage: imageBlur ? `url(${imageBlur})` : undefined,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               filter: 'blur(20px)',
            }}
         />
         <Image
            ref={imageRef || ref}
            className={`${styles} ${round} transition-opacity duration-300 ease-in-out ${loaded ? opacitySetting : 'opacity-0'}`}
            src={imageUrl}
            alt={alt ?? 'Image'}
            onLoad={() => setTimeout(() => setLoaded(true), 50)}
            {...props}
            unoptimized
            fill
         />
      </div>
   );
}

export default RemoteImage;
