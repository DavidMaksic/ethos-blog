import { getUser } from '@/src/lib/data-service';

export async function GET(req) {
   const email = req.nextUrl.searchParams.get('email');

   if (!email) {
      return Response.json({ error: 'Email required' }, { status: 400 });
   }

   try {
      const user = await getUser(email);
      return Response.json(user);
   } catch (err) {
      return Response.json({ error: err.message }, { status: 500 });
   }
}
