import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const path = request.nextUrl.pathname;

  // Protect Admin Routes
  if (path.startsWith('/admin') && path !== '/admin/login') {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Protect Seller Routes
  if (path.startsWith('/seller') && path !== '/seller/login' && path !== '/seller/register') {
    if (!token) {
      return NextResponse.redirect(new URL('/seller/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/seller/:path*'],
};
