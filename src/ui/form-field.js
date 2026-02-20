import { AnimatePresence, motion } from 'motion/react';

export function FormField({
   id,
   label,
   type = 'text',
   error,
   onChange,
   autoComplete,
}) {
   return (
      <div className="flex flex-col gap-0.5">
         <div className="flex items-center gap-2">
            <label htmlFor={id} className="text-lg md:text-xl">
               {label}
            </label>
            <AnimatePresence>
               {error && (
                  <motion.p
                     key={`${id}-error`}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.075 }}
                     className="xs:top-12.5 text-red-600/50 dark:text-red-300/80 text-lg xs:text-xl font-semibold dark:font-medium select-none pointer-events-none font-secondary leading-5"
                  >
                     {error}
                  </motion.p>
               )}
            </AnimatePresence>
         </div>

         <input
            id={id}
            name={id}
            type={type}
            onChange={onChange}
            autoComplete={autoComplete}
            className="py-1 bg-transparent border-b border-primary-600/25 text-primary-700/90 dark:text-primary-600/80 focus:outline-none w-full text-[1.75rem]"
         />
      </div>
   );
}

export default FormField;
