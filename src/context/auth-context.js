'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
   const { data: session, status } = useSession();

   // Next-auth user
   const [user, setUser] = useState(null);

   // Supabase user
   const [extendedUser, setExtendedUser] = useState(null);
   const [loadingUser, setLoadingUser] = useState(true);
   const [loadingExtendedUser, setLoadingExtendedUser] = useState(true);

   useEffect(() => {
      if (status === 'loading') {
         setLoadingUser(true);
         return;
      }

      if (status === 'unauthenticated') {
         setLoadingUser(false);
         return;
      }

      // Authenticated
      setUser(session?.user || null);
      setLoadingUser(false);
   }, [session, status]);

   useEffect(() => {
      setLoadingExtendedUser(true);

      if (!session?.user?.email) {
         setExtendedUser(null);
         return;
      }

      const loadUserData = async () => {
         const res = await fetch(`/api/user?email=${session.user.email}`);
         const data = await res.json();
         setExtendedUser(data);

         setLoadingExtendedUser(false);
      };

      loadUserData();
   }, [session?.user?.email]);

   const loading = (loadingUser || loadingExtendedUser) && session;

   return (
      <AuthContext.Provider
         value={{
            session,
            user,
            extendedUser,
            loading,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);
