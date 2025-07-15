import Image from 'next/image';

function RemoteImage({ imageRef = null, imageUrl, styles, alt }) {
   return (
      <Image
         ref={imageRef}
         className={styles}
         fill
         src={imageUrl}
         alt={alt ? alt : 'Image'}
      />
   );
}

export default RemoteImage;
