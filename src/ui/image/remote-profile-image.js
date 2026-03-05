'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

function RemoteProfileImage({
   imageRef = null,
   imageUrl,
   round,
   styles,
   opacity,
   alt,
   ...props
}) {
   const [loaded, setLoaded] = useState(false);
   const [mounted, setMounted] = useState(false);

   const opacitySetting = opacity ? opacity : 'opacity-95 dark:opacity-80';
   useEffect(() => setMounted(true), []);

   return (
      <>
         {mounted ? (
            <Image
               ref={imageRef}
               className={`${styles} ${round} transition-opacity duration-300 ease-in-out ${loaded ? opacitySetting : 'opacity-0'}`}
               src={imageUrl}
               alt={alt ?? 'PImage'}
               onLoad={() => setTimeout(() => setLoaded(true), 50)}
               {...props}
               unoptimized
               fill
            />
         ) : (
            <div
               className={`bg-primary-300/10 animate-pulse size-full ${round} ${styles}`}
            />
         )}
      </>
   );
}

export default RemoteProfileImage;
