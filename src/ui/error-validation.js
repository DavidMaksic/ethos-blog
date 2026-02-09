function ErrorValidation({ error, text, commentLength }) {
   return (
      <div className="flex justify-between">
         <span
            className={`error font-medium ml-4 text-lg md:text-xl transition-200 text-red-600/50 dark:text-red-300/80 ${error ? 'opacity-100' : 'opacity-0'}`}
         >
            {error}
         </span>

         <span
            className={`text-lg bg-primary-100/80 border border-quaternary dark:border-tertiary dark:bg-primary-200 rounded-full px-4 py-1 pb-1.5 font-medium select-none pointer-events-none transition-200 ${
               text.length < commentLength * 0.95 && 'opacity-0'
            } ${
               text.length === commentLength
                  ? 'text-red-600/60 bg-red-300/10! dark:text-red-300/80 border-red-300/30! dark:border-red-300/10!'
                  : ''
            }`}
         >
            {text.length} / {commentLength}
         </span>
      </div>
   );
}

export default ErrorValidation;
