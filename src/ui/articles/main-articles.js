'use client';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getMainArticles } from '@/src/utils/helpers';
import { useLocale } from 'next-intl';
import MainArticle from '@/src/ui/articles/main-article';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function MainArticles({ articles }) {
   const { englishArticles, serbianArticles } = getMainArticles(articles);
   const locale = useLocale();

   return (
      <Swiper
         loop={true}
         speed={500}
         spaceBetween={200}
         autoplay={{
            delay: 5000,
            disableOnInteraction: false,
         }}
         pagination={{
            clickable: true,
            dynamicBullets: true,
         }}
         modules={[Autoplay, Pagination]}
         className="mySwiper size-full pl-1.5! md:pl-0!"
      >
         {locale === 'en'
            ? englishArticles?.map((item) => (
                 <SwiperSlide key={item.id}>
                    <MainArticle article={item} />
                 </SwiperSlide>
              ))
            : serbianArticles?.map((item) => (
                 <SwiperSlide key={item.id}>
                    <MainArticle article={item} />
                 </SwiperSlide>
              ))}
      </Swiper>
   );
}

export default MainArticles;
