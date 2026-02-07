import { getTranslations } from 'next-intl/server';
import RemoteImage from '@/src/ui/image/remote-image';
import loginImg from '@/public/login.webp';

async function LoginImage() {
   const t = await getTranslations('Auth');

   return (
      <section className="relative size-full">
         <RemoteImage
            styles="object-contain p-10"
            imageUrl={loginImg}
            alt="Login image"
            opacity="opacity-95"
            priority
         />

         <span className="absolute right-20 bottom-12">{t('img-credit')}</span>
      </section>
   );
}

export default LoginImage;
