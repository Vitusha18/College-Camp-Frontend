// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Calendar, Plus, Flame, CheckCircle2, BookOpen,
//   Database, Cpu, SquareEqual, CircleDot, ChevronRight,
//   TrendingUp, AlertCircle, Sparkles, ChevronLeft, MoreHorizontal, X
// } from 'lucide-react';

// export default function Overview() {
//   const navigate = useNavigate();

//   // State for adding a new task form visibility and inputs
//   const [isAddingTask, setIsAddingTask] = useState(false);
//   const [newTaskText, setNewTaskText] = useState('');
//   const [newTaskTime, setNewTaskTime] = useState('08:00 PM – 09:00 PM');
//   const [newTaskDept, setNewTaskDept] = useState('General');

//   // View All toggle states
//   const [showAllDeadlines, setShowAllDeadlines] = useState(false);
//   const [showAllSubjects, setShowAllSubjects] = useState(false);

//   // Study Tips carousel state
//   const [currentTipIndex, setCurrentTipIndex] = useState(0);
//   const studyTips = [
//     { title: 'Focus Tip', text: 'Study in focused blocks of 25–50 minutes and take short breaks.' },
//     { title: 'Active Recall', text: 'Test yourself on the material instead of just re-reading notes.' },
//     { title: 'The Feynman Tech', text: 'Explain complex concepts out loud in simple terms to verify understanding.' }
//   ];

//   // Selected Day State
//   const [selectedDay, setSelectedDay] = useState('Tue');
  
//   // CHANGED: Moved dailyData into React state so additions persist on re-render
//   const [dailyData, setDailyData] = useState({
//     Mon: {
//       date: 'Monday, 19 May 2026',
//       completedCount: 4,
//       totalHours: '2.5',
//       schedules: [
//         { id: 101, time: '10:00 AM – 11:30 AM', task: 'Physics Mechanics', dept: 'Engineering Physics', status: 'Completed', style: 'bg-green-50 text-green-600', icon: BookOpen, iconBg: 'bg-green-100 text-green-600' },
//         { id: 102, time: '02:00 PM – 04:00 PM', task: 'Digital Logic Lab', dept: 'Computer Science', status: 'Completed', style: 'bg-green-50 text-green-600', icon: Cpu, iconBg: 'bg-purple-100 text-purple-600' }
//       ]
//     },
//     Tue: {
//       date: 'Tuesday, 20 May 2026',
//       completedCount: 5,
//       totalHours: '3.5',
//       schedules: [
//         { id: 1, time: '09:00 AM – 10:30 AM', task: 'Data Structures', dept: 'Computer Science', status: 'In Progress', style: 'bg-blue-50 text-blue-600', icon: BookOpen, iconBg: 'bg-purple-100 text-purple-600' },
//         { id: 2, time: '11:00 AM – 12:30 PM', task: 'Database Management', dept: 'Computer Science', status: 'Upcoming', style: 'bg-indigo-50 text-indigo-600', icon: Database, iconBg: 'bg-orange-100 text-orange-600' },
//         { id: 3, time: '02:00 PM – 03:30 PM', task: 'Operating Systems', dept: 'Computer Science', status: 'Upcoming', style: 'bg-indigo-50 text-indigo-600', icon: Cpu, iconBg: 'bg-green-100 text-green-600' },
//       ]
//     },
//     Wed: {
//       date: 'Wednesday, 21 May 2026',
//       completedCount: 6,
//       totalHours: '4.0',
//       schedules: [
//         { id: 201, time: '09:30 AM – 11:00 AM', task: 'Algorithms Analysis', dept: 'Computer Science', status: 'Completed', style: 'bg-green-50 text-green-600', icon: BookOpen, iconBg: 'bg-blue-100 text-blue-600' }
//       ]
//     },
//     Thu: {
//       date: 'Thursday, 22 May 2026',
//       completedCount: 5,
//       totalHours: '3.5',
//       schedules: [
//         { id: 301, time: '10:00 AM – 12:00 PM', task: 'System Architecture', dept: 'Computer Science', status: 'Completed', style: 'bg-green-50 text-green-600', icon: Cpu, iconBg: 'bg-green-100 text-green-600' }
//       ]
//     },
//     Fri: {
//       date: 'Friday, 23 May 2026',
//       completedCount: 7,
//       totalHours: '4.5',
//       schedules: [
//         { id: 401, time: '08:00 AM – 10:00 AM', task: 'Full Stack Sprint', dept: 'Project Work', status: 'Completed', style: 'bg-green-50 text-green-600', icon: Database, iconBg: 'bg-blue-100 text-blue-600' }
//       ]
//     },
//     Sat: {
//       date: 'Saturday, 24 May 2026',
//       completedCount: 3,
//       totalHours: '2.5',
//       schedules: [
//         { id: 501, time: '11:00 AM – 01:00 PM', task: 'Weekly Codeforces Contest', dept: 'Competitive Coding', status: 'Completed', style: 'bg-green-50 text-green-600', icon: SquareEqual, iconBg: 'bg-yellow-100 text-yellow-600' }
//       ]
//     },
//     Sun: {
//       date: 'Sunday, 25 May 2026',
//       completedCount: 0,
//       totalHours: '0.0',
//       schedules: [
//         { id: 601, time: '—', task: 'Rest & Recovery Day', dept: 'Off', status: 'Rest', style: 'bg-gray-100 text-gray-400', icon: CircleDot, iconBg: 'bg-gray-100 text-gray-400' }
//       ]
//     }
//   });

