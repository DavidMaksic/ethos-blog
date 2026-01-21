import { differenceInDays, format, formatDistanceToNow } from 'date-fns';
import { enUS, sr } from 'date-fns/locale';
import sanitizeHtml from 'sanitize-html';

export function getSortedItems(param, items) {
   if (!items?.length) return items;

   const sort = param ?? 'created_at-asc';
   const [field, direction] = sort.split('-');

   const modifier = direction === 'asc' ? 1 : -1;
   const dateModifier = direction === 'asc' ? -1 : 1;

   return [...items].sort((a, b) => {
      // 1. Title
      if (field === 'title') {
         return a.title.localeCompare(b.title) * modifier;
      }

      // 2. Dates (created_at, bookmarked_at)
      if (typeof a[field] === 'string') {
         return (new Date(a[field]) - new Date(b[field])) * dateModifier;
      }

      // 3. Numbers
      return (a[field] - b[field]) * modifier;
   });
}

export function getMainArticles(array) {
   const englishArticles = array.filter((item) => item.code === 'en').reverse();
   const serbianArticles = array.filter((item) => item.code === 'sr').reverse();

   return { englishArticles, serbianArticles };
}

export function applyPagination(page, result) {
   const pageSize = Number(process.env.NEXT_PUBLIC_PAGE_SIZE || 10);
   const maxPage = Math.ceil(result.length / pageSize) || 1;
   const safePage = page > maxPage ? 1 : page;

   const from = (safePage - 1) * pageSize;
   const to = from + pageSize;
   return result.slice(from, to);
}

const localeMap = {
   en: enUS,
   sr: sr,
};

export function CommentDate(createdAt, locale) {
   const createdDate = new Date(createdAt);
   const dateFnsLocale = localeMap[locale] || enUS;

   const daysAgo = differenceInDays(new Date(), createdDate);

   const date =
      daysAgo < 27
         ? `${formatDistanceToNow(createdDate, {
              addSuffix: true,
              locale: dateFnsLocale,
           })}`
         : format(createdDate, 'MMM dd, yyyy');

   const dateDisplay = date.charAt(0).toUpperCase() + date.slice(1);

   return <span>{dateDisplay}</span>;
}

export function sanitizeHTML(html) {
   return sanitizeHtml(html, {
      allowedTags: false,
      allowVulnerableTags: true,
      allowedAttributes: false,
      transformTags: {
         '*': (tagName, attribs) => {
            const { contenteditable, ...cleanAttribs } = attribs;
            return {
               tagName,
               attribs: cleanAttribs,
            };
         },
      },
      disallowedTagsMode: 'discard',
      nonTextTags: ['script', 'style', 'iframe', 'object'],
   });
}

export function switchLocale(lang) {
   const url = new URL(window.location.href);
   url.searchParams.delete('category');
   url.searchParams.delete('lang');
   url.searchParams.delete('sort');

   // Replace the locale part of the pathname (e.g. /en/blog → /sr/blog)
   url.pathname = `/${lang}${url.pathname.replace(/^\/(en|sr)/, '')}`;

   // Navigate to the new URL
   window.location.href = url.toString();
}
