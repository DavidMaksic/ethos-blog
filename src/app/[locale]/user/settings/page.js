import { getTranslations } from 'next-intl/server';
import { getUser } from '@/src/lib/data-service';
import { auth } from '@/src/lib/auth';

import UsernameInput from '@/src/ui/username-input';
import ProfileImage from '@/src/ui/profile/profile-image';

export async function generateMetadata({ params }) {
   const { locale } = await params;
   return { title: locale === 'en' ? 'Profile' : 'Профил' };
}

async function Page() {
   const [session, t] = await Promise.all([auth(), getTranslations('Profile')]);

   const { username, image } = await getUser(session.user.email);

   return (
      <div className="space-y-4 md:flex md:flex-col md:gap-4">
         <div className="flex md:flex-col xl:flex-wrap gap-4 md:order-2">
            <div className="size-fit flex flex-col gap-10 bg-white dark:bg-primary-300/10 rounded-3xl border border-quaternary dark:border-primary-300/15 text-lg text-[#4d525c] dark:text-slate-300/80 px-17 lg:px-14 xs:px-13.5 py-12 xs:py-7.5 lg:pt-10 box-shadow transition-200">
               <div className="flex flex-col gap-2">
                  <label className="text-sm uppercase font-semibold text-primary-400 tracking-wider">
                     {t('username')}
                  </label>
                  <span className="text-3xl">
                     {username ? username : session.user.name}
                  </span>
               </div>

               <UsernameInput />
            </div>

            <ProfileImage user={session.user} image={image} />
         </div>

         <div className="size-fit md:w-full md:order-1 flex flex-col gap-3 bg-white dark:bg-primary-300/10 rounded-3xl border border-quaternary dark:border-primary-300/15 text-lg text-[#4d525c] dark:text-slate-300/80 px-17 lg:px-14 xs:px-13.5 py-8 xs:pt-6.5 xs:pb-7.5 box-shadow transition-200">
            <label className="text-sm uppercase font-semibold text-primary-400 tracking-wider">
               {t('email')}
            </label>
            <span className="text-2xl">{session.user.email}</span>
         </div>
      </div>
   );
}

export default Page;