//   const streakDays = [
//     { label: 'Mon', key: 'Mon' },
//     { label: 'Tue', key: 'Tue' },
//     { label: 'Wed', key: 'Wed' },
//     { label: 'Thu', key: 'Thu' },
//     { label: 'Fri', key: 'Fri' },
//     { label: 'Sat', key: 'Sat' },
//     { label: 'Sun', key: 'Sun' }
//   ];

//   const trackedSubjects = [
//     { name: 'Data Structures', progress: 75, style: 'bg-blue-600', icon: BookOpen, iconColor: 'text-green-500 bg-green-50' },
//     { name: 'Database Management', progress: 60, style: 'bg-blue-600', icon: Database, iconColor: 'text-blue-500 bg-blue-50' },
//     { name: 'Operating Systems', progress: 50, style: 'bg-blue-600', icon: Cpu, iconColor: 'text-orange-500 bg-orange-50' },
//     { name: 'Engineering Mathematics', progress: 40, style: 'bg-blue-600', icon: SquareEqual, iconColor: 'text-purple-500 bg-purple-50' },
//     { name: 'Aptitude', progress: 30, style: 'bg-blue-600', icon: CircleDot, iconColor: 'text-red-400 bg-red-50' }
//   ];

//   const barProgress = [
//     { label: 'Mon', h: 'h-[50px]', val: '2.5h' },
//     { label: 'Tue', h: 'h-[70px]', val: '3.5h' },
//     { label: 'Wed', h: 'h-[85px]', val: '4.0h' },
//     { label: 'Thu', h: 'h-[70px]', val: '3.5h' },
//     { label: 'Fri', h: 'h-[95px]', val: '4.5h' },
//     { label: 'Sat', h: 'h-[55px]', val: '2.5h' },
//     { label: 'Sun', h: 'h-[8px]', val: '-' },
//   ];

//   const finalDeadlines = [
//     { d: '25', m: 'MAY', t: 'Data Structures Assignment', dept: 'Computer Science', remain: '2 Days Left', style: 'text-red-500' },
//     { d: '28', m: 'MAY', t: 'Database Management Quiz', dept: 'Computer Science', remain: '5 Days Left', style: 'text-amber-500' },
//     { d: '02', m: 'JUN', t: 'Operating Systems Project', dept: 'Computer Science', remain: '10 Days Left', style: 'text-green-600' },
//     { d: '05', m: 'JUN', t: 'Mathematics (DAA) Test', dept: 'Engineering Mathematics', remain: '13 Days Left', style: 'text-green-600' },
//   ];

//   const nextTip = () => setCurrentTipIndex((prev) => (prev + 1) % studyTips.length);
//   const prevTip = () => setCurrentTipIndex((prev) => (prev - 1 + studyTips.length) % studyTips.length);

//   const handleQuickAction = (pageTarget) => {
//     navigate(`/planner/${pageTarget}`);
//   };

//   // Handler to properly append the new task via state update
//   const handleAddTaskSubmit = (e) => {
//     e.preventDefault();
//     if (!newTaskText.trim()) return;

//     const newTask = {
//       id: Date.now(),
//       time: newTaskTime,
//       task: newTaskText,
//       dept: newTaskDept,
//       status: 'Pending',
//       style: 'bg-amber-50 text-amber-600',
//       icon: BookOpen,
//       iconBg: 'bg-blue-100 text-blue-600'
//     };

//     setDailyData((prevData) => {
//       const currentDaySchedules = prevData[selectedDay].schedules;
//       return {
//         ...prevData,
//         [selectedDay]: {
//           ...prevData[selectedDay],
//           completedCount: prevData[selectedDay].completedCount + 1,
//           schedules: [newTask, ...currentDaySchedules]
//         }
//       };
//     });

//     setNewTaskText('');
//     setIsAddingTask(false);
//   };

//   const displayedDeadlines = showAllDeadlines ? finalDeadlines : finalDeadlines.slice(0, 3);
//   const displayedSubjects = showAllSubjects ? trackedSubjects : trackedSubjects.slice(0, 4);
//   const activeDayData = dailyData[selectedDay];

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
      
