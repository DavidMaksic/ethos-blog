import { useEffect, useState } from 'react';

function useCommentLike(id, array) {
   const [comment, setComment] = useState({});
   const [isLiked, setIsLiked] = useState();

   useEffect(() => {
      const commentObject = array?.find((item) => item.id === id);
      setComment(commentObject);

      return () => setIsLiked(commentObject?.isLiked);
   }, [id, array, setIsLiked, comment]);

   return isLiked;
}

export default useCommentLike;
