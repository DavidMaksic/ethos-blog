import srbFlag from '@/public/srb-flag.png';
import enFlag from '@/public/en-flag.png';

export const WEBSITE_URL = 'https://ethos-blog.vercel.app';
export const FUSE_OPTIONS = {
   keys: ['title'],
   includeScore: true,
   threshold: 0.4,
};

export const DEFAULT_LOCALE = 'en';
export const LOCALES = ['en', 'sr'];
export const LANGUAGES = [
   {
      code: 'sr',
      lang: 'Српски',
      flag: srbFlag,
   },
   {
      code: 'en',
      lang: 'English',
      flag: enFlag,
   },
];
