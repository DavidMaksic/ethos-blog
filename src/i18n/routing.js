import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
   locales: ['en', 'sr-cyrl'],
   defaultLocale: 'en',
   // localePrefix: 'as-needed',
});
