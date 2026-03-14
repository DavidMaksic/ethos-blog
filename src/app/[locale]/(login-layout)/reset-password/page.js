import LoginBackground from '@/src/ui/image/login-background';
import ResetForm from '@/src/ui/auth/reset-form';

export async function generateMetadata({ params }) {
   const { locale } = await params;
   return {
      title: locale === 'en' ? 'Password reset' : 'Ресет лозинке',
      robots: {
         index: false,
      },
   };
}

export default async function Page() {
   return (
      <section className="flex flex-col gap-10 justify-center items-center min-h-screen">
         <ResetForm />
         <LoginBackground />
      </section>
   );
}
