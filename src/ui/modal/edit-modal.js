import { useEffect, useRef, useState } from 'react';
import { editComment, editReply } from '@/src/lib/actions';
import { useTranslations } from 'next-intl';
import { ImSpinner2 } from 'react-icons/im';

import TextareaAutosize from 'react-textarea-autosize';
import toast from 'react-hot-toast';

function EditModal({ comment, commentLength, replyID, slug, onClose }) {
   const [text, setText] = useState(comment.content);
   const [error, setError] = useState(false);
   const [isPending, setIsPending] = useState(false);
   const t = useTranslations('Comment');

   function handleChange(e) {
      const input = e.target.value;
      setText(input);
   }

   async function handleEdit() {
      if (text.length <= 1) return setError(true);

      if (replyID) {
         console.log('replyID: ', replyID);
         setIsPending(true);
         let result;
         result = await editReply(replyID, text, slug);

         if (result?.success) {
            onClose();
            toast.success(t('edited-reply'));
         }

         return setIsPending(false);
      }

      setIsPending(true);
      let result;
      result = await editComment(comment.id, text, slug);

      if (result?.success) {
         onClose();
         toast.success(t('edited-comment'));
      }

      setIsPending(false);
   }

   // - Error logic
   const errorRef = useRef(null);

   useEffect(() => {
      if (error) {
         setTimeout(() => {
            if (errorRef.current) errorRef.current.style.opacity = '0%';
         }, 5000);

         setTimeout(() => {
            setError(false);
            if (errorRef.current) errorRef.current.style.opacity = '100%';
         }, 5100);
      }
   }, [error]);

   return (
      <div className="flex flex-col items-center">
         <span className="text-primary-600 dark:text-primary-500 w-4/5 md:w-[28rem] xs:w-[25rem] 3xs:w-[23rem] md:px-12 xs:px-0 text-center text-[2.2rem] leading-11 pb-8">
            {replyID ? t('edit-label-reply') : t('edit-label-comment')}
         </span>

         <div className="font-secondary w-[45rem] md:w-[85vw] xs:w-[80vw] px-10 sm:px-6 xs:px-0">
            <TextareaAutosize
               minRows={1}
               maxRows={10}
               maxLength={commentLength}
               value={text}
               name="content"
               className={`w-full h-auto min-h-fit border text-primary-600 dark:text-text rounded-3xl px-10 pb-18 py-7 pr-11 text-[1.4rem] 2xl:text-[1.3rem] md:text-[1.6rem] xs:text-[1.5rem] md:leading-9 xs:leading-[1.4] transition-bg_border flex-grow outline-none scrollbar transition-200 md:placeholder:text-[1.6rem] ${
                  text.length === commentLength || error
                     ? 'border-red-400 dark:border-red-400/60'
                     : ' border-primary-300 dark:border-primary-300/50'
               }`}
               onChange={handleChange}
            />
            <div className="flex justify-between">
               <span
                  className="error font-medium ml-4 text-lg md:text-xl transition-200 opacity-100 text-red-600/50 dark:text-red-300/80"
                  ref={errorRef}
               >
                  {error && t('warning')}
               </span>

               <span
                  className={`text-lg  bg-white border border-quaternary dark:border-tertiary dark:bg-primary-200 rounded-full px-4 py-1 pb-1.5 font-medium select-none pointer-events-none ${
                     text.length < 701 && 'opacity-0'
                  } ${
                     text.length === commentLength
                        ? 'text-red-600/60 bg-red-300/10! dark:text-red-300/80 border-red-300/30! dark:border-red-300/10!'
                        : ''
                  }`}
               >
                  {text.length} / {commentLength}
               </span>
            </div>
         </div>

         <div className="flex items-center gap-2 text-3xl">
            <button
               className={`relative font-semibold rounded-full p-2 px-6 cursor-pointer hover:shadow-edit-btn dark:hover:shadow-none transition tracking-wide ${
                  !isPending
                     ? 'hover:bg-accent-400/80 dark:hover:bg-accent-300/55 hover:text-white dark:hover:text-accent-100'
                     : 'text-accent-500 dark:text-accent-300/90 pl-12.5!  hover:shadow-none! pointer-events-none'
               }`}
               onClick={handleEdit}
            >
               {isPending ? (
                  <>
                     <ImSpinner2 className="size-5 animate-spin absolute right-34 top-4 text-accent-500 dark:text-accent-300/90" />
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
               className={`mx-4 mr-6 font-semibold tracking-wider text-primary-500/80 dark:text-primary-400 hover:text-primary-400 dark:hover:text-primary-500 cursor-pointer transition ${
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
