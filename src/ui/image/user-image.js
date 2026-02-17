import defaultPfp from '@/public/default-pfp.png';
import Image from 'next/image';

function UserImage({ url }) {
   const profileImage = url || defaultPfp;

   return (
      <Image
         className={`block aspect-square object-cover object-center rounded-full dark:opacity-90 ${profileImage === defaultPfp ? 'dark:opacity-40!' : ''}`}
         src={profileImage}
         alt="User image"
         unoptimized
         fill
      />
   );
}

export default UserImage;
