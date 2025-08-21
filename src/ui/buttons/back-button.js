'use client';

import { HiOutlineArrowUturnLeft } from 'react-icons/hi2';
import { useCallback } from 'react';
import { useRouter } from '@/src/i18n/navigation';

function BackButton() {
   const router = useRouter();

   const navigate = useCallback(() => {
      router.back();
   }, [router]);

   return (
      <HiOutlineArrowUturnLeft
         className="size-11 2xl:size-10.5 p-2.5 stroke-2 text-primary-400 group-hover:text-primary-500 dark:text-primary-400 dark:group-hover:text-primary-500 transition-color"
         onClick={navigate}
      />
   );
}

export default BackButton;
