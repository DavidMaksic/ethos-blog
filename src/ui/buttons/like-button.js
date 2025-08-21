import { FaHeart, FaRegHeart } from 'react-icons/fa';

function LikeButton({ styles, articleID, likedArticles, isLiked }) {
   const likedArticle = likedArticles.find(
      (item) => item.articleID === articleID
   );

   return (
      <>
         {!likedArticle?.length ? (
            isLiked ? (
               <FaHeart
                  className={`${styles} size-11 md:size-12 p-2.5 text-red-600/40! dark:text-red-400/65! dark:group-hover:text-primary-500 transition-color`}
               />
            ) : (
               <FaRegHeart
                  className={`${styles} size-11 md:size-12 p-2.5 text-primary-400 group-hover:text-red-400/70! dark:group-hover:text-primary-500 transition-color`}
               />
            )
         ) : (
            <FaRegHeart
               className={`${styles} size-11 p-2.5 text-primary-400 group-hover:text-red-400/70! dark:group-hover:text-primary-500 transition-color`}
            />
         )}
      </>
   );
}

export default LikeButton;
