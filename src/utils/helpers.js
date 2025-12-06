import { differenceInDays, format, formatDistanceToNow } from 'date-fns';
import { enUS, sr } from 'date-fns/locale';
import sanitizeHtml from 'sanitize-html';

export function getSortedItems(param, items) {
   const sort = param.sort ?? 'created_at-asc';

   const [field, direction] = sort.split('-');

   const modifier = direction === 'asc' ? 1 : -1;
   const dateModifier = direction === 'asc' ? -1 : 1;

   function compare(a, b) {
      if (a['title'] < b['title']) {
         return -1 * modifier;
      }
      if (a['title'] > b['title']) {
         return 1 * modifier;
      }
      return 0;
   }

   let sortedItems;

   if (field === 'title') sortedItems = items?.sort(compare);

   if (field === 'created_at')
      sortedItems = items?.sort(
         (a, b) => (new Date(a[field]) - new Date(b[field])) * dateModifier
      );

   sortedItems = items?.sort((a, b) => (a[field] - b[field]) * modifier);

   return sortedItems;
}

export function getMainArticles(array) {
   const englishArticles = array
      .filter((item) => item.language === 'English')
      .reverse();
   const serbianArticles = array
      .filter((item) => item.language === 'Српски')
      .reverse();

   return { englishArticles, serbianArticles };
}

export function applyPagination(page, result) {
   const pageSize = Number(process.env.NEXT_PUBLIC_PAGE_SIZE || 10);
   const from = (page - 1) * pageSize;
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

   // Replace the locale part of the pathname (e.g. /en/blog → /sr/blog)
   url.pathname = `/${lang}${url.pathname.replace(/^\/(en|sr)/, '')}`;

   // Navigate to the new URL
   window.location.href = url.toString();
}
