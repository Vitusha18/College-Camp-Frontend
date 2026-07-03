// import React, { useState } from 'react';
// import { Plus, Check } from 'lucide-react';

// const initialTasks = [
//   { id: 1, title: 'DBMS Assignment', note: 'Due in 2 days', badge: 'High', style: 'bg-red-50 text-red-600' },
//   { id: 2, title: 'Operating Systems Quiz', note: 'Due in 4 days', badge: 'Medium', style: 'bg-orange-50 text-orange-600' },
//   { id: 3, title: 'React Project Submission', note: 'Due in 6 days', badge: 'Medium', style: 'bg-orange-50 text-orange-600' },
//   { id: 4, title: 'Maths Problem Set', note: 'Completed', badge: 'Low', style: 'bg-green-50 text-green-600' },
// ];

// export default function UpcomingDeadlines() {
//   // Hardcoding state toggle matching the selection state visualization inside dash.png
//   const [checkedIds, setCheckedIds] = useState([4]); 

//   const toggleTask = (id) => {
//     if (checkedIds.includes(id)) {
//       setCheckedIds(checkedIds.filter(item => item !== id));
//     } else {
//       setCheckedIds([...checkedIds, id]);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-[420px]">
//       <div>
//         {/* Widget Header Row */}
//         <div className="flex items-center justify-between mb-5">
//           <h3 className="font-bold text-gray-900 text-md">My Tasks</h3>
//           <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
//         </div>

//         {/* Checkbox Task List */}
//         <div className="space-y-4">
//           {initialTasks.map((task) => {
//             const isChecked = checkedIds.includes(task.id);
            
//             return (
//               <div key={task.id} className="flex items-center justify-between py-0.5 gap-2">
//                 <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  
//                   {/* Custom Styled Custom Checkbox Core Container */}
//                   <button
//                     onClick={() => toggleTask(task.id)}
//                     className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 cursor-pointer ${
//                       isChecked 
//                         ? 'bg-blue-600 border-blue-600 text-white' 
//                         : 'border-gray-300 bg-white hover:border-gray-400'
//                     }`}
//                   >
//                     {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
//                   </button>

//                   {/* Task Content Strings */}
//                   <div className="text-left min-w-0 flex-1">
//                     <h4 className={`text-sm font-bold truncate transition-all ${
//                       isChecked ? 'text-gray-400 line-through' : 'text-gray-900'
//                     }`}>
//                       {task.title}
//                     </h4>
//                     <p className={`text-xs mt-0.5 font-semibold transition-all ${
//                       isChecked ? 'text-green-500 font-bold' : 'text-gray-400'
//                     }`}>
//                       {isChecked ? 'Completed' : task.note}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Priority Status Badges */}
//                 <span className={`text-[10px] font-bold px-3 py-1 rounded-lg shrink-0 tracking-wide transition-all ${
//                   isChecked ? 'bg-green-50 text-green-600' : task.style
//                 }`}>
//                   {isChecked ? 'Low' : task.badge}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Dotted Call to Action Action Row */}
//       <button className="w-full border border-dashed border-gray-200 hover:bg-gray-50 text-blue-600 text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 mt-4">
//         <Plus className="h-4 w-4" /> Add New Task
//       </button>
//     </div>
//   );
// }