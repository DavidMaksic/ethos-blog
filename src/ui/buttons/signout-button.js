import { useTranslations } from 'next-intl';
import { signOutAction } from '@/src/lib/actions';
import { LuLogOut } from 'react-icons/lu';
import { useAuth } from '@/src/context/auth-context';

function SignOutButton() {
   const t = useTranslations('Profile');
   const { resetUser } = useAuth();

   return (
      <form
         action={() => {
            signOutAction();
            resetUser();
         }}
      >
         <button className="nav-link sm:px-0 w-full sm:flex sm:flex-col font-semibold group transition-bg_color cursor-pointer">
            <LuLogOut className="md:size-6 xs:mt-1" />
            <span className="lg:hidden sm:block xs:text-lg">
               {t('nav-link-5')}
            </span>
         </button>
      </form>
   );
}

export default SignOutButton;
