'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export function useThemeColor() {
   const { resolvedTheme } = useTheme();

   useEffect(() => {
      if (typeof window === 'undefined') return;

      const metaTag = document.querySelector('meta[name="theme-color"]');
      if (!metaTag) return;

      const color = resolvedTheme === 'dark' ? '#131c24' : '#fafafa';
      metaTag.setAttribute('content', color);
   }, [resolvedTheme]);
}
