'use server';

import { ALLOWED_TYPES, MAX_SIZE, PFP_SIZE } from '../utils/config';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from './supabase-admin';
import { headers } from 'next/headers';
import { auth } from '@/src/lib/auth';
import sharp from 'sharp';

export async function updateImage(previousState, formData) {
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) throw new Error('You must be logged in');

   const userID = session.user.id;
   const oldImage = session.user.image;
   const newImage = formData.get('newImage');

   // Server-side validation
   if (
      !(newImage instanceof File) ||
      !ALLOWED_TYPES.includes(newImage.type) ||
      newImage.size > MAX_SIZE
   ) {
      throw new Error('No file uploaded or invalid file');
   }

   const input = Buffer.from(await newImage.arrayBuffer());

   let processed;
   try {
      processed = await sharp(input, { limitInputPixels: 25_000_000 })
         .rotate()
         .resize(PFP_SIZE, PFP_SIZE, { fit: 'cover' })
         .webp({ quality: 100 })
         .toBuffer();
   } catch {
      throw new Error('Invalid image');
   }

   const fileName = `user_image-${userID}-${crypto.randomUUID()}.webp`;

   // 1. Upload user image
   const { error: imageUploadError } = await supabaseAdmin.storage
      .from('user-images')
      .upload(fileName, processed, { contentType: 'image/webp' });

   if (imageUploadError) throw new Error(imageUploadError.message);

   // 2. Update image field in user
   const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/user-images/${fileName}`;

   try {
      await auth.api.updateUser({
         headers: await headers(),
         body: { image: imageUrl },
      });
   } catch (err) {
      // Don't leave an orphaned upload behind
      await supabaseAdmin.storage.from('user-images').remove([fileName]);
      throw err;
   }

   // 3. Delete the previous image, only if it's one of this user's own files
   if (oldImage?.includes('/user-images/')) {
      const oldPath = decodeURIComponent(oldImage.split('/user-images/')[1]);

      if (oldPath.startsWith(`user_image-${userID}-`)) {
         const { error } = await supabaseAdmin.storage
            .from('user-images')
            .remove([oldPath]);

         if (error) console.error('Old image cleanup failed:', error.message);
      }
   }

   revalidatePath('/user/settings');
   return { success: true };
}
