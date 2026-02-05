'use client';

import { createAuthClient } from 'better-auth/react';
import { WEBSITE_URL } from '@/src/utils/config';

export const authClient = createAuthClient({
   baseURL: WEBSITE_URL,
});
