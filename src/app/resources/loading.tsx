import { Focus } from 'lucide-react';

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Focus className="text-zinc-800 animate-pulse w-36 h-36" />
    </div>
  )
}