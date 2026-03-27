import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const displayMode = request.headers.get('display-mode');
  const isPWA = displayMode === 'standalone';
  
  if (!isPWA || pathname.startsWith('/workspace')) {
    return NextResponse.next();
  }
  
  if (pathname === '/' || pathname === '/home' || pathname === '') {
    return NextResponse.redirect(new URL('/workspace/board', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/home'],
};