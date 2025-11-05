'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

export function usePageScroll() {
   const param = 'page';
   const searchParams = useSearchParams();
   const prevPageRef = useRef(searchParams.get(param));

   useEffect(() => {
      const currentPage = searchParams.get(param);

      // Only scroll if this query param changed
      if (currentPage !== prevPageRef.current) {
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      prevPageRef.current = currentPage;
   }, [searchParams, param]);
}
