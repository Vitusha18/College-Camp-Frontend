// import React, { useState } from 'react';

// import Sidebar from './Sidebar';
// import Header from './Header';
// import QuickStats from './QuickStats';
// import UpcomingDeadlines from './UpcomingDeadlines';
// import RecentActivities from './RecentActivities';
// import GPAChart from './GPAChart';

// export default function Dashboard() {
//   const [user, setUser] = useState({
//     name: "", 
//     course: "B.Tech CSE"
//   });

//   return (
//     // Outer frame set to absolute full-screen layout
//     <div className="min-h-screen w-full bg-[#F8FAFC] flex relative">
      
//       {/* 1. Sidebar - Kept fixed to the left edge */}
//       <Sidebar />

//       {/* 2. Main Content Canvas */}
//       {/* MATCH: lg:pl-64 gives precise room for the sidebar. w-full and flex-1 ensures it spreads edge-to-edge */}
//       <div className="flex-1 flex flex-col min-h-screen w-full min-w-0 lg:pl-64">
        
//         {/* Top Header - Now it will stretch infinitely to the right edge exactly like dash.png */}
//         <Header user={user} />

//         {/* Core Workspace Area */}
//         {/* MATCH: Removed mx-auto. Added standard responsive padding matching the mockup */}
//         <main className="flex-1 p-6 lg:p-8 space-y-8 w-full text-left">
          
//           {/* Welcome Action Header Banner */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
//             <div className="text-left">
//               <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
//                 Welcome back{user.name ? `, ${user.name}` : ''}! 👋
//               </h1>
//               <p className="text-sm font-semibold text-gray-400 mt-1">
//                 Here's what's happening on your campus today.
//               </p>
//             </div>
//             <div className="text-sm font-bold text-gray-500 bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-sm tracking-wide flex items-center gap-2 self-start sm:self-auto">
//               <span>📅</span> May 24, 2024 &nbsp;|&nbsp; Friday
//             </div>
//           </div>

//           {/* Quick Metrics Statistics Row Section */}
//           <QuickStats />

//           {/* Core Analytics Panels Row Grid */}
//           <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch w-full">
//             <RecentActivities type="events" />
//             <UpcomingDeadlines />
            
//             {/* GPA Analytic Card Box Container */}
//             <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col h-[400px] min-w-0 w-full">
//               <h3 className="text-md font-bold text-gray-900 mb-4">Overall GPA</h3>
//               <div className="flex-1 w-full h-full relative min-h-0">
//                 <GPAChart />
//               </div>
//             </div>
//           </div>

//           {/* Secondary Information Layout Row Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
//             <RecentActivities type="schedule" />
//             <RecentActivities type="announcements" />
//           </div>

//         </main>
//       </div>
//     </div>
//   );
// }