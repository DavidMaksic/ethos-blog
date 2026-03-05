import { applyPagination, getSortedItems } from '@/src/utils/helpers';
import { FUSE_ARTICLES } from '@/src/utils/config';
import Fuse from 'fuse.js';

export function FilterArticles(
   articles,
   { isArchive, search, lang, category, sort, page, language, categories },
) {
   if (!isArchive) {
      return {
         filteredArticles: articles,
         paginatedArticles: articles?.slice(0, 3),
      };
   }

   let result = [...articles];

   // 1. Search (Fuse.js)
   if (search) {
      const fuse = new Fuse(articles, FUSE_ARTICLES);
      result = fuse.search(search).map(({ item }) => item);
   }

   // 2. Filter language + category
   const currentCategory = categories.find(
      (item) =>
         item.category ===
         category?.charAt(0).toUpperCase() + category?.slice(1),
   );

   result = result.filter((item) => {
      const matchesCategory =
         !currentCategory || item.category_id === currentCategory.id;
      const matchesLanguage = lang
         ? item.code === lang
         : item.code === language.code;
      return matchesCategory && matchesLanguage;
   });

   // 3. Sort
   if (sort) result = getSortedItems(sort, result);

   // 4. Pagination
   return {
      filteredArticles: result,
      paginatedArticles: applyPagination(page, result),
   };
}
