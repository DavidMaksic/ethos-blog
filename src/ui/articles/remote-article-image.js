'use client';

import { useState } from 'react';
import Image from 'next/image';

function RemoteArticleImage({ src, className, width, height }) {
   const [loaded, setLoaded] = useState(false);

   return (
      <span
         className="block w-full"
         style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 300ms ease-in-out',
         }}
      >
         <Image
            className={className}
            src={src}
            alt="Article image"
            width={width}
            height={height}
            quality={60}
            onLoad={() => setLoaded(true)}
         />
      </span>
   );
}

export default RemoteArticleImage;
