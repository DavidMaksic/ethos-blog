'use client';

import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import mediumZoom from 'medium-zoom';

export default function ImageZoom() {
   const isMobile = useMediaQuery({ maxWidth: 768 });

   useEffect(() => {
      const zoom = mediumZoom('.container img', {
         margin: isMobile ? 22 : 60,
      });

      return () => {
         zoom.detach();
      };
   }, [isMobile]);

   return null;
}
