'use client';

import { motion } from 'motion/react';
import RichTextRenderer from '@/src/ui/rich-text-renderer';

function ArticleContent({ content, article }) {
   return (
      <motion.div
         className={`container text-text my-3 [&_:is(h1,h2,h3)]:font-headers ${
            article.language === 'English'
               ? `text-2xl 2xl:text-[1.326rem] md:text-[1.6rem] [&_p]:leading-[1.49]! xs:[&_p]:leading-[1.35]! 4k:[&_blockquote>*]:text-[1.695rem]! 2k:[&_blockquote>*]:text-[1.65rem] [&_blockquote>*]:text-[1.65rem] 2xl:[&_blockquote>*]:text-[1.41rem] lg:[&_blockquote>*]:text-[1.438rem] md:[&_blockquote>*]:text-[1.75rem] xs:[&_blockquote>*]:text-[1.7rem] [&_blockquote>*]:leading-[1.23] 2xl:[&_blockquote>*]:leading-7.5 lg:[&_blockquote>*]:leading-7.5 md:[&_blockquote>*]:leading-9.5 sm:[&_blockquote>*]:leading-9.5 xs:[&_blockquote>*]:leading-[1.29] xs:[&_blockquote]:leading-[1.29] font-article`
               : `text-[1.4rem] 2xl:text-[1.235rem] lg:text-[1.178rem] md:text-[1.4rem] xs:text-[1.55rem] [&_p]:leading-[1.6]! 2xl:[&_p]:leading-[1.7] lg:[&_p]:leading-[1.65]! xs:[&_p]:leading-[1.44]! [&_blockquote>*]:text-2xl! 2xl:[&_blockquote>*]:text-[1.32rem]! lg:[&_blockquote>*]:text-[1.26rem]! md:[&_blockquote>*]:text-[1.6rem]! [&_blockquote>*]:leading-[1.5] xs:[&_blockquote>*]:leading-[1.4] font-article-sr`
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
