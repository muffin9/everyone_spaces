import { spacesResponseSchema } from '@/schema/spaces';
import { Suspense } from 'react';
import NewSpaces from './NewSpaces';

async function getNewSpaces() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/spaces`);

  const data = await response.json();

  try {
    const validatedData = spacesResponseSchema.parse(data.spaces);
    return Object.values(validatedData);
  } catch (error) {
    console.error('Data validation error:', error);
    return [];
  }
}

export default async function NewSpacesSection() {
  const newSpaces = await getNewSpaces();

  if (!newSpaces.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">새로운 공간을 불러오는데 실패했습니다.</p>
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
        <NewSpaces newSpaces={newSpaces} />
      </Suspense>
    </section>
  );
}
