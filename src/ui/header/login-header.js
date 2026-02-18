import { useLocale, useTranslations } from 'next-intl';

function LoginHeader({ mode }) {
   const locale = useLocale();
   const t = useTranslations();

   return (
      <div className="flex flex-col gap-2 text-center">
         <span
            className={`text-5xl md:text-6xl text-accent-600/80 dark:text-accent/90 ${
               locale === 'en' && 'font-logo'
            } ${locale === 'sr' && 'font-logo-sr'}`}
         >
            {t('Logo')}
         </span>

         <h2 className="text-2xl md:text-3xl sm:text-[1.6rem] text-primary-500 dark:text-white/60 font-semibold">
            {mode === 'signin' ? t('Auth.label-1') : t('Auth.label-2')}
         </h2>
      </div>
   );
}

export default LoginHeader;
