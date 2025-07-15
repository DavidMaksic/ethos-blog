import { useEffect, useRef, useState } from 'react';

function useCommentLine(replies, replyClicked, replyIsOpen, showReplies) {
   const containerRef = useRef(null);
   const lastItemRef = useRef(null);
   const [lineHeight, setLineHeight] = useState(0);

   useEffect(() => {
      if (!containerRef.current || !lastItemRef.current) return;

      const updateLineHeight = () => {
         const containerTop = containerRef.current?.getBoundingClientRect().top;
         const lastItemTop = lastItemRef.current?.getBoundingClientRect().top;
         const lastItemHeight = lastItemRef.current?.offsetHeight;

         const distance = lastItemTop - containerTop + lastItemHeight / 2;
         setLineHeight(distance - 32);
      };

      updateLineHeight();

      const resizeObserver = new ResizeObserver(updateLineHeight);
      resizeObserver.observe(lastItemRef.current);

      return () => {
         resizeObserver.disconnect();
      };
   }, [replies, replyClicked, replyIsOpen, showReplies]);

   return { containerRef, lastItemRef, lineHeight };
}

export default useCommentLine;
