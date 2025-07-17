export function getDefaults(searchParams, options) {
   const defaultValue = searchParams.get('sort-by') || options.at(0).value;

   let defaultLabel;
   options.forEach((item) => {
      if (defaultValue === item.value) defaultLabel = item.label;
   });

   return { defaultLabel, defaultValue };
}

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
   console.log('array: ', array);
   const englishArticles = array.filter((item) => item.language === 'English');

   const serbianArticles = array.filter((item) => item.language === 'Српски');

   return { englishArticles, serbianArticles };
}

export function applyPagination(parsedParam, result) {
   const page = Number(parsedParam.page || 1);
   const pageSize = Number(process.env.NEXT_PUBLIC_PAGE_SIZE || 10);
   const from = (page - 1) * pageSize;
   const to = from + pageSize;
   const paginatedResult = result.slice(from, to);

   return paginatedResult;
}

export function applyFilter(result, parsedParam, currentCategoryID) {
   const filteredResult = result.filter((item) => {
      const matchesCategory =
         !currentCategory || item.categoryID === currentCategoryID;
      const matchesLanguage = !parsedParam.lang
         ? item.language === language
         : item.language ===
           parsedParam.lang.charAt(0).toUpperCase() + parsedParam.lang.slice(1);
      return matchesCategory && matchesLanguage;
   });

   return filteredResult;
}
