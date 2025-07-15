import { useTranslations } from 'next-intl';
import { signOutAction } from '@/src/lib/actions';
import { LuLogOut } from 'react-icons/lu';

function SignOutButton() {
   const t = useTranslations('Profile');

   return (
      <form action={signOutAction}>
         <button className="nav-link w-full sm:flex sm:flex-col font-semibold group transition-bg_color cursor-pointer">
            <LuLogOut className="md:size-6" />
            <span className="lg:hidden sm:block">{t('nav-link-5')}</span>
         </button>
      </form>
   );
}

export default SignOutButton;
