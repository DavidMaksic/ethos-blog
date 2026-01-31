import { routing } from '@/src/i18n/routing';
import { auth } from '@/src/lib/auth';
import createMiddleware from 'next-intl/middleware';

const locales = ['en', 'sr'];
const publicPages = ['/', '/archive', '/about'];

const handleI18nRouting = createMiddleware(routing);

const authMiddleware = auth((req) => {
   return handleI18nRouting(req);
});

export default function middleware(req) {
   const publicPathnameRegex = RegExp(
      `^(/(${locales.join('|')}))?(${publicPages
         .flatMap((p) => (p === '/' ? ['', '/'] : p))
         .join('|')})/?$`,
      'i',
   );
   const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

   if (isPublicPage) return handleI18nRouting(req);
   else return authMiddleware(req);
}

export const config = {
   matcher: ['/((?!api|_next|.*\\..*).*)'],
};
