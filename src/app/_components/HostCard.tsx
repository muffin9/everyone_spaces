'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HostCard() {
  return (
    <section className="px-4 my-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <Link href="/host" className="flex flex-col">
          <h2 className="text-3xl font-bold mb-2">호스트 등록 ⚙️</h2>
          <div className="w-full h-[250px] flex flex-col justify-center items-center mt-8 shadow-lg rounded-xl cursor-pointer">
            <p className="text-3xl font-bold mb-2">내 공간 등록하기</p>
            <span className="text-gray-600 text-2xl">
              모두의공간의 호스트가 되어보세요!
            </span>
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
