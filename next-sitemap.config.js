const { WEBSITE_URL } = require('./src/utils/config');

module.exports = {
   siteUrl: WEBSITE_URL,
   sitemapSize: 7000,
   exclude: ['/404', '/500'],
   changefreq: 'weekly',
   priority: 0.7,
   transform: async (config, path) => {
      return {
         loc: path,
         changefreq: path === '/' ? 'daily' : 'weekly',
         priority: path === '/' ? 1.0 : 0.7,
         lastmod: new Date().toISOString(),
      };
   },
};
