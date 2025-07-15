'use client';

import { motion } from 'motion/react';
import RichTextRenderer from '@/src/ui/rich-text-renderer';

function ArticleContent({ content, srbFont, engFont, article }) {
   return (
      <motion.div
         className={`container text-text my-3 [&_:is(h1,h2,h3)]:font-headers ${
            article.language === 'English'
               ? `text-2xl xl:text-[1.325rem] md:text-[1.6rem] [&_p]:leading-[1.49]! lg:[&_blockquote]:text-[1.5rem] lg:[&_blockquote]:leading-8.5 md:[&_blockquote]:text-[1.75rem] md:[&_blockquote]:leading-10 sm:[&_blockquote]:leading-9.5 ${engFont}`
               : `text-[1.4rem] xl:text-[1.235rem] lg:text-[1.178rem] md:text-[1.4rem] [&_p]:leading-[1.65]! [&_blockquote]:text-2xl! xl:[&_blockquote]:text-[1.32rem]! lg:[&_blockquote]:text-[1.26rem]! md:[&_blockquote]:text-[1.6rem]! [&_em]:leading-[1.5]! ${srbFont}`
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
