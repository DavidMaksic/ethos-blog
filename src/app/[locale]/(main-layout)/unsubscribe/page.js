import { unsubscribe } from '@/src/lib/actions';

export default async function UnsubscribePage({ searchParams }) {
   const token = (await searchParams).token;
   const result = token ? await unsubscribe(token) : { success: false };

   return (
      <main>
         {result.success ? (
            <p>You have been unsubscribed.</p>
         ) : (
            <p>Invalid or expired unsubscribe link.</p>
         )}
      </main>
   );
}
