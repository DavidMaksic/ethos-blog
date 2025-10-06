import { FaHeart, FaRegHeart } from 'react-icons/fa';

function LikeButton({ styles, isLiked }) {
   const iconStyle = `${styles} size-11 md:size-13 p-2.5 text-primary-400 group-hover:text-red-400/70! dark:group-hover:text-primary-500 transition-color`;

   return (
      <>
         {isLiked ? (
            <FaHeart
               className={`${styles} size-11 md:size-13 p-2.5 text-red-600/40! dark:text-red-400/65! dark:group-hover:text-primary-500 transition-color`}
            />
         ) : (
            <FaRegHeart className={iconStyle} />
         )}
      </>
   );
}

export default LikeButton;
