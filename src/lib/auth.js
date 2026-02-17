import { createAuthMiddleware, customSession } from 'better-auth/plugins';
import { createUser, getUser, getUserID } from '@/src/lib/data-service';
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
      expiresIn: 60 * 60 * 24 * 180, // 6-months-long session
      cookieCache: {
         enabled: true,
         maxAge: 60 * 60 * 24 * 180, // 6-months-long cookie
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
   hooks: {
      after: createAuthMiddleware(async (ctx) => {
         const newSession = ctx.context.newSession;

         if (newSession) {
            try {
               const existingUser = await getUser(newSession.user.email);

               if (!existingUser) {
                  // Create new user in DB
                  await createUser({
                     email: newSession.user.email,
                     name: newSession.user.name,
                     image: newSession.user.image,
                  });
               }
            } catch (err) {
               console.error('Better Auth after sign-in error', err);
            }
         }
      }),
   },
   plugins: [
      customSession(async ({ user, session }) => {
         if (user.userID) {
            return { user, session };
         }

         try {
            const dbUser = await getUserID(user.email);
            return {
               user: {
                  ...user,
                  userID: dbUser?.id ?? null,
               },
               session,
            };
         } catch {
            return { user, session };
         }
      }),
      nextCookies(),
   ],
});
