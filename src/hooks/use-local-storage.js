import { useEffect, useState } from 'react';

export function useLocalStorage(initialState, key) {
   const [value, setValue] = useState(initialState);
   const [isHydrated, setIsHydrated] = useState(false);

   useEffect(() => {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
         setValue(JSON.parse(storedValue));
      }
      setIsHydrated(true);
   }, [key]);

   useEffect(() => {
      if (isHydrated) {
         localStorage.setItem(key, JSON.stringify(value));
      }
   }, [value, key, isHydrated]);

   return [value, setValue];
}
