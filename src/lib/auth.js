import { createAuthMiddleware, customSession } from 'better-auth/plugins';
import { createUser, getUser } from '@/src/lib/data-service';
import { WEBSITE_URL } from '@/src/utils/config';
import { betterAuth } from 'better-auth';

const localURL = 'http://localhost:3000';

export const auth = betterAuth({
   baseURL: WEBSITE_URL,
   socialProviders: {
      google: {
         clientId: process.env.AUTH_GOOGLE_ID,
         clientSecret: process.env.AUTH_GOOGLE_SECRET,
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
               throw new Error(
                  'LanguageContext was used outside of LanguageProvider',
               );
            }
         }
      }),
   },

   plugins: [
      customSession(async ({ user, session }) => {
         // Enriched session with userID from DB
         const dbUser = await getUser(user.email);
         return {
            user: {
               ...user,
               userID: dbUser?.id,
            },
            session,
         };
      }),
   ],
});
