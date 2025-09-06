'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export function useThemeColor() {
   const { resolvedTheme } = useTheme();

   useEffect(() => {
      if (typeof window === 'undefined') return;

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
