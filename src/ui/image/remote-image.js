'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

function RemoteImage({
   imageRef = null,
   imageUrl,
   styles,
   opacity,
   alt,
   ...props
}) {
   const [loaded, setLoaded] = useState(false);
   const opacitySetting = opacity ? opacity : 'opacity-95 dark:opacity-80';

   const [mounted, setMounted] = useState(false);
   useEffect(() => setMounted(true), []);

   return (
      <>
         {mounted ? (
            <Image
               ref={imageRef}
               className={`${styles} transition-opacity duration-700 ease-in-out ${
                  loaded ? opacitySetting : 'opacity-0'
               }`}
               src={imageUrl}
               alt={alt ? alt : 'Image'}
               onLoad={() => setLoaded(true)}
               {...props}
               unoptimized
               fill
            />
         ) : (
            <div
               className={`bg-primary-300/10 animate-pulse size-full ${styles}`}
            />
         )}
      </>
   );
}

export default RemoteImage;
