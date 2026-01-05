'use client';

import { motion } from 'motion/react';

function AnimationWrapper({ type, comments, children }) {
   if (type === 'comments')
      return (
         <motion.div
            className="flex flex-col gap-6"
            initial={false}
            animate={{
               opacity: comments.length ? 1 : 0,
               height: comments.length ? 'auto' : 0,
            }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            layout
         >
            {children}
         </motion.div>
      );

   if (type === 'other')
      return (
         <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            layout
         >
            {children}
         </motion.div>
      );
}

export default AnimationWrapper;
