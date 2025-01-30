import { HomeIcon } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
      <HomeIcon className="size-6" />
    </div>
  );
}