//       {/* LEFT PRIMARY CONTAINER ROW */}
//       <div className="lg:col-span-2 space-y-8">
        
//         {/* WIDGET 1: SELECTED DAY'S PLAN */}
//         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
//           <div className="flex items-center justify-between">
//             <div className="space-y-1">
//               <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//                 <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">📅</span> {selectedDay}'s Plan
//               </h3>
//               <p className="text-xs font-bold text-blue-600">{activeDayData.date}</p>
//             </div>
//             <button 
//               onClick={() => setIsAddingTask(!isAddingTask)} 
//               className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-xl transition hover:bg-blue-100 cursor-pointer"
//             >
//               <Plus className="w-3.5 h-3.5" /> {isAddingTask ? 'Close Form' : 'Add Task'}
//             </button>
//           </div>

//           {isAddingTask && (
//             <form onSubmit={handleAddTaskSubmit} className="bg-slate-50 border border-blue-100 p-4 rounded-2xl space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-xs font-extrabold text-blue-700">Add to {selectedDay}'s Schedule</span>
//                 <button type="button" onClick={() => setIsAddingTask(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//               <input 
//                 type="text" 
//                 placeholder="Enter task name" 
//                 value={newTaskText}
//                 onChange={(e) => setNewTaskText(e.target.value)}
//                 className="w-full text-xs font-medium p-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-500"
//                 required
//               />
//               <div className="grid grid-cols-2 gap-2">
//                 <input 
//                   type="text" 
//                   placeholder="Time slot" 
//                   value={newTaskTime}
//                   onChange={(e) => setNewTaskTime(e.target.value)}
//                   className="text-xs font-medium p-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-500"
//                 />
//                 <input 
//                   type="text" 
//                   placeholder="Department / Subject" 
//                   value={newTaskDept}
//                   onChange={(e) => setNewTaskDept(e.target.value)}
//                   className="text-xs font-medium p-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-500"
//                 />
//               </div>
//               <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition cursor-pointer">
//                 Save Task
//               </button>
//             </form>
//           )}

//           <div className="space-y-3">
//             {activeDayData.schedules.map((item) => {
//               const ItemIcon = item.icon || BookOpen;
//               return (
//                 <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl border border-gray-50 bg-white shadow-sm gap-3 hover:border-gray-200 transition">
//                   <div className="flex items-center gap-4">
//                     <span className="text-xs font-bold text-gray-400 w-36 whitespace-nowrap">{item.time}</span>
//                     <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${item.iconBg}`}>
//                       <ItemIcon className="w-4 h-4" />
//                     </div>
//                     <div>
//                       <h4 className="text-sm font-bold text-gray-800 leading-tight">{item.task}</h4>
//                       <span className="text-[11px] font-medium text-gray-400 mt-0.5 block">{item.dept}</span>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between sm:justify-end gap-4 ml-auto">
//                     <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full ${item.style}`}>{item.status}</span>
//                     <button className="text-gray-400 hover:text-gray-600 p-1"><MoreHorizontal className="w-4 h-4" /></button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* WIDGET 2: WEEKLY STUDY PROGRESS */}
//         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
//           <div className="flex items-center justify-between">
//             <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//               <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">📈</span> Weekly Study Progress
//             </h3>
//             <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-xl">Viewing: {selectedDay}</span>
//           </div>

//           <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-50/40 p-4 rounded-2xl">
//             <div className="relative w-32 h-32 flex items-center justify-center flex-shrink-0">
//               <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
//                 <circle cx="18" cy="18" r="15.91" fill="none" stroke="#f1f5f9" strokeWidth="3" />
//                 <circle cx="18" cy="18" r="15.91" fill="none" stroke="#2563eb" strokeWidth="3" strokeDasharray="68 100" strokeLinecap="round" />
//               </svg>
//               <div className="absolute flex flex-col items-center">
//                 <span className="text-xl font-black text-gray-800">{activeDayData.totalHours}h</span>
//                 <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase">{selectedDay} Study</span>
//               </div>
//             </div>

//             <div className="space-y-1">
//               <span className="text-xs text-gray-400 font-bold block">Recorded Hours ({selectedDay})</span>
//               <h4 className="text-2xl font-black text-gray-900">{activeDayData.totalHours} <span className="text-sm text-gray-400 font-medium">hrs studied</span></h4>
//               <p className="text-xs text-gray-500 font-medium leading-relaxed mt-1">{activeDayData.completedCount} tasks processed/logged on this day.</p>
//             </div>
//           </div>

