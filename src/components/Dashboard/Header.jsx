// import React from 'react';
// import { Search, Bell, ChevronDown } from 'lucide-react';

// export default function Header({ user }) {
//   return (
//     <header className="bg-white border-b border-gray-100 h-20 w-full px-8 flex items-center justify-between sticky top-0 z-40">
      
//       {/* 1. Universal Search Field Input Container */}
//       <div className="relative w-full max-w-md">
//         <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
//           <Search className="h-4 w-4" />
//         </span>
//         <input
//           type="text"
//           placeholder="Search anything..."
//           className="w-full bg-[#F8FAFC] border border-transparent rounded-xl py-2.5 pl-11 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-gray-200 transition-all font-medium"
//         />
//       </div>

//       {/* 2. Action Utility Menu Profiles */}
//       <div className="flex items-center gap-6">
        
//         {/* Notification Alert Ring Badge Indicator */}
//         <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-all rounded-xl hover:bg-gray-50">
//           <Bell className="h-6 w-6" />
//           <span className="absolute top-1 right-1 bg-blue-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white scale-90">
//             3
//           </span>
//         </button>

//         {/* Vertical Separator Divider line */}
//         <div className="h-8 w-[1px] bg-gray-100" />

//         {/* User Workspace Profile Label View */}
//         <div className="flex items-center gap-3 group cursor-pointer">
//           {/* Avatar frame circle placeholder */}
//           <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden border border-blue-200 flex items-center justify-center shadow-sm">
//             <span className="text-sm font-black text-blue-600">S</span>
//           </div>
          
//           {/* Persona Data Strings layout context */}
//           <div className="text-left hidden sm:block">
//             <span className="block text-sm font-bold text-gray-900 leading-tight">
//               Hello, {user?.name || "Student"}
//             </span>
//             <span className="block text-[11px] font-semibold text-gray-400 mt-0.5">
//               {user?.course || "B.Tech CSE"}
//             </span>
//           </div>

//           <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-all mt-0.5" />
//         </div>

//       </div>

//     </header>
//   );
// }