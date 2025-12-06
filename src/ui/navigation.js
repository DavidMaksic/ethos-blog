import { getTranslations } from 'next-intl/server';
import HeaderOptions from '@/src/ui/header/header-options';
import HeaderItem from '@/src/ui/header/header-item';

async function Navigation() {
   const t = await getTranslations('HomePage');

   return (
      <nav className="text-[1.3rem] font-medium text-primary-500 dark:text-primary-500">
         <div className="flex gap-10 2xl:gap-6 md:gap-0.5 items-center">
            <HeaderItem to="/">{t('nav-link-1')}</HeaderItem>
            <HeaderItem to="/archive">{t('nav-link-2')}</HeaderItem>
            <HeaderItem to="/about">{t('nav-link-3')}</HeaderItem>
            <HeaderOptions />
         </div>
      </nav>
   );
}

export default Navigation;
