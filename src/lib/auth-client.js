'use client';

import { createAuthClient } from 'better-auth/react';
import { WEBSITE_URL } from '@/src/utils/config';

const localURL = 'http://localhost:3000';

export const authClient = createAuthClient({
   baseURL: WEBSITE_URL,
});
