import { Parisienne } from 'next/font/google';

const parisienne = Parisienne({
   subsets: ['latin'],
   display: 'swap',
   weight: ['400'],
});

function Stats({ title, value, icon, color, order }) {
   return (
      <div
         className={`flex justify-start w-fit h-24 gap-4 bg-white dark:bg-primary-300/10 border border-quaternary dark:border-primary-300/15 rounded-3xl py-4 px-6 box-shadow transition-bg_border ${order}`}
      >
         <span
            className={`self-center ${color} text-3xl rounded-full p-3.5 transition-bg`}
         >
            {icon}
         </span>

         <div className="flex flex-col self-center gap-1.5">
            <span className="text-xs uppercase font-bold text-primary-400 tracking-wider">
               {title}
            </span>

            <span
               className={`text-3xl xs:font-bold! text-primary-600 xs:text-primary-500 dark:text-primary-600/90 xs:dark:text-primary-600/75 transition-color pl-0.5 ${parisienne.className}`}
            >
               {value || '--'}
            </span>
         </div>
      </div>
   );
}

export default Stats;
