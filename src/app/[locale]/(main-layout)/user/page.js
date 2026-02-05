import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/src/lib/auth';

export async function generateMetadata({ params }) {
   const { locale } = await params;
   return { title: locale === 'en' ? 'Profile' : 'Профил' };
}

async function Page() {
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) redirect('/login');

   redirect('/user/home');
}

export default Page;
