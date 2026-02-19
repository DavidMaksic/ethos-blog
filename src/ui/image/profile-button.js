import { authClient } from '@/src/lib/auth-client';
import { useState } from 'react';
import { Link } from '@/src/i18n/navigation';

import defaultPfp from '@/public/default-pfp.png';
import Image from 'next/image';

function ProfileButton() {
   const [loaded, setLoaded] = useState(false);

   const { data } = authClient.useSession();
   const user = data?.user;
   const profileImage = user?.image ?? defaultPfp;

   return (
      <Link
         href="/user/home"
         className="mx-[-2px] block hover:text-accent bg-none border-none p-2 rounded-xl transition-200 hover:bg-primary-200/40 dark:hover:bg-primary-300/30 [&_svg]:size-6 [&_svg]:text-accent cursor-pointer select-none md:hidden"
      >
         <div className="relative size-7.5!">
            <Image
               className={`rounded-full block aspect-square object-cover object-center border border-primary-300 transition-200 ${
                  loaded ? 'opacity-90' : 'opacity-0'
               } ${profileImage === defaultPfp ? 'dark:opacity-55!' : ''}`}
               src={profileImage}
               alt="Profile image"
               onLoad={() => setLoaded(true)}
               unoptimized
               priority
               fill
            />
         </div>
      </Link>
   );
}

export default ProfileButton;
