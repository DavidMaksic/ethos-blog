'use client';

import { authClient } from '@/src/lib/auth-client';

export function LogOut() {
   return async () => {
      await authClient.signOut();
      window.location.href = '/';
   };
}
