import { getTranslations } from 'next-intl/server';
import RemoteImage from '@/src/ui/image/remote-image';
import loginImg from '@/public/login.jpg';

async function LoginImage() {
   const t = await getTranslations('Auth');

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
            <span className="absolute right-4 bottom-2 text-lg lg:text-base">
               {t('img-credit')}
            </span>
         </div>
      </section>
   );
}

export default LoginImage;
