'use client';

import { Category } from '@/schema/category';
import { motion } from 'framer-motion';
import { LucideProps } from 'lucide-react';
import { ComponentType } from 'react';

interface CategoryItemProps {
  category: Category;
  Icon: ComponentType<LucideProps>;
  colorClass: string;
}

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

export function CategoryItem({
  category,
  Icon,
  colorClass,
}: CategoryItemProps) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.05,
        transition: { type: 'spring', stiffness: 400 },
      }}
      className={`
        flex flex-col items-center p-6 rounded-xl
        cursor-pointer transition-all
        hover:shadow-lg border border-gray-100
        ${colorClass}
      `}
    >
      <div className="p-4 rounded-full mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <span className="font-medium text-gray-800">{category.name}</span>
      <motion.span className="text-sm text-gray-500 mt-2">
        자세히 보기
      </motion.span>
    </motion.div>
  );
}
