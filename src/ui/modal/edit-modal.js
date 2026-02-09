import { editComment, editReply } from '@/src/lib/actions';
import { useTranslations } from 'next-intl';
import { ImSpinner2 } from 'react-icons/im';
import { useState } from 'react';

import TextareaAutosize from 'react-textarea-autosize';
import ErrorValidation from '@/src/ui/error-validation';
import toast from 'react-hot-toast';

function EditModal({ comment, commentLength, replyID, slug, onClose }) {
   const [text, setText] = useState(comment.content);
   const [error, setError] = useState(null);

   const [isPending, setIsPending] = useState(false);
   const t = useTranslations('Comment');

   function handleChange(e) {
      setText(e.target.value);
      setError(null);
   }

   async function handleEdit() {
      setIsPending(true);
      setError(null);
      setIsPending(true);

      if (replyID) {
         let result;
         result = await editReply(replyID, text, slug, commentLength);

         if (result?.success) {
            onClose();
            toast.success(t('edited-reply'));
         } else {
            setError(result.error);
         }

         return setIsPending(false);
      }

      let result;
      result = await editComment(comment.id, text, slug, commentLength);

      if (result?.success) {
         onClose();
         toast.success(t('edited-comment'));
      } else {
         setError(result.error);
      }

      setIsPending(false);
   }

   return (
      <div className="flex flex-col items-center">
         <span className="text-primary-600 dark:text-primary-500 w-4/5 md:w-[28rem] xs:w-[25rem] 3xs:w-[23rem] md:px-12 xs:px-0 text-center text-[2.2rem] leading-11 pb-8">
            {replyID ? t('edit-label-reply') : t('edit-label-comment')}
         </span>

         <div className="font-secondary w-[45rem] md:w-[85vw] xs:w-[80vw] px-10 sm:px-6 xs:px-0">
            <TextareaAutosize
               minRows={1}
               maxRows={11}
               maxLength={commentLength}
               value={text}
               name="content"
               className={`w-full h-auto min-h-fit border text-primary-600 dark:text-text rounded-3xl px-10 pb-9 py-7 pr-11 text-[1.4rem] 2xl:text-[1.3rem] md:text-[1.6rem] xs:text-[1.5rem] md:leading-9 xs:leading-[1.4] transition-bg_border flex-grow outline-none scrollbar transition-200 md:placeholder:text-[1.6rem] ${
                  text.length > commentLength || error
                     ? 'border-red-400 dark:border-red-400/60'
                     : ' border-primary-300 dark:border-primary-300/50'
               }`}
               onChange={handleChange}
            />
            <ErrorValidation
               error={error}
               text={text}
               commentLength={commentLength}
            />
         </div>

         <div className="flex items-center gap-2 text-3xl">
            <button
               className={`relative font-semibold rounded-full py-2 px-5 cursor-pointer text-accent hover:bg-accent-400/80 dark:hover:bg-accent-300/55 hover:text-white dark:hover:text-accent-100 hover:shadow-link-btn dark:hover:shadow-none transition tracking-wide ${
                  isPending || comment.content === text
                     ? 'pointer-events-none opacity-50'
                     : ''
               }`}
               onClick={handleEdit}
            >
               {isPending ? (
                  <>
                     <ImSpinner2 className="size-5 animate-spin absolute right-45 top-4 text-accent-500 dark:text-accent-300/90" />
                     <span>{t('editing')}</span>
                  </>
               ) : (
                  <span>{t('edit')}</span>
               )}
            </button>

            <span className="font-bold text-[#b7babe] dark:text-primary-300 select-none">
               /
            </span>

            <button
               className={`mx-4 mr-6 font-semibold tracking-wider text-primary-500 dark:text-primary-400 hover:text-primary-400 dark:hover:text-primary-500 cursor-pointer transition ${
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

export default EditModal;
