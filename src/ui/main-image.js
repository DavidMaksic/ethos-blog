'use client';

import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';

import RemoteImage from '@/src/ui/remote-image';
import mediumZoom from 'medium-zoom';

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
         <RemoteImage
            imageUrl={article.image}
            alt="Main image"
            styles="main-image rounded-3xl object-cover opacity-95 dark:opacity-80"
         />
      </div>
   );
}

export default MainImage;
