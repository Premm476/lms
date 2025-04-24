import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PUBLIC_PATHS = [
  '/login',
  '/register',
  '/auth/error',
  '/api/auth',
  '/api/test-email',
  '/api/exam/start',
  '/api/exam/',
];
const PROTECTED_PATHS = ['/dashboard', '/admin', '/instructor'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ⚙️ Allow all public/static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|css|js|woff2?|ttf)$/) ||
    PUBLIC_PATHS.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.next();
  }

  // Create a compatible request object for next-auth
  const authRequest = {
    headers: Object.fromEntries(request.headers),
    cookies: Object.fromEntries(
      request.cookies.getAll().map((c) => [c.name, c.value])
    ),
    url: request.url,
  };

  const token = await getToken({
    req: authRequest as any, // Temporary type assertion
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Debug logging for token presence
  console.log(`[middleware] Request to ${pathname} - token present: ${!!token}`);

  // 🔒 Protect all /api routes except /api/auth and other public API paths
  if (pathname.startsWith('/api') && !PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    if (!token) {
      console.log(`[middleware] Unauthorized API request to ${pathname} - no token`);
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return NextResponse.next();
  }

  // 🚫 Block unauthenticated users from protected routes
  if (!token && PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    console.log(`[middleware] Redirecting unauthenticated user from ${pathname} to /login`);
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 🔁 Redirect logged-in users away from login/register
  if (token && (pathname === '/login' || pathname === '/register')) {
    const redirectTo =
      token.role === 'ADMIN'
        ? '/admin'
        : token.role === 'INSTRUCTOR'
        ? '/instructor'
        : '/dashboard';
    console.log(`[middleware] Redirecting logged-in user from ${pathname} to ${redirectTo}`);
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  // 🔐 Role-based access control
  if (token) {
    const role = token.role;

    // STUDENT cannot access /admin
    if (role === 'STUDENT' && pathname.startsWith('/admin')) {
      console.log(`[middleware] Redirecting STUDENT from /admin to /dashboard`);
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // INSTRUCTOR can only access /admin/courses
    if (
      role === 'INSTRUCTOR' &&
      pathname.startsWith('/admin') &&
      !pathname.startsWith('/admin/courses')
    ) {
      console.log(`[middleware] Redirecting INSTRUCTOR from /admin to /instructor`);
      return NextResponse.redirect(new URL('/instructor', request.url));
    }
  }

  // 🛡 Add security headers
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico|images/|fonts/|public/).*)',
  ],
};
