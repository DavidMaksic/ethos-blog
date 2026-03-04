import sharp from 'sharp';

export async function GET(request) {
   const { searchParams } = new URL(request.url);
   const url = searchParams.get('url');
   if (!url) return new Response('Missing url', { status: 400 });

   try {
      const response = await fetch(decodeURIComponent(url));
      const arrayBuffer = await response.arrayBuffer();

      const resized = await sharp(Buffer.from(arrayBuffer))
         .resize(200, 200, { fit: 'inside' })
         .toFormat('jpeg')
         .toBuffer();

      return new Response(resized, {
         headers: {
            'Content-Type': 'image/jpeg',
            'Access-Control-Allow-Origin': '*',
         },
      });
   } catch {
      return new Response('Failed', { status: 500 });
   }
}
