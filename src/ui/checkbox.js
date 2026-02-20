function Checkbox({ checked, onChange, label }) {
   return (
      <label
         htmlFor="remember-me"
         className="group flex items-center gap-2 cursor-pointer select-none w-fit"
      >
         <div className="relative size-5 shrink-0">
            <input
               id="remember-me"
               type="checkbox"
               checked={checked}
               onChange={onChange}
               className="peer sr-only"
            />

            {/* Box */}
            <div className="size-5 rounded-md border-2 transition-all duration-200 border-primary-600/35 dark:border-primary-600/25 bg-transparent peer-checked:border-accent-500/70 dark:peer-checked:border-accent/60 peer-checked:bg-accent-500/60 dark:peer-checked:bg-accent/30 peer-focus-visible:ring-2 peer-focus-visible:ring-accent-500/50 dark:peer-focus-visible:ring-accent/50 peer-focus-visible:ring-offset-1 group-hover:border-accent-500/80 dark:group-hover:border-accent/70" />

            {/* Checkmark */}
            <svg
               viewBox="0 0 12 10"
               className="absolute inset-0 m-auto size-3 text-white dark:text-accent-200/90 opacity-0 scale-50 transition-all duration-200 peer-checked:opacity-100 peer-checked:scale-100"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
            >
               <polyline points="1.5 5 4.5 8.5 10.5 1.5" />
            </svg>
         </div>

         {label && <span className="text-lg xs:text-xl">{label}</span>}
      </label>
   );
}

export default Checkbox;
