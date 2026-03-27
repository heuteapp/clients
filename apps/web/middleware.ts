import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const userAgent = request.headers.get('user-agent') || '';
  const referer = request.headers.get('referer') || '';
  const isPWA = userAgent.includes('WebApp') || 
                referer.includes('web-app') ||
                request.headers.get('accept')?.includes('web-app') ||
                request.cookies.get('pwa-mode')?.value === 'true';
  
  if (isPWA && !pathname.startsWith('/workspace')) {
    return NextResponse.redirect(new URL('/workspace/board', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|icons|manifest.json|sw.js|workbox-.*\\.js).*)',
};