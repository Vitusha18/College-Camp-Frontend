import React, { useState } from 'react';
import { 
  Plus, 
  X, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Tag, 
  Trash2, 
  Calendar, 
  Filter, 
  ListTodo, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function Tasks() {
  const [activeSection, setActiveSection] = useState('Today'); // 'Today', 'Upcoming', 'Completed'
  const [statusFilter, setStatusFilter] = useState('All');     // 'All', 'To Do', 'In Progress', 'Completed'

  // Modal State
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Academic');
  const [newTaskDue, setNewTaskDue] = useState('Today, 5:00 PM');
  const [newTaskColorType, setNewTaskColorType] = useState('indigo');
  const [newTaskSection, setNewTaskSection] = useState('Today'); // 'Today' or 'Upcoming'

  const colorThemeMap = {
    indigo: { badge: 'bg-indigo-50 border-indigo-200 text-indigo-900', dot: 'bg-indigo-500', bgClass: 'bg-indigo-500' },
    emerald: { badge: 'bg-emerald-50 border-emerald-200 text-emerald-900', dot: 'bg-emerald-500', bgClass: 'bg-emerald-500' },
    amber: { badge: 'bg-amber-50 border-amber-200 text-amber-900', dot: 'bg-amber-400', bgClass: 'bg-amber-400' },
    purple: { badge: 'bg-purple-50 border-purple-200 text-purple-900', dot: 'bg-purple-500', bgClass: 'bg-purple-500' },
    rose: { badge: 'bg-rose-50 border-rose-200 text-rose-900', dot: 'bg-rose-500', bgClass: 'bg-rose-500' }
  };

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Finish Database Systems Project',
      description: 'Implement SQL queries and relational model diagrams.',
      category: 'Academic',
      due: 'Today, 11:59 PM',
      status: 'In Progress',
      section: 'Today',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-900',
      dotColor: 'bg-indigo-500'
    },
    {
      id: 2,
      title: 'Review Data Structures Lecture',
      description: 'Go over balanced binary search trees and traversals.',
      category: 'Study',
      due: 'Today, 4:00 PM',
      status: 'To Do',
      section: 'Today',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      dotColor: 'bg-emerald-500'
    },
    {
      id: 3,
      title: 'Hackathon Submission Prep',
      description: 'Deploy backend code and finalize user documentation.',
      category: 'Project',
      due: 'Tomorrow, 2:00 PM',
      status: 'To Do',
      section: 'Upcoming',
      color: 'bg-amber-50 border-amber-200 text-amber-900',
      dotColor: 'bg-amber-400'
    },
    {
      id: 4,
      title: 'Operating Systems Quiz',
      description: 'Read chapters on virtual memory and paging.',
      category: 'Academic',
      due: 'Friday, 10:00 AM',
      status: 'To Do',
      section: 'Upcoming',
      color: 'bg-purple-50 border-purple-200 text-purple-900',
      dotColor: 'bg-purple-500'
    },
    {
      id: 5,
      title: 'Setup Development Environment',
      description: 'Install required node modules and environment variables.',
      category: 'Development',
      due: 'Yesterday',
      status: 'Completed',
      section: 'Completed',
      color: 'bg-slate-100 border-slate-200 text-slate-500 line-through',
      dotColor: 'bg-slate-400'
    }
  ]);

  // Handle adding task submission
  const handleAddTaskSubmit = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const chosenTheme = colorThemeMap[newTaskColorType] || colorThemeMap.indigo;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      description: newTaskDesc,
      category: newTaskCategory,
      due: newTaskDue,
      status: 'To Do',
      section: newTaskSection,
      color: chosenTheme.badge,
      dotColor: chosenTheme.dot
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setNewTaskDesc('');
    setIsAddTaskOpen(false);
  };

  // Toggle status cycling: To Do -> In Progress -> Completed -> To Do
  const handleToggleStatus = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        let nextStatus = 'To Do';
        let nextSection = task.section;
        let styleOverride = task.color;

        if (task.status === 'To Do') {
          nextStatus = 'In Progress';
        } else if (task.status === 'In Progress') {
          nextStatus = 'Completed';
          nextSection = 'Completed';
        } else {
          nextStatus = 'To Do';
          nextSection = 'Today';
        }
        return { ...task, status: nextStatus, section: nextSection };
      }
      return task;
    }));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Filter logic across section and status
  const filteredTasks = tasks.filter(task => {
    const matchesSection = activeSection === 'Completed' 
      ? task.status === 'Completed' 
      : task.section === activeSection && task.status !== 'Completed';

    const matchesStatus = statusFilter === 'All' ? true : task.status === statusFilter;

    return matchesSection && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <ListTodo className="w-8 h-8 text-indigo-600" /> Tasks Dashboard
            </h1>
            <p className="text-slate-500 text-sm mt-1">Organize your assignments, projects, and daily goals efficiently.</p>
          </div>

          <button 
            onClick={() => setIsAddTaskOpen(true)}
            className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition cursor-pointer self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>

        {/* Section Navigation Tabs & Status Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
          
          {/* Main Sections */}
          <div className="flex bg-slate-100/80 p-1 rounded-xl overflow-x-auto">
            {['Today', 'Upcoming', 'Completed'].map((sec) => (
              <button
                key={sec}
                onClick={() => { setActiveSection(sec); setStatusFilter('All'); }}
                className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeSection === sec 
                    ? 'bg-indigo-600 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          {/* Filters by State */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 shrink-0 pl-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {['All', 'To Do', 'In Progress', 'Completed'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition cursor-pointer whitespace-nowrap ${
                  statusFilter === st 
                    ? 'bg-slate-900 text-white border-slate-900' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Task List Grid Container */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm min-h-[400px]">
          <div className="border-b border-slate-100 pb-4 mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" /> {activeSection} Tasks
            </h2>
            <span className="text-xs font-semibold bg-slate-100 px-2.5 py-1 rounded-full text-slate-600">
              {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400">
              <AlertCircle className="w-10 h-10 mb-2 opacity-40 text-indigo-600" />
              <p className="text-sm font-medium">No tasks found matching your filters.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`border rounded-2xl p-4 sm:p-5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${task.color}`}
                >
                  <div className="flex items-start space-x-3.5 flex-1">
                    <button 
                      onClick={() => handleToggleStatus(task.id)}
                      className="mt-0.5 text-slate-400 hover:text-indigo-600 transition cursor-pointer shrink-0"
                    >
                      {task.status === 'Completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 flex-wrap gap-y-1 mb-1">
                        <span className={`w-2 h-2 rounded-full ${task.dotColor}`}></span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-white/60 rounded">
                          {task.category}
                        </span>
                        <span className="text-[11px] font-semibold opacity-75 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {task.due}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          task.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                          task.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200/70 text-slate-700'
                        }`}>
                          {task.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold tracking-tight">{task.title}</h4>
                      <p className="text-xs opacity-80 mt-1">{task.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <button 
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-rose-400 hover:text-rose-600 p-2 rounded-xl hover:bg-rose-50 transition cursor-pointer"
                      title="Delete Task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal for Creating New Task */}
        {isAddTaskOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs px-4">
            <div className="bg-white w-full max-w-md rounded-3xl border border-slate-100 shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-xl">✨</span> Create New Task
                </h3>
                <button onClick={() => setIsAddTaskOpen(false)} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddTaskSubmit} className="space-y-4 text-xs font-semibold">
                <div className="space-y-1.5">
                  <label className="text-slate-600 flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-indigo-600" /> Task Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Complete Lab Report" 
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-indigo-600"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-600">Description</label>
                  <textarea 
                    placeholder="Add brief details about the task..." 
                    value={newTaskDesc}
                    onChange={(e) => setNewTaskDesc(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-indigo-600 h-20 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-slate-600">Category Tag</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Academic" 
                      value={newTaskCategory}
                      onChange={(e) => setNewTaskCategory(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-indigo-600"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-600">Due Date / Time</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Today, 5:00 PM" 
                      value={newTaskDue}
                      onChange={(e) => setNewTaskDue(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-600">Assign Section</label>
                  <div className="flex gap-2">
                    {['Today', 'Upcoming'].map((sec) => (
                      <button
                        key={sec}
                        type="button"
                        onClick={() => setNewTaskSection(sec)}
                        className={`flex-1 py-2 rounded-xl border text-xs cursor-pointer font-bold ${
                          newTaskSection === sec ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        {sec}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-600 block">Theme Highlight Color</label>
                  <div className="flex items-center gap-3 py-1">
                    {Object.keys(colorThemeMap).map((colorKey) => {
                      const theme = colorThemeMap[colorKey];
                      const isSelected = newTaskColorType === colorKey;
                      return (
                        <button
                          key={colorKey}
                          type="button"
                          onClick={() => setNewTaskColorType(colorKey)}
                          className={`w-8 h-8 rounded-xl ${theme.bgClass} cursor-pointer transition transform hover:scale-105 flex items-center justify-center ${
                            isSelected ? 'ring-2 ring-indigo-600 ring-offset-2 scale-110 shadow-xs' : 'opacity-70 hover:opacity-100'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsAddTaskOpen(false)}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                  >
                    Save Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}