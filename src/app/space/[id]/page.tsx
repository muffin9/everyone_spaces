import Header from '@/components/common/Header';
import ImageView from '@/components/spaceDetail/ImageView';
import KakaoSpaceMap from '@/components/spaceDetail/KakaoSpaceMap';
import RefundPolicy from '@/components/spaceDetail/RefundPolicy';
import SpaceCaution from '@/components/spaceDetail/SpaceCaution';
import SpaceInfo from '@/components/spaceDetail/SpaceInfo';
import StickyPricing from '@/components/spaceDetail/StickyPricing';
import { Separator } from '@/components/ui/separator';
import { spaceInfoSchema, SpaceInfoType } from '@/schema/spaces';

async function getSpaceInfo(spaceId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/spaces/${spaceId}`,
  );

  const data = await response.json();

  try {
    const validatedData = spaceInfoSchema.parse(data);
    return validatedData;
  } catch (error) {
    console.error('Data validation error:', error);
    return [];
  }
}

export default async function SpaceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // TODO: 아래 서버 컴포넌트 에러 해결 필요.
  const spaceInfo = (await getSpaceInfo(params.id)) as SpaceInfoType;

  return (
    <div className="relative flex flex-col min-h-screen">
      <Header />
      <section className="flex-grow">
        <div className="max-w-6xl mx-auto">
          <ImageView images={spaceInfo.images} />
          <KakaoSpaceMap lat={spaceInfo.latitude} lng={spaceInfo.longitude} />
          <Separator className="my-8" />
          <SpaceInfo
            infoData={{
              name: spaceInfo.name,
              address: spaceInfo.address,
              detailed_address: spaceInfo.detailedAddress,
              amenities: spaceInfo.amenities,
              max_capacity: spaceInfo.maxCapacity,
              rules: spaceInfo.rules,
              rating_average: spaceInfo.ratingAverage,
              view_count: spaceInfo.viewCount,
            }}
          />
          <Separator className="my-8" />
          <SpaceCaution spaceCautions={spaceInfo.cautions} />
          <Separator className="my-8" />
          <div>공간질문</div>
          <Separator className="my-8" />
          <RefundPolicy />
        </div>
      </section>
      <StickyPricing
        pricings={spaceInfo.pricing}
        spaceName={spaceInfo.name}
        spaceId={params.id}
      />
    </div>
  );
}
