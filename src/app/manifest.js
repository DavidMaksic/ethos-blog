export default function manifest() {
   return {
      name: 'Ethos Blog',
      short_name: 'Ethos',
      description:
         'Ethos blog features many authors from across the world, who write on various topics connected to the concept of ethos - culture, customs, values, ethics...',
      start_url: '/',
      display: 'standalone',
      background_color: '#f1f5f9',
      theme_color: '#27251F',
      icons: [
         {
            src: '/icon-mobile.png',
            sizes: '192x192',
            type: 'image/png',
         },
         {
            src: '/icon-mobile-lg.png',
            sizes: '512x512',
            type: 'image/png',
         },
      ],
   };
}
