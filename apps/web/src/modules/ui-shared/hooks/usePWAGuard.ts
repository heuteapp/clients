'use client';

import { useEffect } from 'react';

export function usePWAGuard() {
  useEffect(() => {
    const isPWA = window.matchMedia('(display-mode: standalone)').matches;
    
    if (isPWA) {
      // Fetch isteklerine header ekle
      const originalFetch = window.fetch;
      window.fetch = function(...args) {
        if (args[1]) {
          args[1].headers = {
            ...args[1].headers,
            'X-PWA-Mode': 'true'
          };
        } else {
          args[1] = { headers: { 'X-PWA-Mode': 'true' } };
        }
        return originalFetch.apply(this, args);
      };
    }
  }, []);
  
  return null;
}