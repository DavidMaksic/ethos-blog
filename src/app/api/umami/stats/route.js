export async function GET(request) {
   const { searchParams } = new URL(request.url);

   const res = await fetch(
      `https://api.umami.is/v1/websites/${process.env.UMAMI_WEBSITE_ID}/stats?${searchParams}`,
      { headers: { 'x-umami-api-key': process.env.UMAMI_API_KEY } },
   );

   const data = await res.json();

   return Response.json(data, {
      headers: {
         'Access-Control-Allow-Origin': process.env.CMS_URL,
         'Cache-Control': 's-maxage=86400',
         'Access-Control-Allow-Methods': 'GET, OPTIONS',
         'Access-Control-Allow-Headers': 'Content-Type',
      },
   });
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
