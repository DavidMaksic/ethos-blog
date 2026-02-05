import { routing } from '@/src/i18n/routing';
import createMiddleware from 'next-intl/middleware';

const handleI18nRouting = createMiddleware(routing);

export default function proxy(req) {
   return handleI18nRouting(req);
}

export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] };
