import { createPortal } from 'react-dom';
import { useModal } from '@/src/hooks/use-modal';
import { motion } from 'motion/react';

function Modal({ closeModal, children }) {
   const ref = useModal(closeModal);

   return createPortal(
      <motion.div
         className="fixed top-0 left-0 h-screen w-full dark:bg-[#41455334] backdrop-blur-2xl z-40"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.1 }}
      >
         <div
            className="fixed top-[45%] left-1/2 px-4 py-12 pt-14 translate-x-[-50%] translate-y-[-50%] shadow-article dark:shadow-none flex flex-col gap-4 items-center bg-white/90 dark:bg-primary/90 border border-quaternary dark:border-tertiary rounded-4xl overflow-hidden"
            ref={ref}
         >
            {children}
         </div>
      </motion.div>,
      document.body
   );
}

export default Modal;
