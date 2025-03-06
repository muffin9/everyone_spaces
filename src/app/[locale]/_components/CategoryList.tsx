'use client';

import { MainCategoryWithSubs } from '@/schema/category';
import { CategoryItem } from './CategoryItem';
import { icons, categoryColors } from '@/constants/category';

interface CategoryListProps {
  categories: MainCategoryWithSubs[];
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            Icon={icons[getIconKey(category.icon_url)]}
            colorClass={getCategoryColor(category.icon_url)}
          />
        ))}
      </div>
    </>
  );
}

function getIconKey(iconUrl: string | null): keyof typeof icons {
  const key = (iconUrl?.split('/').pop()?.replace('.svg', '') ||
    'meeting') as keyof typeof icons;
  return key;
}

function getCategoryColor(iconUrl: string | null): string {
  const key = getIconKey(iconUrl) as keyof typeof categoryColors;
  return categoryColors[key] || categoryColors.meeting;
}
