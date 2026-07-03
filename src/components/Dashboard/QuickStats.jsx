// import React from 'react';
// import { BookOpen, ClipboardList, CalendarDays, Award, ChevronRight } from 'lucide-react';

// const stats = [
//   { icon: BookOpen, title: "My Courses", value: "6", subtitle: "Enrolled Courses", bg: "bg-blue-50", color: "text-blue-600" },
//   { icon: ClipboardList, title: "Assignments", value: "8", subtitle: "Pending Tasks", bg: "bg-green-50", color: "text-green-600" },
//   { icon: CalendarDays, title: "Upcoming Exams", value: "2", subtitle: "This Month", bg: "bg-purple-50", color: "text-purple-600" },
//   { icon: Award, title: "Overall GPA", value: "8.74", subtitle: "Good Standing", bg: "bg-orange-50", color: "text-orange-600" },
// ];

// export default function QuickStats() {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
//       {stats.map((stat, idx) => {
//         const Icon = stat.icon;
//         return (
//           <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between hover:shadow-sm transition-all cursor-pointer group">
//             <div className="flex items-center gap-4">
//               <div className={`p-3.5 rounded-xl ${stat.bg} ${stat.color}`}>
//                 <Icon className="h-6 w-6" />
//               </div>
//               <div>
//                 <p className="text-xs font-bold text-gray-400 tracking-wide">{stat.title}</p>
//                 <h3 className="text-2xl font-black text-gray-900 mt-0.5">{stat.value}</h3>
//                 <p className="text-xs font-medium text-gray-500 mt-0.5">{stat.subtitle}</p>
//               </div>
//             </div>
//             <ChevronRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
//           </div>
//         );
//       })}
//     </div>
//   );
// }