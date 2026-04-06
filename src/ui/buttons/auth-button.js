import { ImSpinner2 } from 'react-icons/im';
import { useLocale } from 'next-intl';

function AuthButton({ loading, label, loadingLabel, font, style }) {
   const locale = useLocale();

   return (
      <button
         type="submit"
         disabled={loading}
         className={`w-full rounded-2xl py-2 bg-gradient-to-r from-accent-400/80 dark:from-accent/60 to-accent-600/70 dark:to-accent-400/50 hover:from-transparent hover:to-transparent border-2 border-transparent hover:border-accent/80 transition-[border,--tw-gradient-from,--tw-gradient-to,box-shadow] duration-300 bg-origin-border group disabled:cursor-auto cursor-pointer disabled:opacity-65 disabled:hover:from-accent-400/80 disabled:dark:hover:from-accent/60 disabled:hover:to-accent-600/70 disabled:dark:hover:to-accent-400/50 disabled:hover:border-transparent text-center ${style} ${loading && 'pointer-events-none'}`}
      >
         <div
            className={`text-3xl md:text-4xl text-white dark:text-accent-100/90 group-hover:text-accent group-hover:drop-shadow-xs dark:group-hover:text-accent/90 transition-[color] duration-300 ${
               locale === 'en' ? 'font-logo' : 'font-logo-sr'
            } ${font}`}
         >
            {loading ? (
               <div className="flex items-center gap-4 justify-center">
                  <ImSpinner2 className="size-6 text-inherit animate-spin" />
                  <span>{loadingLabel}</span>
               </div>
            ) : (
               <span>{label}</span>
            )}
         </div>
      </button>
   );
}

export default AuthButton;
