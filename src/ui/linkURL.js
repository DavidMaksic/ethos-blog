'use client';

import { FiLink } from 'react-icons/fi';
import toast from 'react-hot-toast';

function LinkURL() {
   return (
      <FiLink
         className="size-5.5  text-primary-400 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-500 cursor-pointer transition-color"
         onClick={() => {
            navigator.clipboard.writeText(window?.location.href);
            toast.success('Link copied to clipboard');
         }}
      />
   );
}

export default LinkURL;
