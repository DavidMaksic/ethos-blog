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
