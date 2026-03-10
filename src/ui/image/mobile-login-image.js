import LoginImage from '@/src/ui/image/login-image';

function MobileLoginImage({ url, credit, creditLabel }) {
   return (
      <div className="md:hidden">
         <div className="absolute inset-0">
            <LoginImage url={url} />
         </div>
         <p className="absolute right-4 bottom-2 text-lg lg:text-base text-white/80 dark:text-white/60">
            {creditLabel}
            {credit}
         </p>
      </div>
   );
}

export default MobileLoginImage;
