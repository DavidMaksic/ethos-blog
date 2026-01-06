import { useEffect, useRef, useState } from 'react';

function UseVerticalLine(optimisticReplies) {
   const repliesWrapperRef = useRef(null);
   const lastReplyRef = useRef(null);
   const [lineHeight, setLineHeight] = useState(0);

   useEffect(() => {
      if (!repliesWrapperRef.current) return;

      const observer = new ResizeObserver(() => {
         if (!lastReplyRef.current || !repliesWrapperRef.current) return;

         const wrapperTop =
            repliesWrapperRef.current.getBoundingClientRect().top;
         const lastReplyRect = lastReplyRef.current.getBoundingClientRect();

         const end = lastReplyRect.top + lastReplyRect.height / 2 - wrapperTop;

         setLineHeight(end);
      });

      observer.observe(repliesWrapperRef.current);

      return () => observer.disconnect();
   }, [optimisticReplies.length]);

   return { lineHeight, repliesWrapperRef, lastReplyRef };
}

export default UseVerticalLine;
