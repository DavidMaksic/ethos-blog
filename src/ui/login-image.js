'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import RemoteImage from '@/src/ui/remote-image';
import loginImg from '@/public/login.jpg';

function LoginImage() {
   const t = useTranslations('Auth');

   const [mounted, setMounted] = useState(false);
   useEffect(() => setMounted(true), []);

   return (
      <>
         {mounted ? (
            <section className="relative size-full overflow-hidden shadow-xl dark:shadow-menu-dark">
               <RemoteImage
                  styles="object-cover"
                  fill
                  imageUrl={loginImg}
                  alt="Login image"
                  opacity="opacity-95"
               />

               <span className="absolute right-4 bottom-4">
                  {t('img-credit')}
               </span>
            </section>
         ) : (
            <div className="size-full bg-primary-300/45 dark:bg-primary-300/18 animate-skeleton" />
         )}
      </>
   );
}

export default LoginImage;
