import Image from 'next/image';

function MainImage({ url }) {
   return (
      <div className="container relative h-[24rem] 2xl:h-[21rem] sm:h-[17rem]">
         <Image
            className="transition-opacity duration-700 ease-in-out main-image rounded-3xl object-cover opacity-90 dark:opacity-75"
            src={url}
            alt="Main image"
            fetchPriority="high"
            unoptimized
            priority
            fill
         />
      </div>
   );
}

export default MainImage;
