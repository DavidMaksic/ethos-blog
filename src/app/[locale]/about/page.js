import { getAuthors } from '@/src/lib/data-service';
import AboutBlocks from '@/src/ui/about-blocks';

export async function generateMetadata({ params }) {
   const { locale } = await params;
   return { title: locale === 'en' ? 'About' : 'О нама' };
}

async function Page() {
   const authors = await getAuthors();

   return <AboutBlocks authors={authors} />;
}

export default Page;
