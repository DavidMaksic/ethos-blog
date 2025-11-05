import { Crimson_Text, Gentium_Book_Plus } from 'next/font/google';
import { sanitizeHTML } from '@/src/utils/helpers';
import { FiLink } from 'react-icons/fi';

import slugify from 'slugify';
import parse from 'html-react-parser';
import Image from 'next/image';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';

/* English font */
const crimsonText = Crimson_Text({
   subsets: ['latin'],
   style: ['normal', 'italic'],
   weight: ['400', '600', '700'],
   variable: '--font-crimsonText',
});

/* Serbian font */
const gentium = Gentium_Book_Plus({
   subsets: ['cyrillic'],
   style: ['normal', 'italic'],
   weight: ['400', '700'],
   variable: '--font-gentium',
});

function ArticleContent({ content, article }) {
   const cleanContent = sanitizeHTML(content);

   const options = {
      replace: (domNode) => {
         if (domNode.name === 'img' && domNode.attribs?.src) {
            return (
               <Image
                  className={domNode.attribs.class}
                  src={domNode.attribs.src}
                  alt="Article image"
                  width={4000}
                  height={3000}
                  quality={60}
                  priority
                  sizes="100vw"
               />
            );
         }

         if (['h2', 'h3'].includes(domNode.name)) {
            const extractText = (node) => {
               if (node.type === 'text') return node.data;
               if (node.children)
                  return node.children.map(extractText).join('');
               return '';
            };

            const textContent = extractText(domNode).trim();
            if (!textContent) return;

            const slug = slugify(textContent, { lower: true, strict: true });
            const Tag = domNode.name;

            const hashSize =
               domNode.name === 'h2' ? 'size-6.5 ml-2.5' : 'size-5.5 ml-2';

            return (
               <Tag id={slug} className="group scroll-mt-20 relative">
                  <a
                     className="cursor-pointer flex items-center"
                     href={`#${slug}`}
                  >
                     {textContent}
                     <FiLink
                        className={`${hashSize} stroke-[2.2px] opacity-0 group-hover:opacity-100 text-primary-500/60 transition-opacity`}
                     />
                  </a>
               </Tag>
            );
         }
      },
   };

   return (
      <div
         className={`container text-text my-3 [&_:is(h2,h3)]:font-secondary ${
            crimsonText.variable
         }  ${gentium.variable} ${
            article.language === 'English'
               ? `text-2xl 2xl:text-[1.326rem] md:text-[1.6rem] [&_p]:leading-[1.49]! xs:[&_p]:leading-[1.35]! [&_blockquote>*]:font-main [&_blockquote>*]:font-semibold 4k:[&_blockquote>*]:text-[1.695rem]! 2k:[&_blockquote>*]:text-[1.65rem] [&_blockquote>*]:text-[1.65rem] 2xl:[&_blockquote>*]:text-[1.41rem] lg:[&_blockquote>*]:text-[1.438rem] md:[&_blockquote>*]:text-[1.75rem] xs:[&_blockquote>*]:text-[1.7rem] [&_blockquote>*]:leading-[1.23] 2xl:[&_blockquote>*]:leading-7.5 lg:[&_blockquote>*]:leading-7.5 md:[&_blockquote>*]:leading-9.5 sm:[&_blockquote>*]:leading-9.5 xs:[&_blockquote>*]:leading-[1.29] xs:[&_blockquote]:leading-[1.29] font-article`
               : `text-[1.4rem] 2xl:text-[1.235rem] lg:text-[1.178rem] md:text-[1.4rem] xs:text-[1.55rem] [&_p]:leading-[1.6]! 2xl:[&_p]:leading-[1.7] lg:[&_p]:leading-[1.65]! xs:[&_p]:leading-[1.44]! [&_blockquote>*]:text-2xl! 2xl:[&_blockquote>*]:text-[1.32rem]! lg:[&_blockquote>*]:text-[1.26rem]! md:[&_blockquote>*]:text-[1.6rem]! [&_blockquote>*]:leading-[1.5] xs:[&_blockquote>*]:leading-[1.4] font-article-sr`
         }`}
      >
         <>{parse(cleanContent, options)}</>
      </div>
   );
}

export default ArticleContent;
