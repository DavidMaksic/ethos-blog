import Navigation from '@/src/ui/navigation';
import Logo from '@/src/ui/logo';

function Header() {
   return (
      <header className="px-8 py-2 flex justify-between items-center dark:border-tertiary w-7xl xl:w-full self-center rounded-3xl mt-6 shadow-xs bg-white/50 dark:bg-primary-300/12 overflow-hidden">
         <Logo />
         <Navigation />
      </header>
   );
}

export default Header;
