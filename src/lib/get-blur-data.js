// getBlurData.js
import 'server-only';
import { getPlaiceholder } from 'plaiceholder';
import sharp from 'sharp';

export async function getBlurData(src) {
   try {
      const cleanSrc = src.split('?')[0];
      const res = await fetch(cleanSrc, { next: { revalidate: 604800 } });
      const buffer = Buffer.from(await res.arrayBuffer());

      const image = sharp(buffer);
      const { hasAlpha } = await image.metadata();

      let isTransparent = false;
      if (hasAlpha) {
         const { data } = await image
            .ensureAlpha()
            .raw()
            .toBuffer({ resolveWithObject: true });
         isTransparent = Array.from(data).some(
            (val, i) => i % 4 === 3 && val < 255,
         );
      }

      const { base64 } = await getPlaiceholder(buffer, { size: 10 });
      return { base64, isTransparent };
   } catch {
      return { base64: undefined, isTransparent: false };
   }
}
