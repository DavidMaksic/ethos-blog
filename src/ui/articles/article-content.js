'use client';

import { Crimson_Text, Gentium_Book_Plus } from 'next/font/google';
import { motion } from 'motion/react';
import RichTextRenderer from '@/src/ui/rich-text-renderer';

const gentium = Gentium_Book_Plus({
   subsets: ['cyrillic'],
   display: 'swap',
   style: ['normal', 'italic'],
   weight: ['400', '700'],
});

const crimsonText = Crimson_Text({
   subsets: ['latin'],
   display: 'swap',
   style: ['normal', 'italic'],
   weight: ['400', '600', '700'],
});

function ArticleContent({ content, article }) {
   return (
      <motion.div
         className={`container text-text my-3 [&_:is(h1,h2,h3)]:font-headers ${
            article.language === 'English'
               ? `text-2xl xl:text-[1.325rem] md:text-[1.6rem] [&_p]:leading-[1.49]! xs:[&_p]:leading-[1.4]! lg:[&_blockquote>*]:text-[1.4rem] md:[&_blockquote>*]:text-[1.75rem] xs:[&_blockquote>*]:text-[1.7rem] xl:[&_blockquote>*]:leading-7.5 lg:[&_blockquote>*]:leading-7.5 md:[&_blockquote>*]:leading-9.5 sm:[&_blockquote>*]:leading-9.5 xs:[&_blockquote>*]:leading-[1.29] xs:[&_blockquote]:leading-[1.29] ${crimsonText.className}`
               : `text-[1.4rem] xl:text-[1.235rem] lg:text-[1.178rem] md:text-[1.4rem] xs:text-[1.55rem] [&_p]:leading-[1.6]! xl:[&_p]:leading-[1.7] lg:[&_p]:leading-[1.65]! xs:[&_p]:leading-[1.47]! [&_blockquote>*]:text-2xl! xl:[&_blockquote>*]:text-[1.32rem]! lg:[&_blockquote>*]:text-[1.26rem]! md:[&_blockquote>*]:text-[1.6rem]! [&_blockquote>*]:leading-[1.5]! ${gentium.className}`
         }`}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.3 }}
      >
         <RichTextRenderer html={content} />
      </motion.div>
   );
}

export default ArticleContent;
