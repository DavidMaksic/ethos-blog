'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { useTranslations } from 'use-intl';
import { ImSpinner2 } from 'react-icons/im';
import { useLocale } from 'next-intl';
import { addReply } from '@/src/lib/actions';
import { useAuth } from '@/src/context/auth-context';

import TextareaAutosize from 'react-textarea-autosize';
import AuthModal from '@/src/ui/modal/auth-modal';
import Modal from '@/src/ui/modal/modal';
import toast from 'react-hot-toast';

function ReplyInput({
   slug,
   articleID,
   commentID,
   commentLength,
   setReplyIsOpen,
}) {
   const [isOpen, setIsOpen] = useState(false);
   const [error, setError] = useState(false);
   const [text, setText] = useState('');

   const { session, extendedUser, loading } = useAuth();

   const locale = useLocale();
   const t = useTranslations('Comment');

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

   // - Form submission logic
   const [state, action, isPending] = useActionState(addReply, {
      success: false,
   });

   function handleAction(formData) {
      if (text.length <= 1) return setError(true);
      action(formData);
   }

   function handleChange(e) {
      const input = e.target.value;
      setText(input);
   }

   useEffect(() => {
      if (state.success) {
         setReplyIsOpen((isOpen) => !isOpen);
         setText('');
         toast.success(t('reply-posted'));
         state.success = false;
      }
   }, [state, setReplyIsOpen, t]);

   return (
      <div className="comment-section scroll-mt-20! flex flex-col gap-1.5 ml-14 font-secondary">
         <form
            action={handleAction}
            className={`w-full transition duration-75 ${
               loading || isPending ? 'pointer-events-none opacity-70' : ''
            }`}
         >
            <TextareaAutosize
               minRows={1}
               maxRows={24}
               maxLength={commentLength}
               value={text}
               name="content"
               className={`w-full h-auto min-h-fit border text-primary-600 dark:text-text rounded-3xl px-10 pb-18 py-7 pr-11 text-[1.4rem] 2xl:text-[1.3rem] md:text-[1.6rem] xs:text-[1.5rem] md:leading-9 xs:leading-[1.4] transition-bg_border flex-grow outline-none scrollbar transition-200 md:placeholder:text-[1.6rem] ${
                  text.length === commentLength || error
                     ? 'border-red-400 dark:border-red-400/60'
                     : ' border-primary-300 dark:border-primary-300/50'
               }`}
               placeholder={t('reply-placeholder')}
               onChange={handleChange}
            />

            <input
               hidden
               name="userID"
               defaultValue={session && extendedUser ? extendedUser.id : null}
            />
            <input hidden name="commentID" defaultValue={commentID} />
            <input hidden name="articleID" defaultValue={articleID} />
            <input hidden name="slug" defaultValue={slug} />

            <div className="relative">
               <span
                  className={`absolute bottom-6 rounded-full text-3xl md:text-[2rem] px-4 pt-[5px] pb-[3px] text-primary-500 dark:text-inherit hover:text-primary-400 cursor-pointer transition-200 ${
                     locale === 'en' && `right-32 md:right-33 font-logo`
                  } ${
                     locale === 'sr' &&
                     `py-1 pt-1.5 px-4 pr-5 right-34 md:right-33 font-logo-sr`
                  }`}
                  onClick={() => setReplyIsOpen(false)}
               >
                  {t('cancel-btn')}
               </span>

               <button
                  className={`absolute right-6 bottom-6 rounded-full bg-gradient-to-r from-accent-300/90 dark:from-accent-300/80 to-accent-600/70 dark:to-accent-600/80 hover:from-primary hover:to-primary border-2 border-transparent hover:border-accent/80 shadow-md hover:shadow-none dark:shadow-none transition-[box-shadow,opacity,border,--tw-gradient-from,--tw-gradient-to] duration-300 bg-origin-border group cursor-pointer z-30 ${
                     isPending &&
                     'from-primary to-primary border-accent/80! shadow-none bg-none!'
                  }`}
               >
                  <div
                     className={`flex articles-center gap-5 text-3xl md:text-4xl px-3.5 pr-4.5 py-0.5 pt-1 text-white group-hover:text-accent group-hover:drop-shadow-xs dark:group-hover:text-accent/90 transition-[color] duration-300 cursor-pointer ${
                        locale === 'en' && 'font-logo'
                     } ${
                        locale === 'sr' && `py-1 pt-1.5 px-4 pr-5 font-logo-sr`
                     }`}
                  >
                     {isPending ? (
                        <div className="relative">
                           <span className="opacity-0">{t('post-btn')}</span>
                           <ImSpinner2 className="absolute top-1/2 left-1/2 size-5 text-accent translate-x-[-35%] translate-y-[-54%] animate-spin" />
                        </div>
                     ) : (
                        <span>{t('post-btn')}</span>
                     )}
                  </div>
               </button>
            </div>

            <div className="flex justify-between mt-1 md:mb-3">
               <span
                  className="error font-medium ml-4 text-lg md:text-xl transition-200 opacity-100 text-red-600/50 dark:text-red-300/80"
                  ref={errorRef}
               >
                  {error && t('warning')}
               </span>

               <span
                  className={`text-lg bg-white border border-quaternary dark:border-tertiary dark:bg-primary-200 rounded-full px-4 py-1 pb-1.5 font-medium select-none pointer-events-none ${
                     text.length < commentLength * 0.95 && 'opacity-0'
                  } ${
                     text.length === commentLength
                        ? 'text-red-600/60 bg-red-300/10! dark:text-red-300/80 border-red-300/30! dark:border-red-300/10!'
                        : ''
                  }`}
               >
                  {text.length} / {commentLength}
               </span>
            </div>
         </form>

         <AnimatePresence>
            {isOpen && (
               <Modal closeModal={() => setIsOpen(false)}>
                  <AuthModal
                     onClose={() => setIsOpen(false)}
                     string="comment-label"
                  />
               </Modal>
            )}
         </AnimatePresence>
      </div>
   );
}

export default ReplyInput;
