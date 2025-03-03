import { protectedRoutes, publicOnlyRoutes } from '@/constants/route';

export const shouldRedirectToHome = (
  pathname: string,
  accessToken: string | null,
): boolean => {
  return (
    publicOnlyRoutes.includes(pathname) && !!accessToken && pathname !== '/'
  );
};

export const shouldRedirectToLogin = (
  pathname: string,
  accessToken: string | null,
): boolean => {
  // level, profile ~~ 동적 경로들은 무조건 로그인 필요.
  const protectedPathPatterns = ['/payment'];
  const isProtectedPattern = protectedPathPatterns.some(
    (pattern) => pathname === pattern || pathname.startsWith(`${pattern}/`),
  );

  return (
    (protectedRoutes.includes(pathname) || isProtectedPattern) && !accessToken
  );
};
