import { NextResponse } from 'next/server';
import { routing } from '@/src/i18n/routing';
import { auth } from '@/src/lib/auth';
import createMiddleware from 'next-intl/middleware';

const locales = ['en', 'sr-cyrl'];
const defaultLocale = 'en';
const publicPages = ['/', '/archive', '/about'];

const handleI18nRouting = createMiddleware(routing);

const authMiddleware = auth((req) => {
   return handleI18nRouting(req);
});

export default function middleware(req) {
   const { pathname } = req.nextUrl;

   // 1. Check if URL already contains a locale prefix
   const hasLocalePrefix = locales.some(
      (locale) =>
         pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
   );

   // 2. If not, redirect based on the NEXT_LOCALE cookie (if present)
   if (!hasLocalePrefix) {
      const localeFromCookie = req.cookies.get('NEXT_LOCALE')?.value;
      const locale = locales.includes(localeFromCookie)
         ? localeFromCookie
         : defaultLocale;

      const newPathname = `/${locale}${pathname}`;

      if (pathname !== newPathname) {
         const url = req.nextUrl.clone();
         url.pathname = newPathname;
         return NextResponse.redirect(url);
      }
   }

   // 3. Check if the route is public
   const publicPathRegex = new RegExp(
      `^(/(${locales.join('|')}))?(${publicPages
         .flatMap((p) => (p === '/' ? ['', '/'] : p))
         .join('|')})/?$`,
      'i'
   );

   const isPublicPage = publicPathRegex.test(pathname);

   if (isPublicPage) {
      return handleI18nRouting(req);
   } else {
      return authMiddleware(req);
   }
}

// 4. Apply middleware to all non-static routes
export const config = {
   matcher: ['/((?!api|_next|.*\\..*).*)'],
};
