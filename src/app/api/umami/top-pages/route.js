export async function GET(request) {
   const { searchParams } = new URL(request.url);

   // Fetch current period
   const res = await fetch(
      `https://api.umami.is/v1/websites/${process.env.UMAMI_WEBSITE_ID}/metrics?${searchParams}&type=url`,
      { headers: { 'x-umami-api-key': process.env.UMAMI_API_KEY } },
   );

   // Fetch previous period for position change
   const endAt = Number(searchParams.get('endAt'));
   const startAt = Number(searchParams.get('startAt'));
   const duration = endAt - startAt;

   const prevRes = await fetch(
      `https://api.umami.is/v1/websites/${process.env.UMAMI_WEBSITE_ID}/metrics?startAt=${startAt - duration}&endAt=${startAt}&type=url`,
      { headers: { 'x-umami-api-key': process.env.UMAMI_API_KEY } },
   );

   const current = await res.json();
   const previous = await prevRes.json();

   return Response.json(
      { current, previous },
      {
         headers: {
            'Access-Control-Allow-Origin': process.env.CMS_URL,
            'Cache-Control': 's-maxage=86400',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
         },
      },
   );
}

export async function OPTIONS() {
   return new Response(null, {
      headers: {
         'Access-Control-Allow-Origin': process.env.CMS_URL,
         'Access-Control-Allow-Methods': 'GET, OPTIONS',
         'Access-Control-Allow-Headers': 'Content-Type',
      },
   });
}
