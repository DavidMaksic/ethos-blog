'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { updateImage } from '@/src/lib/actions';
import { ImSpinner2 } from 'react-icons/im';
import { LuPencil } from 'react-icons/lu';

import RemoteImage from '@/src/ui/image/remote-image';
import toast from 'react-hot-toast';

function ProfileImage({ user, image }) {
   const t = useTranslations('Profile');
   const imageRef = useRef(null);
   const [currentImage, setCurrentImage] = useState();
   const [state, action, isPending] = useActionState(updateImage, {
      success: false,
   });

   function handlePreviewImage(e) {
      const img = e.target.files[0];
      setCurrentImage(img);
      imageRef.current.src = URL.createObjectURL(img);
      imageRef.current.srcset = URL.createObjectURL(img);
   }

   function handleImageUpdate(formData) {
      const fileType = formData.get('newImage').type;
      if (
         fileType === 'image/jpeg' ||
         fileType === 'image/png' ||
         fileType === 'image/webp' ||
         fileType === 'image/svg+xml'
      ) {
         action(formData);
      } else {
         toast.error(t('pfp-warning'));
      }
   }

   useEffect(() => {
      if (state.success) {
         toast.success(t('pfp-updated'));
         state.success = false;
      }
   }, [state, t]);

   return (
      <form
         className="size-fit flex flex-col items-center gap-4 bg-white dark:bg-primary-300/10 rounded-3xl border border-quaternary dark:border-primary-300/15 text-lg text-[#4d525c] dark:text-slate-300/80 font-medium px-20 lg:px-18 md:px-22 py-6 box-shadow transition-200"
         action={handleImageUpdate}
      >
         <span className="text-sm uppercase font-semibold text-primary-400 tracking-wider">
            {t('pfp')}
         </span>

         <label
            className="relative size-24 lg:size-22 md:size-30 hover:opacity-80 cursor-pointer transition-[opacity_0.2s]"
            htmlFor="image"
         >
            <RemoteImage
               imageRef={imageRef}
               imageUrl={image ? image : user.image}
               alt="User profile image"
               styles="block aspect-square object-cover object-center rounded-full dark:opacity-90 border border-quaternary"
               priority
            />

            <input
               hidden
               id="image"
               name="newImage"
               accept="image/*"
               type="file"
               onChange={handlePreviewImage}
            />

            <LuPencil className="absolute right-0 bottom-0 size-7 md:size-9 px-[0.4rem] pt-px rounded-full text-primary-500/80 dark:text-primary-400 bg-white dark:bg-primary-200 border border-primary-300 dark:border-quaternary transition-200" />
         </label>

         <input hidden name="oldImage" type="text" defaultValue={image} />
         <input hidden name="userID" type="text" defaultValue={user.userID} />

         <button
            className={`hover:bg-accent-400 dark:hover:bg-accent-300/60 border border-quaternary hover:border-transparent hover:text-white rounded-full p-1 px-4 cursor-pointer hover:shadow-link-btn dark:hover:shadow-link-btn-dark transition ${
               !currentImage || isPending || state.success
                  ? 'opacity-50 pointer-events-none'
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
