import ArticleItem from '@/src/ui/articles/article-item';
import { TbCategory2 } from 'react-icons/tb';
import { dummyData } from '@/src/ui/dummyData';

const categories = [
   'History',
   'Theology',
   'Apologetics',
   'Politics',
   'Praxis',
   'Marriage',
   'Education',
   'Homilies',
];

function OtherArticles() {
   return (
      <div className="grid grid-cols-[2fr_1fr] gap-10 my-14 mb-40">
         <div className="space-y-10">
            <h1 className="text-4xl">
               <span>Other articles</span>
            </h1>

            <ul className="grid grid-rows-3 gap-6">
               {dummyData.map((item) => (
                  <ArticleItem article={item} key={item.author} />
               ))}
            </ul>
         </div>

         <div className="space-y-10">
            <div className="flex items-center gap-3 text-4xl">
               <TbCategory2 className="text-3xl stroke-[1.4px]" />
               <h1>Categories</h1>
            </div>

            <ul className="flex gap-4 flex-wrap">
               {categories.map((item) => (
                  <li
                     key={item}
                     className="bg-accent-400/15 hover:bg-white dark:hover:bg-primary border border-transparent hover:border-accent-200 dark:hover:border-accent-400/50 hover:shadow-category dark:hover:shadow-none text-accent/75 px-3.5 pl-4 py-1.5 rounded-full font-medium text-[1.3rem] cursor-pointer transition duration-100"
                  >
                     {item}
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
}

export default OtherArticles;
