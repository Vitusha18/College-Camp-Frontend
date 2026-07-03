import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2 text-[#2563eb] font-bold text-xl tracking-tight select-none font-sans">
      {/* Modern graduation cap icon matching the blue theme */}
      <GraduationCap className="h-7 w-7 stroke-[2.5]" />
      
      {/* Brand Name */}
      <span>Campus Connect</span>
    </div>
  );
}