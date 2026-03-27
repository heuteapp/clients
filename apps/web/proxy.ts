import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPWA = request.cookies.get('pwa-mode')?.value === 'true';

  if (!isPWA || pathname.startsWith('/workspace')) {
    return NextResponse.next();
  }

  if (pathname === '/' || pathname === '/home') {
    return NextResponse.redirect(
      new URL('/workspace/board', request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/home'],
};