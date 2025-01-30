import { createClient } from 'supabase/supabase';
import {
  MainCategoryWithSubs,
  categoriesResponseSchema,
  mainCategoryWithSubsSchema,
} from '@/schema/category';
import { Suspense } from 'react';
import { CategoryList } from './CategoryList';

export async function getAllCategories(): Promise<MainCategoryWithSubs[]> {
  const { data, error } = await createClient
    .from('categories')
    .select(
      `id, name, description, icon_url, parent_id, is_active, display_order`,
    )
    .order('display_order');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  try {
    // 받아온 데이터 검증
    const validatedData = categoriesResponseSchema.parse(data);

    // 카테고리 그룹화 및 검증
    const groupedCategories = validatedData.reduce<
      Record<string, MainCategoryWithSubs>
    >((acc, category) => {
      if (!category.parent_id) {
        // 메인 카테고리
        acc[category.id] = mainCategoryWithSubsSchema.parse({
          ...category,
          subCategories: [],
        });
      } else {
        // 하위 카테고리
        if (acc[category.parent_id]) {
          acc[category.parent_id].subCategories.push(category);
        }
      }
      return acc;
    }, {});

    return Object.values(groupedCategories);
  } catch (error) {
    console.error('Data validation error:', error);
    return [];
  }
}

export default async function CategorySection() {
  const categories = await getAllCategories();

  if (!categories.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">카테고리를 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  return (
    <section className="my-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">어떤 공간을 찾으시나요?</h2>
        <p className="text-gray-600">다양한 목적에 맞는 공간을 찾아보세요</p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <CategoryList categories={categories} />
      </Suspense>
    </section>
  );
}