//           <div className="flex items-end justify-between h-32 pt-4 px-2">
//             {barProgress.map((day, idx) => (
//               <div key={idx} className="flex flex-col items-center flex-1 space-y-2">
//                 <span className="text-[10px] font-bold text-gray-400">{day.val}</span>
//                 <div className={`w-6 sm:w-8 ${day.h} bg-blue-600 rounded-lg transition hover:bg-blue-700`} />
//                 <span className="text-xs font-bold text-gray-400">{day.label}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* WIDGET 3: UPCOMING DEADLINES */}
//         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
//           <div className="flex items-center justify-between">
//             <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//               <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">📅</span> Upcoming Deadlines
//             </h3>
//             <button 
//               onClick={() => setShowAllDeadlines(!showAllDeadlines)} 
//               className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
//             >
//               {showAllDeadlines ? 'Show Less' : 'View All'}
//             </button>
//           </div>

//           <div className="space-y-3">
//             {displayedDeadlines.map((dl, index) => (
//               <div key={index} className="flex items-center justify-between p-3 rounded-2xl border border-gray-50 hover:border-gray-100 bg-white shadow-sm">
//                 <div className="flex items-center gap-4">
//                   <div className="bg-blue-50/60 rounded-xl p-2 w-12 h-12 flex flex-col items-center justify-center border border-blue-50">
//                     <span className="text-base font-black text-blue-700 leading-none">{dl.d}</span>
//                     <span className="text-[9px] font-bold text-blue-400 mt-0.5 leading-none">{dl.m}</span>
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-bold text-gray-800 leading-tight">{dl.t}</h4>
//                     <span className="text-[11px] font-medium text-gray-400 mt-0.5 block">{dl.dept}</span>
//                   </div>
//                 </div>
//                 <span className={`text-xs font-black whitespace-nowrap ${dl.style}`}>{dl.remain}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>

//       {/* RIGHT SIDEBAR CONTAINER PANEL ROW */}
//       <div className="space-y-8">
        
//         {/* CARD A: STUDY STREAK */}
//         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5">
//           <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
//             <Flame className="w-5 h-5 text-orange-500 fill-orange-500" /> Study Streak
//           </h3>
//           <div className="space-y-1">
//             <h4 className="text-3xl font-black text-gray-950">Select Day</h4>
//             <p className="text-xs text-blue-600 font-bold">Currently viewing: {selectedDay}</p>
//           </div>
//           <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-2xl">
//             {streakDays.map((item, idx) => {
//               const isSelected = selectedDay === item.key;
//               return (
//                 <button 
//                   key={idx} 
//                   onClick={() => setSelectedDay(item.key)}
//                   className={`flex flex-col items-center gap-1.5 p-2 rounded-xl cursor-pointer transition transform hover:scale-105 ${isSelected ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-100'}`}
//                   title={`View data for ${item.label}`}
//                 >
//                   <span className={`text-[11px] font-bold ${isSelected ? 'text-white' : 'text-gray-400'}`}>{item.label}</span>
//                   <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'text-white fill-blue-600' : 'text-blue-600 fill-blue-50'}`} />
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* CARD B: SUBJECTS */}
//         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
//           <div className="flex items-center justify-between">
//             <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
//               <BookOpen className="w-4 h-4 text-blue-600" /> Subjects
//             </h3>
//             <button 
//               onClick={() => setShowAllSubjects(!showAllSubjects)} 
//               className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
//             >
//               {showAllSubjects ? 'Show Less' : 'View All'}
//             </button>
//           </div>

