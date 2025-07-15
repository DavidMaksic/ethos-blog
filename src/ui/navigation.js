import { getTranslations } from 'next-intl/server';
import { getUser } from '@/src/lib/data-service';
import { auth } from '@/src/lib/auth';

import HeaderOptions from '@/src/ui/header/header-options';
import HeaderItem from '@/src/ui/header/header-item';

async function Navigation() {
   const session = await auth();
   const userData = await getUser(session?.user.email);
   const t = await getTranslations('HomePage');

   return (
      <nav className="text-[1.3rem] font-medium text-primary-500 dark:text-primary-500">
         <div className="flex gap-10 lg:gap-6 md:gap-0.5 items-center">
            <HeaderItem to="/">{t('nav-link-1')}</HeaderItem>
            <HeaderItem to="/archive">{t('nav-link-2')}</HeaderItem>
            <HeaderItem to="/about">{t('nav-link-3')}</HeaderItem>

            <HeaderOptions oldUser={session?.user} newUser={userData} />
         </div>
      </nav>
   );
}

export default Navigation;
