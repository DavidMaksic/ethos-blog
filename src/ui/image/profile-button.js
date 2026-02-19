import { authClient } from '@/src/lib/auth-client';
import { useRef } from 'react';
import { Link } from '@/src/i18n/navigation';

import defaultPfp from '@/public/default-pfp.png';
import Image from 'next/image';

function ProfileButton() {
   const { data } = authClient.useSession();
   const user = data?.user;

   const lastImage = useRef(defaultPfp);
   if (user?.image) lastImage.current = user.image;
   const profileImage = lastImage.current;

   return (
      <Link
         href="/user/home"
         className="mx-[-2px] block hover:text-accent bg-none border-none p-2 rounded-xl hover:bg-primary-200/40 dark:hover:bg-primary-300/30 [&_svg]:size-6 [&_svg]:text-accent cursor-pointer select-none md:hidden transition-200"
      >
         <div className="relative size-7.5!">
            <Image
               className={`rounded-full block aspect-square object-cover object-center border border-primary-300 transition-200 opacity-90 ${profileImage === defaultPfp ? 'dark:opacity-55!' : ''}`}
               src={profileImage}
               alt="Profile image"
               unoptimized
               priority
               fill
            />
         </div>
      </Link>
   );
}

export default ProfileButton;
