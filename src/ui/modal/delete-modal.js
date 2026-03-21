import { deleteComment, deleteReply } from '@/src/lib/actions';
import { useLocale, useTranslations } from 'next-intl';
import { ImSpinner2 } from 'react-icons/im';
import { useState } from 'react';
import toast from 'react-hot-toast';

function DeleteModal({ slug, onClose, commentID, replyID }) {
   const t = useTranslations('Comment');
   const locale = useLocale();
   const [isPending, setIsPending] = useState(false);

   async function handleDelete() {
      setIsPending(true);
      let result;

      if (replyID) {
         result = await deleteReply(replyID, slug);
      } else {
         result = await deleteComment(commentID, slug);
      }

      if (result?.success) {
         onClose();

         if (replyID) {
            toast.success(t('reply-deleted'));
         } else {
            toast.success(t('deleted'));
         }
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
               className={`relative rounded-full pt-3.5 pb-2.5 pl-6 pr-5.5 cursor-pointer hover:shadow-delete-btn dark:hover:shadow-none transition tracking-wide text-4xl ${
                  !isPending
                     ? 'hover:bg-red-400/70 dark:hover:bg-red-400/45 hover:text-white dark:hover:text-red-100 text-[#ca6565] dark:text-[#e78989] '
                     : 'text-[#db7979] dark:text-[#cc7272] hover:shadow-none! pointer-events-none'
               } ${locale === 'en' ? 'font-logo' : 'font-logo-sr'}`}
               onClick={handleDelete}
            >
               {isPending ? (
                  <>
                     <ImSpinner2
                        className={`size-7 animate-spin absolute right-41 top-4 text-[#db7979] dark:text-[#cc7272] ${
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
               className={`mx-4 mr-6 font-semibold tracking-wider text-primary-500 dark:text-primary-400 hover:text-primary-400  dark:hover:text-primary-500 cursor-pointer transition ${
                  isPending && 'pointer-events-none'
               }`}
               onClick={onClose}
            >
               {t('cancel')}
            </button>
         </div>
      </div>
   );
}

export default DeleteModal;
