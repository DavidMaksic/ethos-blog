import { nextCookies } from 'better-auth/next-js';
import { betterAuth } from 'better-auth';
import { Pool } from 'pg';

export const auth = betterAuth({
   baseURL: process.env.BETTER_AUTH_URL,
   database: new Pool({
      connectionString: process.env.DATABASE_URL,
   }),
   advanced: {
      database: {
         generateId: false,
      },
   },
   emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,
   },
   socialProviders: {
      google: {
         prompt: 'select_account',
         clientId: process.env.AUTH_GOOGLE_ID,
         clientSecret: process.env.AUTH_GOOGLE_SECRET,
      },
      github: {
         prompt: 'select_account',
         clientId: process.env.AUTH_GITHUB_ID,
         clientSecret: process.env.AUTH_GITHUB_SECRET,
      },
   },
   user: {
      modelName: 'users',
      fields: {
         createdAt: 'created_at',
         emailVerified: 'email_verified',
         updatedAt: 'updated_at',
      },
   },
   session: {
      modelName: 'sessions',
      fields: {
         createdAt: 'created_at',
         userId: 'user_id',
         expiresAt: 'expires_at',
         updatedAt: 'updated_at',
         ipAddress: 'ip_address',
         userAgent: 'user_agent',
      },
      expiresIn: 60 * 60 * 24 * 365, // 1-year session lifetime
      updateAge: 60 * 60 * 24,
      cookieCache: {
         enabled: true,
         maxAge: 60 * 15,
         strategy: 'jwe',
      },
   },
   account: {
      modelName: 'accounts',
      fields: {
         createdAt: 'created_at',
         userId: 'user_id',
         accountId: 'account_id',
         providerId: 'provider_id',
         updatedAt: 'updated_at',
         accessToken: 'access_token',
         refreshToken: 'refresh_token',
         idToken: 'id_token',
         accessTokenExpiresAt: 'access_token_expires_at',
         refreshTokenExpiresAt: 'refresh_token_expires_at',
      },
      storeStateStrategy: 'cookie',
      storeAccountCookie: true,
      accountLinking: {
         enabled: true,
      },
   },
   plugins: [nextCookies()],
});
