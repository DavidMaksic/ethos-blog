import { useEffect, useState } from 'react';
import { useLikeContext } from '@/src/context/like-context';

function useLike(articleID, likedArticles) {
   const [article, setArticle] = useState({});
   const { isLiked, setIsLiked } = useLikeContext();

   useEffect(() => {
      const articleObject = likedArticles.find(
         (item) => item.articleID === articleID
      );
      setArticle(articleObject);

      return () => setIsLiked(articleObject?.isLiked);
   }, [articleID, likedArticles, setIsLiked, article]);

   return isLiked;
}

export default useLike;
