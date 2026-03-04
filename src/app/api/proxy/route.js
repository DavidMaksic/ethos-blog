import sharp from 'sharp';

export async function GET(request) {
   const { searchParams } = new URL(request.url);
   const url = searchParams.get('url');

   const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
   };

   if (!url)
      return new Response('Missing url', { status: 400, headers: corsHeaders });

   try {
      const response = await fetch(decodeURIComponent(url));
      if (!response.ok)
         return new Response('Upstream failed', {
            status: 502,
            headers: corsHeaders,
         });

      const arrayBuffer = await response.arrayBuffer();

      const resized = await sharp(Buffer.from(arrayBuffer))
         .resize(200, 200, { fit: 'inside' })
         .toFormat('jpeg')
         .toBuffer();

      return new Response(resized, {
         headers: {
            ...corsHeaders,
            'Content-Type': 'image/jpeg',
         },
      });
   } catch (err) {
      console.error('Proxy error:', err);
      return new Response(err.message, { status: 500, headers: corsHeaders });
   }
}