//           <div className="space-y-3.5">
//             {displayedSubjects.map((sub, i) => {
//               const SubIcon = sub.icon;
//               return (
//                 <div key={i} className="flex items-center gap-3.5">
//                   <div className={`p-2 rounded-xl ${sub.iconColor}`}><SubIcon className="w-4 h-4" /></div>
//                   <div className="flex-1 space-y-1">
//                     <div className="flex items-center justify-between text-xs font-bold text-gray-800">
//                       <span className="truncate max-w-[140px]">{sub.name}</span>
//                       <span>{sub.progress}%</span>
//                     </div>
//                     <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
//                       <div className={`h-full ${sub.style}`} style={{ width: `${sub.progress}%` }} />
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* CARD C: QUICK ACTIONS */}
//         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
//           <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
//             <Sparkles className="w-4 h-4 text-blue-600" /> Quick Actions
//           </h3>
//           <div className="space-y-1">
//             {[
//               { t: 'Create New Task', target: 'tasks', i: '📝' },
//               { t: 'Add New Subject', target: 'subjects', i: '📘' },
//               { t: 'Set Study Goal', target: 'goals', i: '🎯' },
//               { t: 'Import Calendar', target: 'schedule', i: '📅' }
//             ].map((act, index) => (
//               <button 
//                 key={index} 
//                 onClick={() => handleQuickAction(act.target)}
//                 className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition text-xs font-bold text-gray-700 text-left border-none bg-transparent"
//               >
//                 <span className="flex items-center gap-2"><span>{act.i}</span> {act.t}</span>
//                 <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* CARD D: STUDY TIPS */}
//         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
//           <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
//             <AlertCircle className="w-4 h-4 text-blue-600" /> Study Tips
//           </h3>
//           <div className="flex items-center gap-4 bg-blue-50/20 border border-blue-50 p-4 rounded-2xl">
//             <div className="flex-1 space-y-1">
//               <span className="text-xs font-extrabold text-blue-600 block">{studyTips[currentTipIndex].title}</span>
//               <p className="text-xs text-gray-600 font-medium leading-relaxed">{studyTips[currentTipIndex].text}</p>
//             </div>
//           </div>
//           <div className="flex items-center justify-between pt-1">
//             <button onClick={prevTip} className="p-1 rounded-lg hover:bg-slate-50 text-gray-400 cursor-pointer"><ChevronLeft className="w-4 h-4" /></button>
//             <div className="flex gap-1">
//               {studyTips.map((_, i) => (
//                 <span 
//                   key={i} 
//                   className={`w-1.5 h-1.5 rounded-full ${i === currentTipIndex ? 'bg-blue-600' : 'bg-slate-200'}`} 
//                 />
//               ))}
//             </div>
//             <button onClick={nextTip} className="p-1 rounded-lg hover:bg-slate-50 text-gray-400 cursor-pointer"><ChevronRight className="w-4 h-4" /></button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Plus, Flame, CheckCircle2, BookOpen,
  Database, Cpu, SquareEqual, CircleDot, ChevronRight,
  TrendingUp, AlertCircle, Sparkles, ChevronLeft, MoreHorizontal, X
} from 'lucide-react';

