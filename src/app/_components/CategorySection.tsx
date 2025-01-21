'use client';

import { Camera, Music, Briefcase, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { name: '촬영 스튜디오', icon: Camera, color: 'bg-rose-50 text-rose-500' },
  { name: '음악 작업실', icon: Music, color: 'bg-purple-50 text-purple-500' },
  { name: '회의실', icon: Briefcase, color: 'bg-blue-50 text-blue-500' },
  { name: '카페', icon: Coffee, color: 'bg-amber-50 text-amber-500' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export default function CategorySection() {
  return (
    <section className="my-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold mb-2">어떤 공간을 찾으시나요?</h2>
        <p className="text-gray-600">다양한 목적에 맞는 공간을 찾아보세요</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto"
      >
        {categories.map((category) => (
          <motion.div
            key={category.name}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              transition: { type: 'spring', stiffness: 400 },
            }}
            className={`
              flex flex-col items-center p-6 rounded-xl
              cursor-pointer transition-all
              hover:shadow-lg border border-gray-100
              ${category.color}
            `}
          >
            <div className="p-4 rounded-full mb-4">
              <category.icon className="w-8 h-8" />
            </div>
            <span className="font-medium text-gray-800">{category.name}</span>
            <motion.span className="text-sm text-gray-500 mt-2">
              자세히 보기
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
