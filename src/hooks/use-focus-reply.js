import { useEffect, useRef } from 'react';

function useFocusReply(replyIsOpen) {
   const replyInputRef = useRef(null);

   useEffect(() => {
      if (replyIsOpen) {
         setTimeout(() => {
            replyInputRef.current?.focus();
         }, 50);
      }
   }, [replyIsOpen]);

   return replyInputRef;
}

export default useFocusReply;
