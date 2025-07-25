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
         className="size-10 xl:size-[2.4rem] backdrop-blur-md p-2 stroke-2 text-primary-400 group-hover:text-primary-500 dark:text-primary-400 dark:group-hover:text-primary-500 transition-color hover:bg-gradient-to-b hover:from-[rgba(255,255,255,0.25)] hover:to-[rgba(255,255,255,0.05)] hover:bg-[rgba(30,30,30,0.7)] border border-white/20"
         onClick={navigate}
      />
   );
}

export default BackButton;
