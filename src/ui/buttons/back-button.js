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
         className="w-72 h-40 rounded-xl bg-[rgba(30,30,30,0.7)] backdrop-blur-md text-white flex items-center justify-center cursor-pointer transition-all duration-300
                    hover:bg-gradient-to-b hover:from-[rgba(255,255,255,0.25)] hover:to-[rgba(255,255,255,0.05)]
                    hover:bg-[rgba(30,30,30,0.7)] border border-white/20 shadow-lg"
         onClick={navigate}
      />
   );
}

export default BackButton;
