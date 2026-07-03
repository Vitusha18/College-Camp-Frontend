// import React from "react";
// import {
//   LayoutDashboard,
//   User,
//   BookOpen,
//   CalendarDays,
//   Briefcase,
//  Award,
//   Bell,
//   Settings,
//   GraduationCap,
// } from "lucide-react";

// const menuItems = [
//   { icon: LayoutDashboard, label: "Dashboard", active: true },
//   { icon: User, label: "My Profile" },
//   { icon: BookOpen, label: "My Courses" },
//   { icon: CalendarDays, label: "Study Planner" },
//   { icon: Briefcase, label: "Internships" },
//   { icon: Award, label: "Scholarships" },
//   { icon: Bell, label: "Notifications", badge: 2 },
//   { icon: Settings, label: "Settings" },
// ];

// export default function Sidebar() {
//   return (
//     <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 border-r border-gray-200 bg-white lg:flex lg:flex-col">

//       {/* Logo */}
//       <div className="flex h-20 items-center gap-3 border-b border-gray-100 px-6">
//         <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
//           <GraduationCap className="h-6 w-6 text-white" />
//         </div>

//         <h1 className="text-xl font-bold">
//           Campus<span className="text-blue-600">Connect</span>
//         </h1>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-4 py-6 space-y-2">
//         {menuItems.map((item, index) => {
//           const Icon = item.icon;

//           return (
//             <button
//               key={index}
//               className={`flex w-full items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 ${
//                 item.active
//                   ? "bg-blue-50 text-blue-600"
//                   : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 <Icon size={20} />
//                 <span className="font-medium">{item.label}</span>
//               </div>

//               {item.badge && (
//                 <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
//                   {item.badge}
//                 </span>
//               )}
//             </button>
//           );
//         })}
//       </nav>

//       {/* Footer */}
//       <div className="border-t border-gray-100 p-5">
//         <p className="text-center text-xs text-gray-400">
//           CampusConnect v1.0
//         </p>
//       </div>

//     </aside>
//   );
// }