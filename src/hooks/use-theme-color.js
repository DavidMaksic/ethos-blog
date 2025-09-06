'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export function useThemeColor() {
   const { theme, resolvedTheme } = useTheme();

   useEffect(() => {
      const metaTag = document.querySelector('meta[name="theme-color"]');
      if (!metaTag) return;

      const color = resolvedTheme === 'dark' ? '#131c24' : '#fafafa';
      metaTag.setAttribute('content', color);
   }, [resolvedTheme]);
}
