export async function GET(request) {
   const { searchParams } = new URL(request.url);

   const res = await fetch(
      `https://api.umami.is/v1/websites/${process.env.UMAMI_WEBSITE_ID}/pageviews?${searchParams}`,
      { headers: { 'x-umami-api-key': process.env.UMAMI_API_KEY } },
   );

   const data = await res.json();

   const corsHeaders = {
      'Access-Control-Allow-Origin': process.env.CMS_URL,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
   };

   return Response.json(data, { headers: corsHeaders });
}

// Handle preflight
export async function OPTIONS() {
   return new Response(null, {
      headers: {
         'Access-Control-Allow-Origin': process.env.CMS_URL,
         'Access-Control-Allow-Methods': 'GET, OPTIONS',
         'Access-Control-Allow-Headers': 'Content-Type',
      },
   });
}
