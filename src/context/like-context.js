'use client';

import { createContext, useContext, useMemo, useState } from 'react';

const LikeContext = createContext();

function LikeProvider({ children }) {
   const [isLiked, setIsLiked] = useState(false);
   const [likesCount, setLikesCount] = useState();

   const value = useMemo(
      () => ({ isLiked, setIsLiked, likesCount, setLikesCount }),
      [isLiked, setIsLiked, likesCount, setLikesCount]
   );

   return <LikeContext.Provider value={value}>{children}</LikeContext.Provider>;
}

function useLikeContext() {
   const context = useContext(LikeContext);

   if (context === undefined)
      throw new Error('LikeContext was used outside of LikeProvider');

   return context;
}

export { LikeProvider, useLikeContext };
