export default function manifest() {
   return {
      name: 'Ethos',
      short_name: 'Ethos',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#ddc2a2',
      icons: [
         {
            src: '/icon.png',
            sizes: '192x192',
            type: 'image/png',
         },
      ],
   };
}
