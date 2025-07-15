import { useEffect, useState } from 'react';

function useBookmark(articleID, session, user) {
   const [isBookmarked, setIsBookmarked] = useState(false);

   useEffect(() => {
      if (session) {
         setIsBookmarked(
            !!JSON.parse(user.bookmarks).find((item) => item === articleID)
         );
      }
   }, [session, user, articleID]);

   return isBookmarked;
}

export default useBookmark;
