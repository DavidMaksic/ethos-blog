'use client';

import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';

import mediumZoom from 'medium-zoom';
import Image from 'next/image';

function MainImage({ article }) {
   const isMobile = useMediaQuery({ maxWidth: 768 });

   useEffect(() => {
      const zoom = mediumZoom('.parent img', {
         margin: isMobile ? 22 : 60,
      });

      return () => {
         zoom.detach();
      };
   }, [isMobile]);

   return (
      <div className="parent relative h-[24rem] 2xl:h-[21rem] sm:h-[17rem]">
         <Image
            className="main-image rounded-3xl object-cover opacity-95 dark:opacity-80"
            fill
            src={article.image}
            alt="Main image"
            priority={true}
            // quality={60}
            fetchPriority="high"
            sizes="100vw"
         />
      </div>
   );
}

export default MainImage;
