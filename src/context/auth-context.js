'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { authClient } from '@/src/lib/auth-client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
   const { data, isPending } = authClient.useSession();
   const { session } = data || {};

   const status = isPending
      ? 'loading'
      : session
        ? 'authenticated'
        : 'unauthenticated';

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
      setUser(data?.user || null);
      setLoadingUser(false);
   }, [data?.user, status]);

   useEffect(() => {
      setLoadingExtendedUser(true);

      if (!data?.user?.email) {
         setExtendedUser(null);
         return;
      }

      const loadUserData = async () => {
         const res = await fetch(`/api/user?email=${data.user.email}`);
         const extendedData = await res.json();
         setExtendedUser(extendedData);

         setLoadingExtendedUser(false);
      };

      loadUserData();
   }, [data?.user?.email]);

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
