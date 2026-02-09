import { usePathname, useRouter } from '@/src/i18n/navigation';
import { useSearchParams } from 'next/navigation';

export function useSetParams() {
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const router = useRouter();

   function handler(fieldName, value) {
      const params = new URLSearchParams(searchParams);

      if (value) {
         params.set(fieldName, value);
      } else {
         params.delete(fieldName);
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
   }

   return handler;
}
