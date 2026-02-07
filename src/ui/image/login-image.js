'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import RemoteImage from '@/src/ui/image/remote-image';
import loginImg from '@/public/login.jpg';

function LoginImage() {
   const t = useTranslations('Auth');

   const [mounted, setMounted] = useState(false);
   useEffect(() => setMounted(true), []);

   return (
      <section className="size-full md:hidden p-10">
         <div className="relative size-full">
            <RemoteImage
               styles="object-cover rounded-[2rem]"
               imageUrl={loginImg}
               alt="Login image"
               opacity="opacity-95"
               priority
            />
            <span
               className={`absolute right-4 bottom-2 text-lg lg:text-base text-primary-300/60 dark:text-primary-600/50 ${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
            >
               {t('img-credit')}
            </span>
         </div>
      </section>
   );
}

export default LoginImage;
