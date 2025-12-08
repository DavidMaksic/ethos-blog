'use client';

import { signOut } from 'next-auth/react';

export function useLogout() {
   return async () => {
      await signOut({ callbackUrl: '/' });
   };
}
