import { useLocale, useTranslations } from 'next-intl';
import { HiOutlineUserCircle } from 'react-icons/hi2';
import UserImage from '@/src/ui/user-image';

function Author({ author }) {
   const t = useTranslations('Article');
   const locale = useLocale();

   const { full_name, profile_image, description_en, description_srb } = author;

   return (
      <section className="col-span-5 md:col-span-full w-full flex justify-center bg-white dark:bg-primary-300/10 border border-quaternary dark:border-tertiary rounded-3xl px-12 lg:px-10 md:px-14 xs:px-8 py-12 pb-14 mt-6 transition-bg_border box-shadow">
         <div
            className={`flex flex-col items-center self-center gap-4 justify-self-center ${
               !description_en || !description_srb ? 'mb-10' : ''
            }`}
         >
            <div className="relative size-24 2xl:size-26 md:size-32">
               {profile_image ? (
                  <UserImage url={profile_image} />
               ) : (
                  <HiOutlineUserCircle className="size-22 2xl:size-26 md:size-32 self-center stroke-[0.5px] text-primary-400 dark:text-primary-300" />
               )}
            </div>

            <div className="flex flex-col gap-5 2xl:gap-4 md:gap-5 self-center text-center">
               <div className="flex flex-col">
                  <span
                     className={`text-accent-400 dark:text-accent text-[2.7rem] 2xl:text-[2.8rem] md:text-[3.2rem] w-fit self-center font-logo`}
                  >
                     {full_name}
                  </span>
               </div>

               {author?.description_en || author?.description_srb ? (
                  <p className="text-[1.35rem] leading-7.5 md:text-2xl font-secondary">
                     {locale === 'en'
                        ? author.description_en
                        : author.description_srb}
                  </p>
               ) : (
                  <p className="text-[1.35rem] leading-7.5 md:leading-8 md:text-2xl font-secondary">
                     {t('description')}
                  </p>
               )}
            </div>
         </div>
      </section>
   );
}

export default Author;
