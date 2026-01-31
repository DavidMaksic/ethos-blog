import srbFlag from '@/public/srb-flag.png';
import enFlag from '@/public/en-flag.png';

export const WEBSITE_URL = 'https://ethos-blog.vercel.app';
export const FUSE_ARTICLES = {
   keys: ['title'],
   includeScore: true,
   threshold: 0.4,
};
export const FUSE_BOOKMARKS = {
   keys: ['articles.title'],
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

export const TYPE_STYLES = {
   like: {
      hover: 'hover:border-red-400/50! dark:hover:border-red-400/20! hover:bg-red-400/5!',
      activeBorder: 'border-red-400/20! dark:border-red-400/10! bg-red-400/5!',
      text: 'text-red-600/55 dark:text-red-300/80',
      hoverText: 'group-hover:text-red-600/55 dark:group-hover:text-red-300/80',
   },
   comment: {
      hover: 'hover:border-amber-400/80! dark:hover:border-amber-400/20! hover:bg-amber-400/5!',
      activeBorder:
         'border-amber-400/40! dark:border-amber-400/10! bg-amber-400/5!',
      text: 'text-amber-600/80 dark:text-amber-300/70',
      hoverText:
         'group-hover:text-amber-600/80 dark:group-hover:text-amber-300/70',
   },
   bookmark: {
      hover: 'hover:border-cyan-400/70! dark:hover:border-cyan-400/20! hover:bg-cyan-400/5!',
      activeBorder:
         'border-cyan-400/30! dark:border-cyan-400/10! bg-cyan-400/5!',
      text: 'text-cyan-600/80 dark:text-cyan-300/70',
      hoverText:
         'group-hover:text-cyan-600/80 dark:group-hover:text-cyan-300/70',
   },
   link: {
      hover: 'hover:bg-secondary! dark:hover:bg-primary-400/10!',
   },
};
