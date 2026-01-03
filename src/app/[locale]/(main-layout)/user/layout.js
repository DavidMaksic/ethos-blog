import UserPageAnimation from '@/src/ui/animation/user-page-animation';
import SideNavigation from '@/src/ui/navigation/side-navigation';

export default function Layout({ children }) {
   return (
      <div className="h-[80dvh] grid grid-cols-[16rem_1fr] lg:grid-cols-[auto_1fr] sm:grid-cols-1 gap-12 lg:gap-8">
         <SideNavigation />
         <UserPageAnimation>{children}</UserPageAnimation>
      </div>
   );
}
