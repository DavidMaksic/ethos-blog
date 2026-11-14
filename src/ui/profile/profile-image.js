'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { ALLOWED_TYPES, MAX_SIZE } from '@/src/utils/config';
import { useTranslations } from 'next-intl';
import { updateImage } from '@/src/lib/image-actions';
import { resizeImage } from '@/src/utils/helpers';
import { authClient } from '@/src/lib/auth-client';
import { ImSpinner2 } from 'react-icons/im';
import { LuPencil } from 'react-icons/lu';

import RemoteProfileImage from '@/src/ui/image/remote-profile-image';
import defaultPfp from '@/public/default-pfp.png';
import toast from 'react-hot-toast';

function ProfileImage({ user }) {
   const t = useTranslations('Profile');
   const { refetch } = authClient.useSession();

   const imageRef = useRef(null);
   const [currentImage, setCurrentImage] = useState();
   const [state, action, isPending] = useActionState(updateImage, {
      success: false,
   });

   async function handlePreviewImage(e) {
      const img = e.target.files[0];
      if (!img) return;

      try {
         const resized = await resizeImage(img);
         const url = URL.createObjectURL(resized);

         setCurrentImage(resized);
         imageRef.current.src = url;
         imageRef.current.srcset = url;
      } catch {
         toast.error(t('pfp-warning'));
      }
   }

   function handleImageUpdate(formData) {
      const file = formData.get('newImage');

      if (!(file instanceof File) || file.size === 0) {
         toast.error(t('pfp-warning'));
         return;
      }

      if (!ALLOWED_TYPES.includes(file.type)) {
         toast.error(t('pfp-warning'));
         return;
      }

      if (file.size > MAX_SIZE) {
         toast.error(t('pfp-too-large'));
         return;
      }

      action(formData);
   }

   useEffect(() => {
      if (state.success) {
         toast.success(t('pfp-updated'));
         state.success = false;
         setCurrentImage(undefined);
         refetch();
      }
   }, [state, t, refetch]);

   const profileImage = user?.image ?? defaultPfp;

   return (
      <form
         className="flex flex-col justify-center items-center min-w-80 sm:w-full gap-4 bg-white dark:bg-primary-300/10 rounded-3xl border border-quaternary dark:border-primary-300/15 text-lg text-text font-medium px-20 lg:px-18 md:px-22 py-6 box-shadow transition-200"
         action={handleImageUpdate}
      >
         <span className="text-sm uppercase font-semibold text-primary-400 tracking-wider">
            {t('pfp')}
         </span>

         <label
            className="relative size-28 md:size-28 sm:size-30 cursor-pointer group"
            htmlFor="image"
         >
            <RemoteProfileImage
               imageRef={imageRef}
               imageUrl={profileImage}
               alt="User profile image"
               styles={`block aspect-square object-cover object-center rounded-full dark:opacity-90 border border-primary-300 dark:border-primary-300/40 group-hover:opacity-80 duration-200! ${user?.image === defaultPfp ? 'dark:opacity-40!' : ''}`}
               preload
            />

            <input
               hidden
               id="image"
               name="newImage"
               accept="image/*"
               type="file"
               onChange={handlePreviewImage}
            />

            <LuPencil className="absolute right-0 bottom-0 size-7 md:size-8.5 sm:size-9 px-[0.4rem] pt-px rounded-full text-primary-500/80 dark:text-primary-400 bg-white dark:bg-primary/60 backdrop-blur-3xl border border-primary-300 dark:border-primary-300/40 transition-200" />
         </label>

         <button
            className={`hover:bg-accent-400 dark:hover:bg-accent-300/60 border border-quaternary hover:border-transparent hover:text-white rounded-full p-1 px-4 cursor-pointer hover:shadow-link-btn dark:hover:shadow-link-btn-dark transition ${
               !currentImage && 'opacity-40 pointer-events-none'
            } ${
               isPending || state.success
                  ? 'opacity-70 pointer-events-none'
                  : ''
            }`}
         >
            {isPending ? (
               <div className="relative">
                  <span className="opacity-0 text-xl md:text-2xl">
                     {t('update')}
                  </span>
                  <ImSpinner2 className="absolute top-1/2 left-1/2 size-5 translate-x-[-50%] translate-y-[-50%] animate-spin" />
               </div>
            ) : (
               <span className="text-xl md:text-2xl">{t('update')}</span>
            )}
         </button>
      </form>
   );
}

export default ProfileImage;
