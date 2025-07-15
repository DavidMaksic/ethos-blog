'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence } from 'motion/react';
import { EB_Garamond } from 'next/font/google';
import { motion } from 'motion/react';

import useFilterCategory from '@/src/hooks/use-filter-category';
import FeaturedItem from '@/src/ui/articles/featured-item';

const ebGaramond = EB_Garamond({
   subsets: ['latin'],
   display: 'swap',
   style: ['normal', 'italic'],
   weight: ['400', '500', '600', '700', '800'],
   variable: '--font-ebGaramond',
});

function FeaturedArticles({ articles, categories, authors }) {
   const [index, setIndex] = useState(0);

   const [currentCategory, setCurrentCategory] = useState(categories?.at(0));

   // - Filter by language
   const { filteredArray: filteredCategories } = useFilterCategory(categories);

   // - Check if current tag has enough articles
   const tags = filteredCategories?.filter(
      (item) => JSON.parse(item.articles).length === 3
   );

   // - Shuffle articles
   useEffect(() => {
      let id;
      if (currentCategory && tags) {
         const tick = () => setIndex((i) => i + 1);
         id = setInterval(tick, 6000);
         setCurrentCategory(tags[index % tags.length]);
      }

      return () => clearInterval(id);
   }, [index, currentCategory, tags]);

   // - Filter for featured articles
   const filteredArticles = articles.filter((item) => item.featured);
   const featuredArticles = filteredArticles.filter(
      (item) => Number(item.categoryID) === Number(currentCategory.id)
   );

   const t = useTranslations('HomePage');

   return (
      <motion.div
         className={`flex flex-col gap-10 my-14 ${ebGaramond.variable}`}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.3 }}
      >
         <h1 className="flex items-center gap-2 self-center text-4xl lg:text-3xl md:text-4xl">
            <span>{t('featuring')}</span>
            <span className="text-accent/75 dark:text-accent-300/90 italic font-medium font-headers">
               {currentCategory.category ? currentCategory.category : 'History'}
            </span>
         </h1>

         <div className="grid grid-cols-3 md:flex md:flex-col gap-6 lg:gap-4 md:gap-6">
            <AnimatePresence mode="wait">
               {featuredArticles.length ? (
                  featuredArticles.map((item) => (
                     <FeaturedItem
                        article={item}
                        authors={authors}
                        key={item.id}
                     />
                  ))
               ) : (
                  <>
                     <div className="h-[30rem] lg:h-[25rem] md:h-[20rem] bg-primary-300/35 dark:bg-primary-300/18 rounded-2xl animate-skeleton" />
                     <div className="h-[30rem] lg:h-[25rem] md:h-[20rem] bg-primary-300/35 dark:bg-primary-300/18 rounded-2xl animate-skeleton" />
                     <div className="h-[30rem] lg:h-[25rem] md:h-[20rem] bg-primary-300/35 dark:bg-primary-300/18 rounded-2xl animate-skeleton" />
                  </>
               )}
            </AnimatePresence>
         </div>
      </motion.div>
   );
}

export default FeaturedArticles;
