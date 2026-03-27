"use client";

export default function WorkspaceBoardPage() {
    return (
        <div>
            Board Page
            <FullscreenButton />
        </div>
    )
}

import { useState, useEffect } from 'react';

export function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        // ✅ documentElement yerine body kullanmayı dene
        await document.body.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen hatası:', error);
      // Hata mesajını kullanıcıya göster
      alert('Tam ekran için sayfaya tıklayın ve tekrar deneyin');
    }
  };

  return (
    <button
      onClick={toggleFullscreen}
      className="fixed top-4 right-4 z-50 bg-black/50 text-white p-2 rounded-lg"
    >
      {isFullscreen ? '🔲 Çık' : '⛶ Tam Ekran'}
    </button>
  );
}