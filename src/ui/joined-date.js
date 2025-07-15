import { getTranslations } from 'next-intl/server';
import { getUser } from '@/src/lib/data-service';
import { format } from 'date-fns';

async function JoinedDate({ user }) {
   const currentUser = await getUser(user.email);
   const date = format(new Date(currentUser.created_at), 'MMM dd, yyyy');
   const t = await getTranslations('Profile');

   return (
      <div className="w-fit md:w-full flex flex-col gap-2 px-8 py-4 pb-5 bg-white dark:bg-primary-300/10 border border-quaternary dark:border-primary-300/15 rounded-3xl box-shadow transition-bg_border">
         <span className="text-xs md:text-center uppercase font-bold text-primary-400 tracking-wider">
            {t('joined-label')}
         </span>
         <span className="text-[1.3rem] md:text-center font-semibold">
            {date}
         </span>
      </div>
   );
}

export default JoinedDate;
