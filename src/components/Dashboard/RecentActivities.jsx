// import React from 'react';
// import { Calendar, Megaphone, Clock } from 'lucide-react';

// export default function RecentActivities({ type }) {
  
//   // 1. RENDERING UPCOMING EVENTS VIEW (3-Column Row)
//   if (type === "events") {
//     const events = [
//       { id: 1, date: "MAY 25", time: "10:00 AM", title: "Web Development Workshop", location: "Seminar Hall, Block A", bg: "bg-blue-50", text: "text-blue-600" },
//       { id: 2, date: "MAY 28", time: "02:00 PM", title: "Tech Talk: AI & Future", location: "Auditorium, Block C", bg: "bg-emerald-50", text: "text-emerald-600" },
//       { id: 3, date: "MAY 30", time: "09:00 AM", title: "CodeSprint Hackathon", location: "Computer Lab, Block B", bg: "bg-purple-50", text: "text-purple-600" }
//     ];

//     return (
//       <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between h-[420px]">
//         <div>
//           <div className="flex items-center justify-between mb-5">
//             <h3 className="text-md font-bold text-gray-900">Upcoming Events</h3>
//             <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
//           </div>
//           <div className="space-y-4">
//             {events.map(ev => {
//               const [month, day] = ev.date.split(" ");
//               return (
//                 <div key={ev.id} className="flex items-center gap-4">
//                   {/* Custom Styled Date Badge */}
//                   <div className={`w-12 h-14 ${ev.bg} ${ev.text} rounded-xl flex flex-col items-center justify-center font-black shrink-0`}>
//                     <span className="text-[9px] tracking-wider uppercase opacity-80">{month}</span>
//                     <span className="text-base leading-none mt-0.5">{day}</span>
//                   </div>
//                   <div className="text-left min-w-0 flex-1">
//                     <h4 className="text-sm font-bold text-gray-900 truncate">{ev.title}</h4>
//                     <p className="text-xs font-semibold text-gray-400 truncate mt-0.5">{ev.location}</p>
//                   </div>
//                   <span className="text-[11px] font-bold text-gray-400 shrink-0 self-start mt-1 text-right w-16 leading-tight">
//                     {ev.time.split(" ")[0]}<br/>{ev.time.split(" ")[1]}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//         <button className="w-full border border-gray-100 hover:bg-gray-50 text-blue-600 text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 mt-4">
//           <Calendar className="h-4 w-4" /> View Calendar
//         </button>
//       </div>
//     );
//   }

//   // 2. RENDERING TODAY'S SCHEDULE VIEW (Bottom Row)
//   if (type === "schedule") {
//     const schedules = [
//       { id: 1, time: "09:00 AM", title: "Data Structures", room: "Room 201, Block B", status: "In Progress", statusBg: "bg-blue-50 text-blue-600" },
//       { id: 2, time: "11:00 AM", title: "Operating Systems", room: "Room 305, Block B", status: "Upcoming", statusBg: "bg-gray-50 text-gray-500" },
//       { id: 3, time: "01:00 PM", title: "Database Management", room: "Room 201, Block B", status: "Upcoming", statusBg: "bg-gray-50 text-gray-500" }
//     ];

//     return (
//       <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm text-left">
//         <div className="flex items-center justify-between mb-6">
//           <h3 className="text-md font-bold text-gray-900">Today's Schedule</h3>
//           <button className="text-xs font-bold text-blue-600 hover:underline">View Full Schedule</button>
//         </div>
//         <div className="relative border-l-2 border-gray-100 pl-6 ml-14 space-y-6">
//           {schedules.map(sch => (
//             <div key={sch.id} className="relative flex items-center justify-between gap-4">
//               {/* Timeline Pointer Dot */}
//               <div className={`absolute -left-[31px] w-3 h-3 rounded-full border-2 border-white ${sch.status === 'In Progress' ? 'bg-blue-600' : 'bg-blue-400'}`} />
              
//               {/* Left-aligned absolute time marker */}
//               <span className="absolute -left-20 text-xs font-bold text-gray-900 w-14 text-right">
//                 {sch.time}
//               </span>

//               <div className="text-left min-w-0">
//                 <h4 className="text-sm font-bold text-gray-900 truncate">{sch.title}</h4>
//                 <p className="text-xs font-semibold text-gray-400 truncate mt-0.5">{sch.room}</p>
//               </div>
//               <span className={`text-[10px] font-bold px-3 py-1 rounded-lg shrink-0 tracking-wide ${sch.statusBg}`}>
//                 {sch.status}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // 3. RENDERING ANNOUNCEMENTS VIEW (Bottom Row)
//   if (type === "announcements") {
//     const announcements = [
//       { id: 1, title: "Campus Placement Drive", desc: "TCS is conducting placement drive for 2025 batch on May 30, 2024.", time: "2h ago", bg: "bg-blue-50", text: "text-blue-600", icon: Megaphone },
//       { id: 2, title: "Scholarship Applications Open", desc: "Apply for the merit-based scholarship before June 15, 2024.", time: "1d ago", bg: "bg-emerald-50", text: "text-emerald-600", icon: Clock },
//       { id: 3, title: "Annual Tech Fest 2024", desc: "Get ready for the biggest tech fest of the year on June 10-12!", time: "2d ago", bg: "bg-purple-50", text: "text-purple-600", icon: Calendar }
//     ];

//     return (
//       <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm text-left">
//         <div className="flex items-center justify-between mb-6">
//           <h3 className="text-md font-bold text-gray-900">Announcements</h3>
//           <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
//         </div>
//         <div className="space-y-5">
//           {announcements.map(ann => {
//             const Icon = ann.icon;
//             return (
//               <div key={ann.id} className="flex items-start gap-4">
//                 <div className={`p-3 rounded-xl ${ann.bg} ${ann.text} shrink-0`}>
//                   <Icon className="h-5 w-5" />
//                 </div>
//                 <div className="min-w-0 flex-1 text-left">
//                   <div className="flex items-center justify-between gap-2">
//                     <h4 className="text-sm font-bold text-gray-900 truncate">{ann.title}</h4>
//                     <span className="text-[10px] font-medium text-gray-400 shrink-0">{ann.time}</span>
//                   </div>
//                   <p className="text-xs font-semibold text-gray-400 mt-1 line-clamp-2 leading-relaxed">
//                     {ann.desc}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }

//   return null;
// }