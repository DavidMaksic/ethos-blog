import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

export function FormField({
   id,
   label,
   type = 'text',
   error,
   onChange,
   autoComplete,
}) {
   const [showPassword, setShowPassword] = useState(false);
   const isPassword = type === 'password';
   const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

   const [value, setValue] = useState('');

   const handleChange = (e) => {
      setValue(e.target.value);
      onChange?.(e);
   };

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
                     className="xs:top-12.5 text-red-600/50 dark:text-red-300/80 text-lg xs:text-xl font-semibold dark:font-medium select-none pointer-events-none font-secondary leading-6"
                  >
                     {error}
                  </motion.p>
               )}
            </AnimatePresence>
         </div>

         <div className="relative flex items-center">
            <input
               id={id}
               name={id}
               type={inputType}
               onChange={handleChange}
               autoComplete={autoComplete}
               className="py-1 bg-transparent border-b border-primary-600/25 text-primary-700/90 dark:text-primary-600/80 focus:outline-none w-full text-[1.75rem]"
            />
            <AnimatePresence>
               {isPassword && value.length > 0 && (
                  <motion.button
                     type="button"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.075 }}
                     onClick={() => setShowPassword((prev) => !prev)}
                     className="absolute right-1 text-primary-600/50 hover:text-primary-700/70 transition cursor-pointer"
                  >
                     {showPassword ? (
                        <AiOutlineEyeInvisible className="size-8" />
                     ) : (
                        <AiOutlineEye className="size-8" />
                     )}
                  </motion.button>
               )}
            </AnimatePresence>
         </div>
      </div>
   );
}

export default FormField;
