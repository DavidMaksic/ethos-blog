import React, { Suspense } from 'react';
import MainArticlesAsync from '@/src/ui/articles/main-articles-async';
import FeaturedArticlesAsync from '@/src/ui/articles/featured-articles-async';
import LatestArticlesAsync from '@/src/ui/articles/latest-articles-async';
import LoadingSection from '@/src/ui/loading-section';

export default function Home() {
   return (
      <>
         <h1 className="sr-only">Main page</h1>

         <Suspense fallback={<LoadingSection />}>
            <MainArticlesAsync />
         </Suspense>

         <div className="h-[1px] mt-2 sm:mt-12 bg-gradient-to-r from-primary-300 to-primary dark:to-transparent" />

         <Suspense fallback={<LoadingSection />}>
            <FeaturedArticlesAsync />
         </Suspense>

         <div className="h-[1px] mt-2 sm:mt-12 bg-gradient-to-l from-primary-300 to-primary dark:to-transparent" />

         <Suspense fallback={<LoadingSection />}>
            <LatestArticlesAsync />
         </Suspense>
      </>
   );
}
