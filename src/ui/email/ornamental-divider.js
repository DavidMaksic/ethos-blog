import { getTranslations } from 'next-intl/server';

async function OrnamentalDivider() {
   const t = await getTranslations('Newsletter');

   return (
      <div className="absolute left-1/2 top-10 -translate-x-[50%] z-10 pointer-events-none">
         <div className="flex items-center gap-3 mb-1">
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-accent-400 to-transparent dark:via-accent-300/90" />
            <span className="text-accent-500 dark:text-accent-200/80 text-base leading-none">
               ◆
            </span>
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-accent-400 to-transparent dark:via-accent-300/90" />
         </div>
         <p className="font-title text-base font-semibold tracking-[0.2em] uppercase text-accent-600 dark:text-accent-200/90">
            {t('eyebrow')}
         </p>
      </div>
   );
}

export default OrnamentalDivider;
