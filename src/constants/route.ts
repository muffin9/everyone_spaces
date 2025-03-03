const PAGE_URL = {
  HOME: '/',

  USER: '/profile',
  LOGIN: '/login',
};

export const publicOnlyRoutes: string[] = [PAGE_URL.LOGIN];
export const protectedRoutes: string[] = [PAGE_URL.USER];
