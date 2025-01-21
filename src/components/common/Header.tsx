'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {
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
          <Link href="/" className="text-2xl font-bold">
            모두의공간
          </Link>
        </motion.div>
        <nav>
          <ul className="flex space-x-4">
            {[
              { href: '/search', label: '공간 찾기' },
              { href: '/host', label: '호스트 되기' },
              { href: '/login', label: '로그인' },
            ].map((item) => (
              <motion.li
                key={item.href}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={item.href} className="hover:text-gray-600">
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}
