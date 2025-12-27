import { motion } from 'motion/react';

function Button({ styles, handler, children }) {
   return (
      <motion.div
         className={`flex rounded-xl dark:text-primary-400 hover:bg-primary-200/30 dark:hover:bg-primary-300/30 cursor-pointer group transition-bg ${styles}`}
         onClick={handler}
         whileTap={{ scale: 0.85 }}
         transition={{ type: 'spring', stiffness: 2000, damping: 40 }}
      >
         {children}
      </motion.div>
   );
}

export default Button;
