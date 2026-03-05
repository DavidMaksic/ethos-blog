'use client';

import { useState } from 'react';
import Image from 'next/image';

function LoginImage({ url }) {
   const [loaded, setLoaded] = useState(false);

   return (
      <>
         <div
            className="absolute inset-0 scale-110"
            style={{
               backgroundImage: `url(${url.blurDataURL})`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               filter: 'blur(20px)',
            }}
         />

         <Image
            className={`object-cover transition-opacity duration-500 ease-in-out ${
               loaded ? 'opacity-100' : 'opacity-0'
            }`}
            src={url}
            alt="Login image"
            onLoad={() => setLoaded(true)}
            unoptimized
            preload
            fill
         />

         <div className="absolute inset-0 opacity-5 dark:opacity-30 bg-primary transition-opacity duration-700" />
      </>
   );
}

export default LoginImage;
