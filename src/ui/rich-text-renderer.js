'use client';

import React, { useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import ReactDOMServer from 'react-dom/server';
import mediumZoom from 'medium-zoom';
import parse from 'html-react-parser';
import Image from 'next/image';

export default function RichTextRenderer({ html }) {
   const options = {
      replace: (domNode) => {
         if (domNode.name === 'img' && domNode.attribs?.src) {
            return (
               <Image
                  className={domNode.attribs.class}
                  src={domNode.attribs.src}
                  alt="Article image"
                  width={1200}
                  height={800}
                  quality={50}
                  priority={true}
                  sizes="(max-width: 400px) 300px, (max-width: 630px) 600px, (max-width: 1020px) 1000px, (max-width: 2300px) 1200px, 100vw"
               />
            );
         }
      },
   };

   const rawElement = parse(html, options);
   const containerRef = useRef(null);
   const isMobile = useMediaQuery({ maxWidth: 768 });

   useEffect(() => {
      if (containerRef.current && rawElement) {
         const html = ReactDOMServer.renderToStaticMarkup(rawElement);
         containerRef.current.innerHTML = html;
      }
   }, []); // eslint-disable-line

   useEffect(() => {
      const zoom = mediumZoom('.container img', {
         margin: isMobile ? 22 : 60,
      });

      return () => {
         zoom.detach();
      };
   }, [isMobile]);

   return <div ref={containerRef} />;
}
