import { createAuthMiddleware, customSession } from 'better-auth/plugins';
import { createUser, getUser } from '@/src/lib/data-service';
import { betterAuth } from 'better-auth';

export const auth = betterAuth({
   baseURL: process.env.BETTER_AUTH_URL,
   socialProviders: {
      google: {
         clientId: process.env.AUTH_GOOGLE_ID,
         clientSecret: process.env.AUTH_GOOGLE_SECRET,
      },
   },
   session: {
      expiresIn: 60 * 60 * 24 * 180, // 6 months
      // cookieCache: {
      //    enabled: false,
      // },
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
            const dbUser = await getUser(user.email);
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
   ],
});
