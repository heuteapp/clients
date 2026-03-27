'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export const usePWAGuard = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  useEffect(() => {
    const isPWA = window.matchMedia('(display-mode: standalone)').matches ||
                  (window.navigator as any).standalone === true;
    
    if (isPWA) {
      document.cookie = "pwa-mode=true; path=/";
    }
    
    if (isPWA && !pathname.startsWith('/workspace')) {
      router.replace('/workspace/board');
    }
  }, [pathname, router]);
}