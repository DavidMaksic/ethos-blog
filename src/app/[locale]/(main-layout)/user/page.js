import { redirect } from '@/src/i18n/navigation';

export async function generateMetadata({ params }) {
   const { locale } = await params;
   return { title: locale === 'en' ? 'Profile' : 'Профил' };
}

function Page() {
   redirect('/user/home');
}

export default Page;
