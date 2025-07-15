'use client';

import { createContext, useContext, useState } from 'react';

const categoryContext = createContext();

function CategoryProvider({ children }) {
   const [currentCategory, setCurrentCategory] = useState('');

   return (
      <categoryContext.Provider value={{ currentCategory, setCurrentCategory }}>
         {children}
      </categoryContext.Provider>
   );
}

function useCategory() {
   const context = useContext(categoryContext);

   if (context === undefined)
      throw new Error('categoryContext was used outside of categoryProvider');

   return context;
}

export { CategoryProvider, useCategory };
