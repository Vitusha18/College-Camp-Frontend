import { Icon } from "@iconify/react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 cursor-pointer select-none">
      {/* Icon Container */}
      <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
        <Icon icon="lucide:graduation-cap" className="w-5 h-5" />
      </div>
      {/* Typography */}
      <span className="text-xl font-bold text-gray-900 tracking-tight">
        Campus<span className="text-blue-600">Connect</span>
      </span>
    </div>
  );
}