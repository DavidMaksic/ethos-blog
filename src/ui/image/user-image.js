import Image from 'next/image';

function UserImage({ url }) {
   return (
      <Image
         className="block aspect-square object-cover object-center rounded-full dark:opacity-90"
         src={url}
         alt="User image"
         unoptimized
         fill
      />
   );
}

export default UserImage;
