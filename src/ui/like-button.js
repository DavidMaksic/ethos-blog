import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useLocalStorage } from '@/src/hooks/use-local-storage';
import { updateLikes } from '@/src/lib/actions';

function LikeButton({
   styles,
   articleID,
   count,
   likedArticles,
   setLikedArticles,
   isLiked,
}) {
   const likedArticle = likedArticles.find(
      (item) => item.articleID === articleID
   );

   // function handleLike() {
   //    setLikedArticles((items) => [...items, { articleID, isLiked: true }]);
   //    const newCount = count + 1;
   //    updateLikes(articleID, newCount);
   // }

   // function handleDislike() {
   //    setLikedArticles((items) =>
   //       items.filter((item) => item.articleID !== articleID)
   //    );
   //    if (count === 0) return;
   //    const newCount = count - 1;
   //    updateLikes(articleID, newCount);
   // }

   return (
      <>
         {!likedArticle?.length ? (
            isLiked ? (
               <FaHeart
                  className={`${styles} size-10 p-2 text-red-400/70! dark:group-hover:text-primary-500 transition-color`}
               />
            ) : (
               <FaRegHeart
                  className={`${styles} size-10 p-2 text-primary-400 group-hover:text-red-400/70! dark:group-hover:text-primary-500 transition-color`}
               />
            )
         ) : (
            <FaRegHeart
               className={`${styles} size-10 p-2 text-primary-400 group-hover:text-red-400/70! dark:group-hover:text-primary-500 transition-color`}
            />
         )}
      </>
   );
}

export default LikeButton;
