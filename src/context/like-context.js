'use client';

import { createContext, useContext, useState } from 'react';

const LikeContext = createContext();

function LikeProvider({ children }) {
   const [isLiked, setIsLiked] = useState(false);
   const [likesCount, setLikesCount] = useState();

   return (
      <LikeContext.Provider
         value={{ isLiked, setIsLiked, likesCount, setLikesCount }}
      >
         {children}
      </LikeContext.Provider>
   );
}

function useLikeContext() {
   const context = useContext(LikeContext);

   if (context === undefined)
      throw new Error('LikeContext was used outside of LikeProvider');

   return context;
}

export { LikeProvider, useLikeContext };
