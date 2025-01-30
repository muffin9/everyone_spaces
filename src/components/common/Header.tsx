'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from './Logo';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const { user, isLoading, signOut } = useAuth();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="bg-white shadow-md sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <Link href="/" className="flex gap-4 items-center text-2xl font-bold">
            <Logo />
            모두의 공간
          </Link>
        </motion.div>
        <nav>
          {isLoading ? (
            <span className="text-sm text-gray-400">로딩중...</span>
          ) : user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.email}</span>
              <button
                onClick={signOut}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              로그인
            </Link>
          )}
        </nav>
      </div>
    </motion.header>
  );
}
