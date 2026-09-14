import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export default auth((request) => {
  const isProtected = request.nextUrl.pathname.startsWith('/users') || request.nextUrl.pathname.startsWith('/api/users');
  if (isProtected && !request.auth) {
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/users/:path*', '/api/users/:path*'],
};
