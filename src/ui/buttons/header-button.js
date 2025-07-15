function HeaderButton({ handler, styles, children }) {
   return (
      <div
         className={`bg-none border-none p-2 rounded-lg transition-200 hover:bg-primary-200/40 dark:hover:bg-primary-300/30 [&_svg]:size-6 [&_svg]:text-accent cursor-pointer select-none ${styles}`}
         onClick={handler}
      >
         {children}
      </div>
   );
}

export default HeaderButton;
