import { useTranslations } from 'next-intl';
import { authClient } from '@/src/lib/auth-client';
import { useRouter } from '@/src/i18n/navigation';
import { LuLogOut } from 'react-icons/lu';

function SignOutButton() {
   const t = useTranslations('Profile');

   const router = useRouter();

   async function logout() {
      await authClient.signOut();
      router.push('/');
      router.refresh();
   }

   return (
      <button
         onClick={logout}
         className="nav-link sm:px-0 w-full sm:flex sm:flex-col font-semibold group transition-bg_color cursor-pointer"
      >
         <LuLogOut className="md:size-6 xs:mt-1" />
         <span className="lg:hidden sm:block xs:text-lg">
            {t('nav-link-5')}
         </span>
      </button>
   );
}

export default SignOutButton;
