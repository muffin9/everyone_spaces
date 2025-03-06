import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { shouldRedirectToHome, shouldRedirectToLogin } from './lib/router';

const intlMiddleware = createMiddleware({
  locales: ['ko', 'en', 'ja'],
  defaultLocale: 'ko',
  localePrefix: 'always',
  localeDetection: true,
});

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value as string;
  const pathname = request.nextUrl.pathname;

  // 인증 관련 리다이렉트 처리
  if (shouldRedirectToHome(pathname, accessToken)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (shouldRedirectToLogin(pathname, accessToken)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 다국어 미들웨어 처리
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
