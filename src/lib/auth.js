import { createUser, getUser } from '@/src/lib/data-service';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const authConfig = {
   providers: [
      Google({
         clientId: process.env.AUTH_GOOGLE_ID,
         clientSecret: process.env.AUTH_GOOGLE_SECRET,
      }),
   ],
   callbacks: {
      authorized: ({ auth, request: { nextUrl } }) => {
         const isLoggedIn = !!auth?.user;
         const protectedRoutes = [
            '/user/home',
            '/user/comments',
            '/user/bookmarks',
            '/user/settings',
         ];
         const isOnProtectRoute = protectedRoutes.some((route) =>
            nextUrl.pathname.includes(route),
         );

         if (isOnProtectRoute) {
            if (isLoggedIn) return true;
            return Response.redirect(new URL('/login', nextUrl));
         }

         return true;
      },
      async signIn({ user }) {
         try {
            const existingUser = await getUser(user.email);

            if (!existingUser)
               await createUser({
                  email: user.email,
                  name: user.name,
                  image: user.image,
               });

            return true;
         } catch {
            return false;
         }
      },
      async session({ session }) {
         const user = await getUser(session.user.email);
         session.user.userID = user.id;

         return session;
      },
   },
   pages: {
      signIn: '/login',
   },
};

export const {
   auth,
   signIn,
   signOut,
   handlers: { GET, POST },
} = NextAuth(authConfig);
