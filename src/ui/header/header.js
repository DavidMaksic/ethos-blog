import Navigation from '@/src/ui/navigation/navigation';
import Logo from '@/src/ui/logo';

function Header() {
   return (
      <header className="px-8 py-2 flex justify-between items-center w-7xl 2xl:w-full self-center rounded-3xl mt-6 2xl:mt-5 lg:mt-6 bg-white dark:bg-primary-300/12 shadow-dashboard dark:shadow-none overflow-hidden">
         <Logo />
         <Navigation />
      </header>
   );
}

export default Header;
