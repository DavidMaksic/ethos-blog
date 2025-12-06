'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
   const { data: session, status } = useSession();

   // next-auth user
   const [user, setUser] = useState(null);

   // your Supabase user
   const [extendedUser, setExtendedUser] = useState(null);
   const [loading, setLoading] = useState(true);

   function resetUser() {
      setUser(null);
      setExtendedUser(null);
   }

   useEffect(() => {
      if (status === 'loading') {
         setLoading(true);
         return;
      }

      if (status === 'unauthenticated') {
         resetUser();
         setLoading(false);
         return;
      }

      // authenticated
      setUser(session?.user || null);
      setLoading(false);
   }, [session, status]);

   useEffect(() => {
      if (!session?.user?.email) {
         setExtendedUser(null);
         return;
      }

      const loadUserData = async () => {
         const res = await fetch(`/api/user?email=${session.user.email}`);
         const data = await res.json();
         setExtendedUser(data);
      };

      loadUserData();
   }, [session?.user?.email]);

   return (
      <AuthContext.Provider
         value={{
            session,
            user,
            extendedUser,
            loading,
            resetUser,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);
