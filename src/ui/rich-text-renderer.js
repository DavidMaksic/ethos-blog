'use client';

import React, { useRef, useEffect } from 'react';
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
                  width={4000}
                  height={3000}
                  quality={60}
                  sizes="(max-width: 400px) 300px, (max-width: 630px) 600px, (max-width: 2300px) 1000px, 100vw"
               />
            );
         }
      },
   };

   const rawElement = parse(html, options);
   const containerRef = useRef(null);

   useEffect(() => {
      if (containerRef.current && rawElement) {
         const html = ReactDOMServer.renderToStaticMarkup(rawElement);
         containerRef.current.innerHTML = html;
      }
   }, []); // eslint-disable-line

   useEffect(() => {
      const zoom = mediumZoom('.container img', {
         margin: 60,
      });

      return () => {
         zoom.detach();
      };
   }, []);

   return <div ref={containerRef} />;
}
