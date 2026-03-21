import { useTranslations } from 'next-intl';
import Logo from '@/src/ui/logo';

function LoginHeader({ mode }) {
   const t = useTranslations();

   return (
      <div className="flex flex-col gap-2 text-center">
         <Logo className="md:text-6xl! p-0! pt-1!" />

         <h2 className="text-2xl md:text-3xl sm:text-[1.6rem] text-primary-500 dark:text-white/60 font-semibold">
            {mode === 'signin' && t('Auth.label-1')}
            {mode === 'signup' && t('Auth.label-2')}
            {mode === 'forgot' && t('Auth.label-3')}
         </h2>
      </div>
   );
}

export default LoginHeader;
