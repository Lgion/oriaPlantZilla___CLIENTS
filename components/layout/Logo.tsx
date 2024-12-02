import { Sprout } from 'lucide-react';

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-primary">
      <Sprout className="w-8 h-8" />
      <span className="font-bold text-xl">AgroTech</span>
    </div>
  );
};