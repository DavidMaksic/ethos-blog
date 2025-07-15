import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useSetParams() {
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const router = useRouter();

   function handleFilter(fieldName, value) {
      const params = new URLSearchParams(searchParams);
      params.set(fieldName, value);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
   }

   return handleFilter;
}
