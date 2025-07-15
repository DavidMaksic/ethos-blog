function Button({ styles, handler, children }) {
   return (
      <div
         className={`flex rounded-lg dark:text-primary-400 hover:bg-primary-200/30 dark:hover:bg-primary-300/30 cursor-pointer group transition-bg ${styles}`}
         onClick={handler}
      >
         {children}
      </div>
   );
}

export default Button;
