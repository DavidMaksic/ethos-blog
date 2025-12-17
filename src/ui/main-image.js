import Image from 'next/image';

function MainImage({ article }) {
   return (
      <div className="container relative h-[24rem] 2xl:h-[21rem] sm:h-[17rem]">
         <Image
            className="transition-opacity duration-700 ease-in-out main-image rounded-3xl object-cover opacity-95 dark:opacity-80"
            src={article.image}
            alt="Main image"
            fetchPriority="high"
            priority={true}
            unoptimized
            fill
         />
      </div>
   );
}

export default MainImage;
