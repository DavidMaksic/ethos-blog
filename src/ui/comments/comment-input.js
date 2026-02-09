'use client';

import { useActionState, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { HiOutlineUserCircle } from 'react-icons/hi2';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence } from 'motion/react';
import { addComment } from '@/src/lib/actions';
import { ImSpinner2 } from 'react-icons/im';
import { useRouter } from '@/src/i18n/navigation';
import { useAuth } from '@/src/context/auth-context';

import TextareaAutosize from 'react-textarea-autosize';
import AuthModal from '@/src/ui/modal/auth-modal';
import Modal from '@/src/ui/modal/modal';
import toast from 'react-hot-toast';
import Image from 'next/image';

function CommentInput({ article, commentLength }) {
   const [isOpen, setIsOpen] = useState();
   const [error, setError] = useState(null);
   const [text, setText] = useState('');
   const { session, user, extendedUser, loading } = useAuth();

   const locale = useLocale();
   const t = useTranslations('Comment');

   // - Error logic
   useEffect(() => {
      if (!error) return;

      const timeout = setTimeout(() => {
         setError(null);
      }, 5000);

      return () => clearTimeout(timeout);
   }, [error]);

   // - Form submission logic
   const [state, action, isPending] = useActionState(addComment, {
      success: false,
   });

   function handleAction(formData) {
      if (text.trim().length <= 1) {
         setError(t('warning'));
         return;
      }

      setError(null);
      action(formData);
   }

   useEffect(() => {
      setTimeout(() => {
         if (typeof window !== 'undefined' && window.location.hash) {
            history.replaceState(null, '', window.location.pathname);
         }
      }, 2000);
   }, []);

   function handleChange(e) {
      const input = e.target.value;
      setText(input);
   }

   const searchParams = useSearchParams();
   const router = useRouter();

   useEffect(() => {
      if (state.success) {
         setText('');
         toast.success(t('posted'));
         state.success = false;

         const params = new URLSearchParams(searchParams);
         params.delete('sort');
         router.push(`?${params.toString()}`, { scroll: false });
      }
   }, [state, t]); // eslint-disable-line

   return (
      <div className="comment-section scroll-mt-20! flex flex-col gap-1.5 mt-20 font-secondary">
         <div className="flex gap-4">
            <div className="py-3 px-2 sm:hidden">
               {extendedUser ? (
                  <div className="relative block size-16">
                     <Image
                        className="rounded-full block aspect-square object-cover object-center dark:opacity-90 border border-primary-300 transition-200"
                        src={
                           extendedUser.image ? extendedUser.image : user.image
                        }
                        alt="Profile image"
                        unoptimized
                        fill
                     />
                  </div>
               ) : (
                  <HiOutlineUserCircle className="size-16 stroke-[0.5px] text-primary-400/70 dark:text-primary-300" />
               )}
            </div>

            <form
               action={handleAction}
               className={`w-full transition duration-75 ${
                  loading || isPending ? 'pointer-events-none opacity-60' : ''
               }`}
               onClick={() => {
                  if (!session) setIsOpen(true);
               }}
            >
               <TextareaAutosize
                  minRows={1}
                  maxRows={24}
                  maxLength={commentLength}
                  value={text}
                  name="content"
                  className={`w-full h-auto min-h-fit border text-primary-600 dark:text-text rounded-3xl px-10 pb-18 py-7 pr-11 text-[1.4rem] 2xl:text-[1.3rem] md:text-[1.6rem] xs:text-[1.5rem] md:leading-9 xs:leading-[1.4]  transition-bg_border flex-grow outline-none scrollbar transition-200 md:placeholder:text-[1.6rem] ${
                     !session && 'pointer-events-none'
                  } ${
                     text.length === commentLength || error
                        ? 'border-red-400 dark:border-red-400/60'
                        : ' border-primary-300 dark:border-primary-300/50'
                  }`}
                  placeholder={t('placeholder')}
                  onChange={handleChange}
               />

               <input
                  hidden
                  name="userID"
                  defaultValue={
                     session && extendedUser ? extendedUser.id : null
                  }
               />
               <input hidden name="slug" defaultValue={article.slug} />
               <input hidden name="articleID" defaultValue={article.id} />

               <div className="relative">
                  <button
                     className={`absolute right-6 bottom-6 rounded-full bg-gradient-to-r from-accent-300/90 dark:from-accent-300/80 to-accent-600/70 dark:to-accent-600/80 hover:from-primary hover:to-primary border-2 border-transparent hover:border-accent/80 shadow-md hover:shadow-none dark:shadow-none transition-[box-shadow,opacity,border,--tw-gradient-from,--tw-gradient-to] duration-300 bg-origin-border group cursor-pointer ${
                        isPending &&
                        'from-primary to-primary border-accent/80! shadow-none bg-none!'
                     } ${!session && 'pointer-events-none'}`}
                  >
                     <div
                        className={`flex articles-center gap-5 text-3xl md:text-4xl px-3.5 pr-4.5 py-0.5 pt-1 text-white group-hover:text-accent group-hover:drop-shadow-xs dark:group-hover:text-accent/90 transition-[color] duration-300 cursor-pointer ${
                           locale === 'en' && 'font-logo'
                        } ${
                           locale === 'sr' &&
                           `py-1 pt-1.5 px-4 pr-5 font-logo-sr`
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
                     className={`error font-medium ml-4 text-lg md:text-xl transition-200 text-red-600/50 dark:text-red-300/80 ${
                        error ? 'opacity-100' : 'opacity-0'
                     }`}
                  >
                     {error}
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
         </div>

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

export default CommentInput;
