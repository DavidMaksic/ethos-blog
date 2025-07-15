'use client';

import { FiLink } from 'react-icons/fi';
import toast from 'react-hot-toast';

function LinkURL() {
   return (
      <FiLink
         className="size-5! stroke-[2.2px] text-primary-400 group-hover:text-primary-500 dark:text-primary-400 dark:group-hover:text-primary-500 transition-color"
         onClick={() => {
            navigator.clipboard.writeText(window?.location.href);
            toast.success('Link copied to clipboard');
         }}
      />
   );
}

export default LinkURL;
