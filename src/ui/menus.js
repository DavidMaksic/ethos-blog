'use client';

import { createContext, useContext, useState } from 'react';
import { useOutsideClick } from '@/src/hooks/use-outside-click';
import { BsThreeDots } from 'react-icons/bs';
import { AnimatePresence, motion } from 'motion/react';

const MenusContext = createContext();

function Menus({ children }) {
   const [openID, setOpenID] = useState('');
   const close = () => setOpenID('');
   const open = setOpenID;

   return (
      <MenusContext.Provider value={{ openID, close, open }}>
         <div className="flex items-center relative">{children}</div>
      </MenusContext.Provider>
   );
}

function Toggle({ id }) {
   const { openID, close, open } = useContext(MenusContext);

   function handleClick(e) {
      e.stopPropagation();
      openID === '' || openID !== id ? open(id) : close();
   }

   return (
      <button className="w-min" onClick={handleClick}>
         <BsThreeDots className=" text-[2.5rem] md:text-[2.8rem] p-2.5 rounded-xl transition-[background-color] hover:bg-primary-100 hover:dark:bg-primary-300/20 cursor-pointer" />
      </button>
   );
}

function List({ id, children }) {
   const { openID, close } = useContext(MenusContext);
   const ref = useOutsideClick(close, false);

   if (openID !== id) return null;

   return (
      <AnimatePresence>
         <motion.ul
            className="absolute right-0 top-9 mt-2.5 p-1 w-max max-h-52 text-lg rounded-2xl bg-white dark:bg-primary border border-quaternary dark:border-tertiary shadow-lg cursor-pointer transition-bg_border z-10 overflow-hidden"
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.08 }}
         >
            {children}
         </motion.ul>
      </AnimatePresence>
   );
}

function Button({ icon, handler, children }) {
   const { close } = useContext(MenusContext);

   function handleClick() {
      handler?.();
      close();
   }

   return (
      <li>
         <button
            className={`flex items-center gap-2.5 md:gap-3 w-full font-semibold py-2 md:py-3 px-5 pr-9 md:pr-10 rounded-xl hover:bg-primary-100/50 dark:hover:bg-primary-200/80 transition duration-75 cursor-pointer md:text-2xl ${
               children?.props?.children === 'Delete' ||
               children?.props?.children === 'Избриши'
                  ? 'text-red-600/60 dark:text-red-300 hover:bg-red-100/35 dark:hover:bg-red-300/10 group font-bold! dark:font-semibold!'
                  : ''
            } [&_svg]:size-5 md:[&_svg]:size-7`}
            onClick={handleClick}
         >
            {icon}
            {children}
         </button>
      </li>
   );
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
