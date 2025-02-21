'use client';

import { getCookie, deleteCookie } from 'cookies-next';

import { useEffect, useState } from 'react';

// 사용자 타입 정의
interface User {
  id: string;
  email: string | null;
  fullName: string | null;
  avatarUrl: string | null;
  isHost: boolean;
  createdAt: Date;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 초기 세션 체크
    const initializeAuth = async () => {
      try {
        const accessToken = getCookie('accessToken');

        if (!accessToken) {
          setUser(null);
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/me`,
          { credentials: 'include' },
        );

        const user = await response.json();

        if (user) {
          setUser(user);
        } else {
          setUser(null);
          deleteCookie('access_token');
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // 선택적: WebSocket이나 Server-Sent Events로 실시간 세션 상태 관리
    // const eventSource = new EventSource('/api/auth/events');
    // eventSource.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   if (data.type === 'SESSION_EXPIRED') {
    //     setUser(null);
    //     router.push('/login');
    //   }
    // };
    // return () => eventSource.close();
  }, []);

  const signOut = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          method: 'POST',
          credentials: 'include',
        },
      );

      if (response.ok) {
        setUser(null);
        deleteCookie('access_token');
        deleteCookie('refresh_token');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return {
    user,
    isLoading,
    signOut,
  };
}
