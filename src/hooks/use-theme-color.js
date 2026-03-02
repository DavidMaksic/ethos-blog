'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export function useThemeColor() {
   const { resolvedTheme } = useTheme();

   useEffect(() => {
      if (!resolvedTheme) return;

      // - Sync cookie for SSR
      document.cookie = `theme=${resolvedTheme}; path=/; max-age=31536000`;

      // - Update browser theme color
      const color = resolvedTheme === 'dark' ? '#27251F' : '#fafafa';
      const meta = document.querySelector('meta[name="theme-color"]');

      if (meta) {
         meta.setAttribute('content', color);
      } else {
         const newMeta = document.createElement('meta');
         newMeta.setAttribute('name', 'theme-color');
         newMeta.setAttribute('content', color);
         document.head.appendChild(newMeta);
      }
   }, [resolvedTheme]);
}
