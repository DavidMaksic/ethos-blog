import UserPageAnimation from '@/src/ui/user-page-animation';
import SideNavigation from '@/src/ui/side-navigation';

export default function Layout({ children }) {
   return (
      <div className="grid grid-cols-[16rem_1fr] lg:grid-cols-[auto_1fr] sm:grid-cols-1 h-full gap-12 lg:gap-8 2xl:mt-3 sm:mb-48 xs:mb-20">
         <SideNavigation />
         <UserPageAnimation>{children}</UserPageAnimation>
      </div>
   );
}
