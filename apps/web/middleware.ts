import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isPWA = request.headers.get('display-mode') === 'standalone';
  
  if (isPWA && !pathname.startsWith('/workspace')) {
    return NextResponse.redirect(new URL('/workspace/board', request.url));
  }
  
  return NextResponse.next();
}