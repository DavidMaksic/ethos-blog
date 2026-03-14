import LoginBackground from '@/src/ui/image/login-background';
import AuthForm from '@/src/ui/auth/auth-form';

export async function generateMetadata({ params }) {
   const { locale } = await params;
   return {
      title: locale === 'en' ? 'Sign in' : 'Пријави се',
      robots: {
         index: false,
      },
   };
}

export default async function Page() {
   return (
      <section className="flex flex-col gap-10 justify-center items-center min-h-screen">
         <AuthForm />
         <LoginBackground />
      </section>
   );
}
