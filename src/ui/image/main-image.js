'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

function MainImage({ article }) {
   const { image, image_blur } = article;
   const [loaded, setLoaded] = useState(false);
   const imgRef = useRef(null);

   useEffect(() => {
      if (imgRef.current?.complete) setTimeout(() => setLoaded(true), 50);
   }, []);

   return (
      <div className="container relative h-[24rem] 2xl:h-[21rem] sm:h-[17rem] overflow-hidden rounded-3xl">
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
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-90 dark:opacity-75' : 'opacity-0'}`}
            src={image}
            alt="Main image"
            fetchPriority="high"
            onLoad={() => setTimeout(() => setLoaded(true), 50)}
            unoptimized
            priority
            fill
         />
      </div>
   );
}

export default MainImage;
