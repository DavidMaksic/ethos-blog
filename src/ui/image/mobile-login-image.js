'use client';

import { useMediaQuery } from 'react-responsive';
import LoginImage from '@/src/ui/image/login-image';

function MobileLoginImage({ url, credit, creditLabel }) {
   const isMobile = useMediaQuery({ maxWidth: 768 });

   if (isMobile) return null;

   return (
      <>
         <div className="absolute inset-0">
            <LoginImage url={url} />
         </div>
         <p className="absolute right-4 bottom-2 text-lg lg:text-base text-white/80 dark:text-white/60">
            {creditLabel}
            {credit}
         </p>
      </>
   );
}

export default MobileLoginImage;
