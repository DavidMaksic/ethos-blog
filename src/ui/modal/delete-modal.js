import { useLocale, useTranslations } from 'next-intl';
import { startTransition, useState } from 'react';
import { deleteComment } from '@/src/lib/actions';
import { ImSpinner2 } from 'react-icons/im';
import toast from 'react-hot-toast';

function DeleteModal({
   slug,
   onClose,
   commentID,
   replyID,
   articleID,
   onDelete,
}) {
   const t = useTranslations('Comment');
   const locale = useLocale();
   const [isPending, setIsPending] = useState(false);

   async function handleDelete() {
      setIsPending(true);
      let result;
      result = await deleteComment(commentID, slug);

      if (result?.success) {
         onClose();
         toast.success(t('deleted'));
      }

      setIsPending(false);
   }

   return (
      <div className="flex flex-col items-center gap-10">
         <span className="text-primary-600 dark:text-primary-500 w-4/5 md:w-[28rem] xs:w-[25rem] 3xs:w-[23rem] md:px-12 xs:px-0 text-center text-[2.2rem] leading-11 border-b border-b-quaternary pb-10">
            {t('delete-label')}
         </span>

         <div className="flex items-center gap-2 text-3xl">
            <button
               className={`relative font-semibold rounded-full p-2 px-6 cursor-pointer hover:shadow-delete-btn dark:hover:shadow-none transition tracking-wide ${
                  !isPending
                     ? 'hover:bg-red-400/70 dark:hover:bg-red-400/45 hover:text-white dark:hover:text-red-100'
                     : 'text-[#db7979] dark:text-[#cc7272] pl-12.5!  hover:shadow-none!'
               }`}
               onClick={() => {
                  if (replyID) {
                     startTransition(() => onDelete(replyID, articleID));
                     onClose();
                  } else {
                     handleDelete();
                  }
               }}
            >
               {isPending ? (
                  <>
                     <ImSpinner2
                        className={`size-5 animate-spin absolute right-36 top-4 text-[#db7979] dark:text-[#cc7272] ${
                           locale === 'sr' && 'mr-3.5'
                        }`}
                     />
                     <span>{t('deleting')}</span>
                  </>
               ) : (
                  <span>{t('delete')}</span>
               )}
            </button>

            <span className="font-bold text-[#b7babe] dark:text-primary-300 select-none">
               /
            </span>

            <button
               className="mx-4 mr-6 font-semibold tracking-wider text-primary-500/80 dark:text-primary-400 hover:text-primary-400 dark:hover:text-primary-500 cursor-pointer transition"
               onClick={onClose}
            >
               {t('cancel')}
            </button>
         </div>
      </div>
   );
}

export default DeleteModal;
