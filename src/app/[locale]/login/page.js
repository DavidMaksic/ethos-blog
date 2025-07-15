import SignInButton from '@/src/ui/buttons/signin.button';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
   const { locale } = await params;
   return { title: locale === 'en' ? 'Sign in' : 'Пријави се' };
}

export default async function Page() {
   const t = await getTranslations('Auth');

   return (
      <div className="flex justify-center h-[48rem] md:h-[50rem] sm:h-[54rem]">
         <div className="flex flex-col gap-10 size-fit mt-[11rem] md:mt-[14rem] sm:mt-[16rem] px-16 py-12 items-center bg-white dark:bg-primary-300/10 border border-quaternary dark:border-primary-300/15 rounded-2xl transition-bg_border box-shadow">
            <h2 className="text-3xl font-semibold">{t('sign-in')}</h2>
            <SignInButton />
         </div>
      </div>
   );
}
