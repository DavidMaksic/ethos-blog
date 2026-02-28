import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { getUser } from '@/src/lib/data-service';
import { headers } from 'next/headers';
import { auth } from '@/src/lib/auth';

import ResetPasswordButton from '@/src/ui/buttons/reset-password-button';
import UsernameInput from '@/src/ui/username-input';
import ProfileImage from '@/src/ui/profile/profile-image';

export async function generateMetadata({ params }) {
   const { locale } = await params;
   return { title: locale === 'en' ? 'Profile' : 'Профил' };
}

async function Page() {
   const t = await getTranslations();
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) redirect('/login');

   const { name, image } = await getUser(session.user.email);
   const accounts = await auth.api.listUserAccounts({
      headers: await headers(),
   });
   const hasPassword = accounts.some((acc) => acc.providerId === 'credential');

   return (
      <div className="space-y-4 md:space-y-0 md:flex md:flex-col md:gap-4 text-text font-secondary [&_label]:font-main">
         <h1 className="sr-only">{t('H1.profile-page-settings')}</h1>

         <div className="flex md:flex-col 2xl:flex-wrap gap-4 md:order-1">
            <div className="h-fit w-120 md:w-110 sm:w-full flex flex-col md:order-2 gap-10 bg-white dark:bg-primary-300/10 rounded-3xl border border-quaternary dark:border-primary-300/15 text-lg px-17 lg:px-14 py-12 pb-13 lg:pt-10 box-shadow transition-200">
               <div className="flex flex-col gap-2">
                  <label className="text-sm uppercase font-semibold text-primary-400 tracking-wider">
                     {t('Profile.username')}
                  </label>
                  <span className="text-3xl xs:text-4xl">{name}</span>
               </div>

               <UsernameInput />
            </div>

            <ProfileImage user={session.user} image={image} />
         </div>

         {hasPassword && (
            <div className="size-fit md:order-2 md:w-full flex flex-col gap-3 bg-white dark:bg-primary-300/10 rounded-3xl border border-quaternary dark:border-primary-300/15 text-lg px-17 lg:px-14 py-8 pb-9 box-shadow transition-200">
               <label className="text-sm uppercase font-semibold text-primary-400 tracking-wider">
                  {t('Auth.label-4')}
               </label>
               <ResetPasswordButton email={session.user.email} />
            </div>
         )}

         <div className="size-fit md:w-full flex flex-col gap-3 bg-white dark:bg-primary-300/10 rounded-3xl border border-quaternary dark:border-primary-300/15 text-lg px-17 lg:px-14 py-8 pb-9 box-shadow transition-200 md:hidden">
            <label className="text-sm uppercase font-semibold text-primary-400 tracking-wider">
               {t('Profile.email')}
            </label>
            <span className="text-2xl xs:text-[1.7rem]">
               {session.user.email}
            </span>
         </div>
      </div>
   );
}

export default Page;