export default function Overview() {
  const navigate = useNavigate();

  // Helper: Get current day abbreviation (e.g., 'Mon', 'Tue')
  const daysMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayObj = new Date();
  const currentDayKey = daysMap[todayObj.getDay()];

  // State for adding a new task form visibility and inputs
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('08:00 PM – 09:00 PM');
  const [newTaskDept, setNewTaskDept] = useState('General');

  // View All toggle states
  const [showAllDeadlines, setShowAllDeadlines] = useState(false);
  const [showAllSubjects, setShowAllSubjects] = useState(false);

  // Study Tips carousel state
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const studyTips = [
    { title: 'Focus Tip', text: 'Study in focused blocks of 25–50 minutes and take short breaks.' },
    { title: 'Active Recall', text: 'Test yourself on the material instead of just re-reading notes.' },
    { title: 'The Feynman Tech', text: 'Explain complex concepts out loud in simple terms to verify understanding.' }
  ];

  // Selected Day State (Defaults to Today)
  const [selectedDay, setSelectedDay] = useState(currentDayKey);
  
  // Dynamically generate dates for the current week (Sun - Sat)
  const getFormattedDateForDay = (targetDayIndex) => {
    const currentDayIndex = todayObj.getDay();
    const diff = targetDayIndex - currentDayIndex;
    const targetDate = new Date();
    targetDate.setDate(todayObj.getDate() + diff);
    return targetDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Dynamic daily schedule map driven by actual calendar dates
  const [dailyData, setDailyData] = useState({
    Sun: { date: getFormattedDateForDay(0), completedCount: 0, totalHours: '0.0', schedules: [{ id: 601, time: '—', task: 'Rest & Recovery Day', dept: 'Off', status: 'Rest', style: 'bg-gray-100 text-gray-400', icon: CircleDot, iconBg: 'bg-gray-100 text-gray-400' }] },
    Mon: { date: getFormattedDateForDay(1), completedCount: 4, totalHours: '2.5', schedules: [{ id: 101, time: '10:00 AM – 11:30 AM', task: 'Physics Mechanics', dept: 'Engineering Physics', status: 'Completed', style: 'bg-green-50 text-green-600', icon: BookOpen, iconBg: 'bg-green-100 text-green-600' }] },
    Tue: { date: getFormattedDateForDay(2), completedCount: 5, totalHours: '3.5', schedules: [{ id: 1, time: '09:00 AM – 10:30 AM', task: 'Data Structures', dept: 'Computer Science', status: 'In Progress', style: 'bg-blue-50 text-blue-600', icon: BookOpen, iconBg: 'bg-purple-100 text-purple-600' }] },
    Wed: { date: getFormattedDateForDay(3), completedCount: 6, totalHours: '4.0', schedules: [{ id: 201, time: '09:30 AM – 11:00 AM', task: 'Algorithms Analysis', dept: 'Computer Science', status: 'Completed', style: 'bg-green-50 text-green-600', icon: BookOpen, iconBg: 'bg-blue-100 text-blue-600' }] },
    Thu: { date: getFormattedDateForDay(4), completedCount: 5, totalHours: '3.5', schedules: [{ id: 301, time: '10:00 AM – 12:00 PM', task: 'System Architecture', dept: 'Computer Science', status: 'Completed', style: 'bg-green-50 text-green-600', icon: Cpu, iconBg: 'bg-green-100 text-green-600' }] },
    Fri: { date: getFormattedDateForDay(5), completedCount: 7, totalHours: '4.5', schedules: [{ id: 401, time: '08:00 AM – 10:00 AM', task: 'Full Stack Sprint', dept: 'Project Work', status: 'Completed', style: 'bg-green-50 text-green-600', icon: Database, iconBg: 'bg-blue-100 text-blue-600' }] },
    Sat: { date: getFormattedDateForDay(6), completedCount: 3, totalHours: '2.5', schedules: [{ id: 501, time: '11:00 AM – 01:00 PM', task: 'Weekly Contest', dept: 'Competitive Coding', status: 'Completed', style: 'bg-green-50 text-green-600', icon: SquareEqual, iconBg: 'bg-yellow-100 text-yellow-600' }] }
  });

  const streakDays = [
    { label: 'Mon', key: 'Mon' },
    { label: 'Tue', key: 'Tue' },
    { label: 'Wed', key: 'Wed' },
    { label: 'Thu', key: 'Thu' },
    { label: 'Fri', key: 'Fri' },
    { label: 'Sat', key: 'Sat' },
    { label: 'Sun', key: 'Sun' }
  ];

  const trackedSubjects = [
    { name: 'Data Structures', progress: 75, style: 'bg-blue-600', icon: BookOpen, iconColor: 'text-green-500 bg-green-50' },
    { name: 'Database Management', progress: 60, style: 'bg-blue-600', icon: Database, iconColor: 'text-blue-500 bg-blue-50' },
    { name: 'Operating Systems', progress: 50, style: 'bg-blue-600', icon: Cpu, iconColor: 'text-orange-500 bg-orange-50' },
    { name: 'Engineering Mathematics', progress: 40, style: 'bg-blue-600', icon: SquareEqual, iconColor: 'text-purple-500 bg-purple-50' },
    { name: 'Aptitude', progress: 30, style: 'bg-blue-600', icon: CircleDot, iconColor: 'text-red-400 bg-red-50' }
  ];

  const barProgress = [
    { label: 'Mon', h: 'h-[50px]', val: '2.5h' },
    { label: 'Tue', h: 'h-[70px]', val: '3.5h' },
    { label: 'Wed', h: 'h-[85px]', val: '4.0h' },
    { label: 'Thu', h: 'h-[70px]', val: '3.5h' },
    { label: 'Fri', h: 'h-[95px]', val: '4.5h' },
    { label: 'Sat', h: 'h-[55px]', val: '2.5h' },
    { label: 'Sun', h: 'h-[8px]', val: '-' },
  ];

  // Helper function to calculate relative days left from current system date
  const getRelativeDeadline = (targetDateStr) => {
    const target = new Date(targetDateStr);
    const diffTime = target - new Date().setHours(0,0,0,0);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { remain: 'Overdue', style: 'text-gray-400' };
    if (diffDays === 0) return { remain: 'Due Today', style: 'text-red-600' };
    if (diffDays === 1) return { remain: '1 Day Left', style: 'text-red-500' };
    return { remain: `${diffDays} Days Left`, style: diffDays <= 3 ? 'text-red-500' : diffDays <= 6 ? 'text-amber-500' : 'text-green-600' };
  };

  // Base list utilizing relative dynamic offsets (e.g., setting future dates relative to current year/month)
  const currentYear = todayObj.getFullYear();
  const currentMonthNum = todayObj.getMonth();
  
  const finalDeadlines = [
    { d: '25', m: 'THIS MONTH', t: 'Data Structures Assignment', dept: 'Computer Science', dateObj: new Date(currentYear, currentMonthNum, todayObj.getDate() + 2) },
    { d: '28', m: 'THIS MONTH', t: 'Database Management Quiz', dept: 'Computer Science', dateObj: new Date(currentYear, currentMonthNum, todayObj.getDate() + 5) },
    { d: '02', m: 'NEXT MONTH', t: 'Operating Systems Project', dept: 'Computer Science', dateObj: new Date(currentYear, currentMonthNum, todayObj.getDate() + 10) },
    { d: '05', m: 'NEXT MONTH', t: 'Mathematics (DAA) Test', dept: 'Engineering Mathematics', dateObj: new Date(currentYear, currentMonthNum, todayObj.getDate() + 13) },
  ].map(item => {
    const calc = getRelativeDeadline(item.dateObj);
    return {
      ...item,
      d: item.dateObj.getDate().toString().padStart(2, '0'),
      m: item.dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      remain: calc.remain,
      style: calc.style
    };
  });

  const nextTip = () => setCurrentTipIndex((prev) => (prev + 1) % studyTips.length);
  const prevTip = () => setCurrentTipIndex((prev) => (prev - 1 + studyTips.length) % studyTips.length);

  const handleQuickAction = (pageTarget) => {
    navigate(`/planner/${pageTarget}`);
  };

  const handleAddTaskSubmit = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask = {
      id: Date.now(),
      time: newTaskTime,
      task: newTaskText,
      dept: newTaskDept,
      status: 'Pending',
      style: 'bg-amber-50 text-amber-600',
      icon: BookOpen,
      iconBg: 'bg-blue-100 text-blue-600'
    };

    setDailyData((prevData) => {
      const currentDaySchedules = prevData[selectedDay].schedules;
      return {
        ...prevData,
        [selectedDay]: {
          ...prevData[selectedDay],
          completedCount: prevData[selectedDay].completedCount + 1,
          schedules: [newTask, ...currentDaySchedules]
        }
      };
    });

    setNewTaskText('');
    setIsAddingTask(false);
  };

  const displayedDeadlines = showAllDeadlines ? finalDeadlines : finalDeadlines.slice(0, 3);
  const displayedSubjects = showAllSubjects ? trackedSubjects : trackedSubjects.slice(0, 4);
  const activeDayData = dailyData[selectedDay];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
      
      {/* LEFT PRIMARY CONTAINER ROW */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* WIDGET 1: SELECTED DAY'S PLAN */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">📅</span> {selectedDay}'s Plan
              </h3>
              <p className="text-xs font-bold text-blue-600">{activeDayData.date}</p>
            </div>
            <button 
              onClick={() => setIsAddingTask(!isAddingTask)} 
              className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-xl transition hover:bg-blue-100 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> {isAddingTask ? 'Close Form' : 'Add Task'}
            </button>
          </div>

          {isAddingTask && (
            <form onSubmit={handleAddTaskSubmit} className="bg-slate-50 border border-blue-100 p-4 rounded-2xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold text-blue-700">Add to {selectedDay}'s Schedule</span>
                <button type="button" onClick={() => setIsAddingTask(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <input 
                type="text" 
                placeholder="Enter task name" 
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                className="w-full text-xs font-medium p-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                required
              />
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="text" 
                  placeholder="Time slot" 
                  value={newTaskTime}
                  onChange={(e) => setNewTaskTime(e.target.value)}
                  className="text-xs font-medium p-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                />
                <input 
                  type="text" 
                  placeholder="Department / Subject" 
                  value={newTaskDept}
                  onChange={(e) => setNewTaskDept(e.target.value)}
                  className="text-xs font-medium p-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                />
              </div>
              <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition cursor-pointer">
                Save Task
              </button>
            </form>
          )}

          <div className="space-y-3">
            {activeDayData.schedules.map((item) => {
              const ItemIcon = item.icon || BookOpen;
              return (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl border border-gray-50 bg-white shadow-sm gap-3 hover:border-gray-200 transition">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-gray-400 w-36 whitespace-nowrap">{item.time}</span>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${item.iconBg}`}>
                      <ItemIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 leading-tight">{item.task}</h4>
                      <span className="text-[11px] font-medium text-gray-400 mt-0.5 block">{item.dept}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4 ml-auto">
                    <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full ${item.style}`}>{item.status}</span>
                    <button className="text-gray-400 hover:text-gray-600 p-1"><MoreHorizontal className="w-4 h-4" /></button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* WIDGET 2: WEEKLY STUDY PROGRESS */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">📈</span> Weekly Study Progress
            </h3>
            <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-xl">Viewing: {selectedDay}</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-50/40 p-4 rounded-2xl">
            <div className="relative w-32 h-32 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="#2563eb" strokeWidth="3" strokeDasharray="68 100" strokeLinecap="round" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-black text-gray-800">{activeDayData.totalHours}h</span>
                <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase">{selectedDay} Study</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-gray-400 font-bold block">Recorded Hours ({selectedDay})</span>
              <h4 className="text-2xl font-black text-gray-900">{activeDayData.totalHours} <span className="text-sm text-gray-400 font-medium">hrs studied</span></h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed mt-1">{activeDayData.completedCount} tasks processed/logged on this day.</p>
            </div>
          </div>

          <div className="flex items-end justify-between h-32 pt-4 px-2">
            {barProgress.map((day, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 space-y-2">
                <span className="text-[10px] font-bold text-gray-400">{day.val}</span>
                <div className={`w-6 sm:w-8 ${day.h} bg-blue-600 rounded-lg transition hover:bg-blue-700`} />
                <span className={`text-xs font-bold ${day.label === currentDayKey ? 'text-blue-600 underline' : 'text-gray-400'}`}>{day.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* WIDGET 3: UPCOMING DEADLINES */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">📅</span> Upcoming Deadlines
            </h3>
            <button 
              onClick={() => setShowAllDeadlines(!showAllDeadlines)} 
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              {showAllDeadlines ? 'Show Less' : 'View All'}
            </button>
          </div>

          <div className="space-y-3">
            {displayedDeadlines.map((dl, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-2xl border border-gray-50 hover:border-gray-100 bg-white shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50/60 rounded-xl p-2 w-12 h-12 flex flex-col items-center justify-center border border-blue-50">
                    <span className="text-base font-black text-blue-700 leading-none">{dl.d}</span>
                    <span className="text-[9px] font-bold text-blue-400 mt-0.5 leading-none">{dl.m}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 leading-tight">{dl.t}</h4>
                    <span className="text-[11px] font-medium text-gray-400 mt-0.5 block">{dl.dept}</span>
                  </div>
                </div>
                <span className={`text-xs font-black whitespace-nowrap ${dl.style}`}>{dl.remain}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RIGHT SIDEBAR CONTAINER PANEL ROW */}
      <div className="space-y-8">
        
        {/* CARD A: STUDY STREAK */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" /> Study Streak
          </h3>
          <div className="space-y-1">
            <h4 className="text-3xl font-black text-gray-950">Select Day</h4>
            <p className="text-xs text-blue-600 font-bold">Currently viewing: {selectedDay} {selectedDay === currentDayKey && '(Today)'}</p>
          </div>
          <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-2xl">
            {streakDays.map((item, idx) => {
              const isSelected = selectedDay === item.key;
              const isToday = item.key === currentDayKey;
              return (
                <button 
                  key={idx} 
                  onClick={() => setSelectedDay(item.key)}
                  className={`flex flex-col items-center gap-1.5 p-2 rounded-xl cursor-pointer transition transform hover:scale-105 ${isSelected ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-100'}`}
                  title={`View data for ${item.label}`}
                >
                  <span className={`text-[11px] font-bold ${isSelected ? 'text-white' : isToday ? 'text-blue-600 font-extrabold' : 'text-gray-400'}`}>{item.label}</span>
                  <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'text-white fill-blue-600' : 'text-blue-600 fill-blue-50'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* CARD B: SUBJECTS */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" /> Subjects
            </h3>
            <button 
              onClick={() => setShowAllSubjects(!showAllSubjects)} 
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              {showAllSubjects ? 'Show Less' : 'View All'}
            </button>
          </div>

          <div className="space-y-3.5">
            {displayedSubjects.map((sub, i) => {
              const SubIcon = sub.icon;
              return (
                <div key={i} className="flex items-center gap-3.5">
                  <div className={`p-2 rounded-xl ${sub.iconColor}`}><SubIcon className="w-4 h-4" /></div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-gray-800">
                      <span className="truncate max-w-[140px]">{sub.name}</span>
                      <span>{sub.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full ${sub.style}`} style={{ width: `${sub.progress}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CARD C: QUICK ACTIONS */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" /> Quick Actions
          </h3>
          <div className="space-y-1">
            {[
              { t: 'Create New Task', target: 'tasks', i: '📝' },
              { t: 'Add New Subject', target: 'subjects', i: '📘' },
              { t: 'Set Study Goal', target: 'goals', i: '🎯' },
              { t: 'Import Calendar', target: 'schedule', i: '📅' }
            ].map((act, index) => (
              <button 
                key={index} 
                onClick={() => handleQuickAction(act.target)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition text-xs font-bold text-gray-700 text-left border-none bg-transparent"
              >
                <span className="flex items-center gap-2"><span>{act.i}</span> {act.t}</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* CARD D: STUDY TIPS */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600" /> Study Tips
          </h3>
          <div className="flex items-center gap-4 bg-blue-50/20 border border-blue-50 p-4 rounded-2xl">
            <div className="flex-1 space-y-1">
              <span className="text-xs font-extrabold text-blue-600 block">{studyTips[currentTipIndex].title}</span>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">{studyTips[currentTipIndex].text}</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <button onClick={prevTip} className="p-1 rounded-lg hover:bg-slate-50 text-gray-400 cursor-pointer"><ChevronLeft className="w-4 h-4" /></button>
            <div className="flex gap-1">
              {studyTips.map((_, i) => (
                <span 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-full ${i === currentTipIndex ? 'bg-blue-600' : 'bg-slate-200'}`} 
                />
              ))}
            </div>
            <button onClick={nextTip} className="p-1 rounded-lg hover:bg-slate-50 text-gray-400 cursor-pointer"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>

      </div>
    </div>
  );
}