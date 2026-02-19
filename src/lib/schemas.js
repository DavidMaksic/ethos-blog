import { z } from 'zod';

export const commentSchema = (t, maxLength = 2000) =>
   z.object({
      content: z
         .string()
         .transform((val) =>
            val
               .trim()
               .replace(/\n\s*\n+/g, '\n\n')
               .replace(/\s+$/, ''),
         )
         .refine((val) => val.length >= 2, {
            message: t('min', { count: 2 }),
         })
         .refine((val) => val.length <= maxLength, {
            message: t('max', { count: maxLength }),
         })
         .refine((val) => /\S/.test(val), {
            message: t('empty'),
         }),
   });

const usernameField = (t) =>
   z
      .string()
      .trim()
      .transform((s) => s.replace(/\s+/g, ' '))
      .pipe(
         z
            .string()
            .min(2, t('name-min', { count: 2 }))
            .max(25, t('name-max', { count: 25 }))
            .regex(/^[\p{L}0-9_]+(?: [\p{L}0-9_]+)*$/u, t('invalid-chars'))
            .refine((val) => !/^\d+$/.test(val), { message: t('all-numbers') })
            .refine((val) => !/__/.test(val), {
               message: t('consecutive-underscores'),
            })
            .refine((val) => !/^_|_$/.test(val), {
               message: t('edge-underscores'),
            }),
      );

export const usernameSchema = (t) =>
   z.object({
      username: usernameField(t),
   });

export const signInSchema = (t) =>
   z.object({
      email: z
         .string()
         .trim()
         .min(1, '*')
         .check(z.email({ error: t('email-invalid') })),
      password: z.string().min(1, '*'),
   });

export const signUpSchema = (t) =>
   z
      .object({
         name: usernameField(t),
         email: z
            .string()
            .trim()
            .min(1, '*')
            .max(254, t('email-max'))
            .check(z.email({ error: t('email-invalid') })),
         password: z
            .string()
            .min(8, t('password-min', { count: 8 }))
            .max(72, t('password-max', { count: 72 }))
            .refine((val) => /[0-9]/.test(val), {
               message: t('password-number'),
            }),
         confirmPassword: z.string().min(1, '*'),
      })
      .refine((data) => data.password === data.confirmPassword, {
         message: t('passwords-dont-match'),
         path: ['confirmPassword'],
      });
