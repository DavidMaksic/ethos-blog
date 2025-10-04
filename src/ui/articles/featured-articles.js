'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence } from 'motion/react';

import useFilterCategory from '@/src/hooks/use-filter-category';
import FeaturedItem from '@/src/ui/articles/featured-item';

function FeaturedArticles({ articles, categories, authors }) {
   const [index, setIndex] = useState(0);
   const [stopShuffle, setStopShuffle] = useState(false);
   const [currentCategory, setCurrentCategory] = useState(categories?.at(0));

   // - Filter by language
   const { filteredArray: filteredCategories } = useFilterCategory(categories);

   // - Check if the current tag has enough articles
   const tags = filteredCategories?.filter(
      (item) => item.articles.length === 3
   );

   // - Shuffle articles
   useEffect(() => {
      let id;
      if (currentCategory && tags && !stopShuffle) {
         const tick = () => setIndex((i) => i + 1);
         id = setInterval(tick, 6000);
         setCurrentCategory(tags[index % tags.length]);

         if (tags.length === 1) setStopShuffle(true);
      }

      return () => clearInterval(id);
   }, [index, currentCategory, tags, categories, stopShuffle]);

   // - Filter for featured articles
   const filteredArticles = articles.filter((item) => item.featured);
   const featuredArticles = filteredArticles.filter(
      (item) => Number(item.category_id) === currentCategory.id
   );

   const t = useTranslations('HomePage');
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      setLoading(false);
   }, []);

   return (
      <div className="flex flex-col gap-10 my-14">
         <h2 className="flex items-center gap-2 self-center text-4xl lg:text-3xl md:text-4xl">
            <span>{t('featuring')}</span>
            <span className="text-accent/75 dark:text-accent-300/90 italic font-medium font-secondary">
               {currentCategory.category}
            </span>
         </h2>

         <div className="grid grid-cols-3 md:flex md:flex-col gap-6 lg:gap-4 md:gap-6">
            <AnimatePresence mode="wait">
               {!loading ? (
                  featuredArticles.map((item) => (
                     <FeaturedItem
                        article={item}
                        authors={authors}
                        key={item.id}
                     />
                  ))
               ) : (
                  <>
                     <div className="h-[30rem] lg:h-[25rem] md:h-[20rem] bg-primary-300/45 dark:bg-primary-300/18 rounded-2xl animate-skeleton" />
                     <div className="h-[30rem] lg:h-[25rem] md:h-[20rem] bg-primary-300/45 dark:bg-primary-300/18 rounded-2xl animate-skeleton" />
                     <div className="h-[30rem] lg:h-[25rem] md:h-[20rem] bg-primary-300/45 dark:bg-primary-300/18 rounded-2xl animate-skeleton" />
                  </>
               )}
            </AnimatePresence>
         </div>
      </div>
   );
}

export default FeaturedArticles;
