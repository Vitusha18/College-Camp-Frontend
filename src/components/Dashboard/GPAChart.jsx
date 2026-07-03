// import React from 'react';
// import { TrendingUp } from 'lucide-react';

// export default function GPAChart() {
//   return (
//     // Clean, fluid card core contents without double outer card borders
//     <div className="flex flex-col h-full justify-between w-full min-w-0">
      
//       {/* Chart Plot Container Grid Canvas */}
//       <div className="relative flex-1 w-full min-h-0 flex flex-col justify-between">
        
//         {/* SVG Graph Plotting Workspace */}
//         {/* MATCH: Expanded viewBox scaling and adjusted coordinates to match dash.png line steepness */}
//         <svg viewBox="0 0 500 240" className="w-full h-full overflow-visible flex-1">
          
//           {/* Background Grid Accent Lines */}
//           {[10, 60, 110, 160, 210].map((y, i) => (
//             <line key={i} x1="35" y1={y} x2="485" y2={y} stroke="#F1F5F9" strokeWidth="1.5" />
//           ))}

//           {/* Left Y-Axis Metric Labels */}
//           {[
//             { y: 10, val: "10" },
//             { y: 60, val: "8" },
//             { y: 110, val: "6" },
//             { y: 160, val: "4" },
//             { y: 210, val: "2" },
//             { y: 235, val: "0" }
//           ].map((axis, i) => (
//             <text key={i} x="12" y={axis.y + 4} textAnchor="middle" className="text-[11px] font-bold fill-gray-400">
//               {axis.val}
//             </text>
//           ))}
          
//           {/* Gradient fill vector shape area beneath chart path */}
//           <path
//             d="M 50,100 L 155,90 L 260,70 L 365,55 L 470,35 L 470,235 L 50,235 Z"
//             fill="url(#chartGradV4)"
//           />

//           {/* Core Graphic Trendline Indicator Vector */}
//           <path
//             d="M 50,100 L 155,90 L 260,70 L 365,55 L 470,35"
//             fill="none"
//             stroke="#2563EB"
//             strokeWidth="3.5"
//             strokeLinecap="round"
//           />

//           {/* Plot Coordinates Points Badges & Value Strings */}
//           {[
//             { x: 50, y: 100, val: '8.20' },
//             { x: 155, y: 90, val: '8.35' },
//             { x: 260, y: 70, val: '8.50' },
//             { x: 365, y: 55, val: '8.60' },
//             { x: 470, y: 35, val: '8.74' },
//           ].map((pt, i) => (
//             <g key={i}>
//               <circle cx={pt.x} cy={pt.y} r="5.5" fill="#2563EB" stroke="#ffffff" strokeWidth="2.5" className="shadow-sm" />
//               <text x={pt.x} y={pt.y - 14} textAnchor="middle" className="text-[11px] font-black fill-gray-800">
//                 {pt.val}
//               </text>
//             </g>
//           ))}

//           {/* Definitions Configuration Layer */}
//           <defs>
//             <linearGradient id="chartGradV4" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.12" />
//               <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.00" />
//             </linearGradient>
//           </defs>
//         </svg>

//         {/* Horizontal X-Axis Timeline Markers */}
//         <div className="flex justify-between pl-10 pr-2 text-[11px] font-bold text-gray-400 mt-3 tracking-wide">
//           <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span>
//         </div>
//       </div>

//       {/* Motivational Bottom Feedback Notification Accent */}
//       <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold mt-5 pt-3 border-t border-gray-50 text-left">
//         <TrendingUp className="h-4 w-4 stroke-[2.5]" />
//         <span className="tracking-wide">Good job! Your GPA is improving.</span>
//       </div>

//     </div>
//   );
// }