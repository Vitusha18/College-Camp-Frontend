import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

const GPAChart = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-bold text-gray-900 text-sm">GPA Trend</h4>
          <button className="flex items-center gap-1 bg-gray-50 border border-gray-200 text-gray-600 text-[11px] px-2.5 py-1 rounded-lg font-medium">
            Current Semester <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>
        </div>

        {/* Dynamic Graphic Line Render */}
        <div className="relative h-44 w-full mt-4">
          <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Grid Lines */}
            <line x1="0" y1="120" x2="500" y2="120" stroke="#f3f4f6" strokeWidth="1" />
            <line x1="0" y1="80" x2="500" y2="80" stroke="#f3f4f6" strokeWidth="1" />
            <line x1="0" y1="40" x2="500" y2="40" stroke="#f3f4f6" strokeWidth="1" />
            
            {/* Gradient Area */}
            <path d="M 40,84 Q 140,74 240,65 T 440,40 L 440,120 L 40,120 Z" fill="url(#chartGradient)" />
            
            {/* Trendline */}
            <path d="M 40,84 Q 140,74 240,65 T 440,40" fill="none" stroke="#2563eb" strokeWidth="2.5" />
            
            {/* Point Node Orbs & Data Tags */}
            <circle cx="40" cy="84" r="4" fill="#2563eb" stroke="#fff" strokeWidth="2" />
            <text x="40" y="68" textAnchor="middle" className="text-[10px] font-bold fill-gray-900">7.89</text>
            
            <circle cx="140" cy="74" r="4" fill="#2563eb" stroke="#fff" strokeWidth="2" />
            <text x="140" y="58" textAnchor="middle" className="text-[10px] font-bold fill-gray-900">8.12</text>
            
            <circle cx="240" cy="65" r="4" fill="#2563eb" stroke="#fff" strokeWidth="2" />
            <text x="240" y="49" textAnchor="middle" className="text-[10px] font-bold fill-gray-900">8.32</text>
            
            <circle cx="440" cy="40" r="4" fill="#2563eb" stroke="#fff" strokeWidth="2" />
            <text x="440" y="24" textAnchor="middle" className="text-[10px] font-bold fill-gray-900">8.43</text>
          </svg>
          
          {/* Axis Labels */}
          <div className="flex justify-between text-[11px] font-medium text-gray-400 mt-2 px-6">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
          </div>
        </div>
      </div>

      <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 mt-4 transition-all w-fit">
        Go to GPA Calculator <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default GPAChart;