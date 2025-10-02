import Image from 'next/image';

function RemoteImage({ imageRef = null, imageUrl, styles, alt }) {
   return (
      <Image
         ref={imageRef}
         className={styles}
         fill
         src={imageUrl}
         alt={alt ? alt : 'Image'}
         priority={true}
         // quality={60}
         fetchPriority="high"
         sizes="100vw"
         // sizes="(max-width: 400px) 300px, (max-width: 630px) 600px, (max-width: 1020px) 1000px, (max-width: 2300px) 1200px, 100vw"
      />
   );
}

export default RemoteImage;
