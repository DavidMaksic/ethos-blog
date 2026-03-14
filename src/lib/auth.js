import {
   getResetPasswordSubject,
   ResetPasswordEmail,
} from '@/src/ui/reset-password-template';
import { nextCookies } from 'better-auth/next-js';
import { betterAuth } from 'better-auth';
import { Resend } from 'resend';
import { Pool } from 'pg';

const resend = new Resend(process.env.RESEND_API_KEY);

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
      sendResetPassword: async ({ user, url }) => {
         if (process.env.NODE_ENV === 'development') {
            console.log('Reset URL:', url);
            return;
         }

         await resend.emails.send({
            from: 'Ethos <support@updates.ethos-blog.com>',
            to: user.email,
            subject: getResetPasswordSubject(url),
            react: ResetPasswordEmail({ url, user }),
         });
      },
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
   verification: {
      modelName: 'verification',
      fields: {
         createdAt: 'created_at',
         expiresAt: 'expires_at',
         updatedAt: 'updated_at',
      },
   },
   plugins: [nextCookies()],
});
