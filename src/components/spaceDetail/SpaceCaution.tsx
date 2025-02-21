import { SpaceCaution as SpaceCautionType } from '@/schema/spaceCaution';

export default async function SpaceCaution({
  spaceCautions,
}: {
  spaceCautions: SpaceCautionType[];
}) {
  return (
    <section>
      <header>
        <h2 className="text-3xl font-bold mb-2">주의사항</h2>
        <div className="flex flex-col">
          <ul>
            {spaceCautions &&
              spaceCautions.map((caution: SpaceCautionType) => {
                return <li key={caution.id}>{caution.content}</li>;
              })}
          </ul>
        </div>
      </header>
    </section>
  );
}
