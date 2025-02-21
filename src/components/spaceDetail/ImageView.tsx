import { SpaceImage } from '@/schema/spaceImages';
import Image from 'next/image';

interface ImageViewProps {
  images: SpaceImage[];
}

export default async function ImageView({ images }: ImageViewProps) {
  const primarySpace = images.filter((image) => image.isPrimary)[0];
  const notPrimarySpace = images.filter((image) => !image.isPrimary);

  return (
    <section className="w-full my-8 flex flex-col gap-4">
      {primarySpace && (
        <div className="w-full">
          <Image
            src={primarySpace.imageUrl}
            width={1200}
            height={250}
            alt="장소 이미지"
          />
        </div>
      )}
      <div className="w-full flex gap-4 overflow-hidden">
        {notPrimarySpace &&
          notPrimarySpace.map((space) => {
            return (
              <Image
                key={space.id}
                src={space.imageUrl}
                width={300}
                height={200}
                alt={`${space.id} 장소 이미지`}
              />
            );
          })}
      </div>
    </section>
  );
}
