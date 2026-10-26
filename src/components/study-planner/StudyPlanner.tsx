import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { StudyTask, Priority, TaskCategory } from '../../types';
import {
  CalendarDays,
  CheckSquare,
  Plus,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Clock,
  BookOpen,
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react';

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function taskDateKey(value: string): string {
  return value.split('T')[0];
}

export const StudyPlanner: React.FC = () => {
  const { tasks, toggleTask, addTask, deleteTask } = useApp();

  const [activeView, setActiveView] = useState<'Daily' | 'Weekly' | 'Calendar'>('Daily');
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<boolean>(false);

  const currentMonthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const currentDayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  const selectedDateNum = currentDate.getDate();
  const selectedDateStr = `${selectedDateNum} ${currentMonthName.split(' ')[0]}`;

  const weekStartDate = new Date(currentDate);
  weekStartDate.setDate(weekStartDate.getDate() - ((weekStartDate.getDay() + 6) % 7));
  const weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekEndDate.getDate() + 6);
  const weekStartISO = toDateKey(weekStartDate);
  const weekEndISO = toDateKey(weekEndDate);
  const weekStartStr = `${weekStartDate.getDate()} ${weekStartDate.toLocaleDateString('en-US', { month: 'long' })}`;
  const weekEndStr = `${weekEndDate.getDate()} ${weekEndDate.toLocaleDateString('en-US', { month: 'long' })}`;

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newDueDate, setNewDueDate] = useState(() => toDateKey(new Date()));
  const [newDueText, setNewDueText] = useState('Due Today');
  const [newPriority, setNewPriority] = useState<Priority>('Medium');
  const [newCategory, setNewCategory] = useState<TaskCategory>('Assignment');
  const [newEstimatedMinutes, setNewEstimatedMinutes] = useState<number>(60);
  const [newNotes, setNewNotes] = useState('');

  // Stats calculation over filtered tasks
  const selectedDateISO = toDateKey(currentDate);
  const currentMonthISO = selectedDateISO.substring(0, 7);

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      if (activeView === 'Daily') return taskDateKey(t.dueDate) === selectedDateISO;
      if (activeView === 'Calendar') return t.dueDate.startsWith(currentMonthISO);

      const taskDate = taskDateKey(t.dueDate);
      return taskDate >= weekStartISO && taskDate <= weekEndISO;
    }).sort((a, b) => taskDateKey(a.dueDate).localeCompare(taskDateKey(b.dueDate)));
  }, [tasks, activeView, selectedDateISO, currentMonthISO, weekStartISO, weekEndISO]);

  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDueDate) return;

    try {
      await addTask({
        title: newTitle.trim(),
        subject: newSubject.trim() || 'General Academic',
        dueDate: newDueDate,
        dueText: newDueText,
        priority: newPriority,
        category: newCategory,
        estimatedMinutes: newEstimatedMinutes,
        notes: newNotes.trim(),
      });

      setNewTitle('');
      setNewSubject('');
      setNewNotes('');
      setIsAddTaskModalOpen(false);
    } catch {
      // The shared task action displays the API error and leaves the form available for retry.
    }
  };

  const navigateDate = (direction: -1 | 1) => {
    if (activeView === 'Calendar') {
      setCurrentDate((date) => {
        const targetMonth = new Date(date.getFullYear(), date.getMonth() + direction, 1);
        const lastDay = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0).getDate();
        targetMonth.setDate(Math.min(date.getDate(), lastDay));
        return targetMonth;
      });
      return;
    }

    setCurrentDate((date) => {
      const next = new Date(date);
      next.setDate(next.getDate() + direction * (activeView === 'Weekly' ? 7 : 1));
      return next;
    });
  };

  const navigateMonth = (direction: -1 | 1) => {
    setCurrentDate((date) => {
      const targetMonth = new Date(date.getFullYear(), date.getMonth() + direction, 1);
      const lastDay = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0).getDate();
      targetMonth.setDate(Math.min(date.getDate(), lastDay));
      return targetMonth;
    });
  };

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); // 0 is Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // adjust for Monday start
    const startingBlankDays = firstDay === 0 ? 6 : firstDay - 1;

    const days: (number | null)[] = [];
    for (let i = 0; i < startingBlankDays; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    while (days.length % 7 !== 0) days.push(null);
    return days;
  }, [currentDate]);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner with View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Study Planner</h2>
          <p className="text-xs text-slate-500">
            Organize daily tasks, track assignments, and schedule exam revisions efficiently.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold">
            {(['Daily', 'Weekly', 'Calendar'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`px-3.5 py-1.5 rounded-lg transition-all ${activeView === view
                  ? 'bg-white text-indigo-600 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                {view} View
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsAddTaskModalOpen(true)}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Task
          </button>
        </div>
      </div>

      {/* Main Grid: Left 8 Cols (Tasks & Daily Agenda) + Right 4 Cols (Calendar & Task Stats) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            {/* Date navigation header matching UI screenshot */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-base font-bold text-slate-900">
                  {activeView === 'Daily' && selectedDateStr}
                  {activeView === 'Weekly' && `${weekStartStr} - ${weekEndStr}`}
                  {activeView === 'Calendar' && currentMonthName}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100">
                  {activeView === 'Daily' ? currentDayName : `${activeView} Agenda`}
                </span>
              </div>

              <div className="flex items-center gap-1 text-slate-400">
                <button
                  aria-label={`Previous ${activeView === 'Calendar' ? 'month' : activeView === 'Weekly' ? 'week' : 'day'}`}
                  onClick={() => navigateDate(-1)}
                  className="p-1 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  aria-label={`Next ${activeView === 'Calendar' ? 'month' : activeView === 'Weekly' ? 'week' : 'day'}`}
                  onClick={() => navigateDate(1)}
                  className="p-1 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Task list with checkboxes */}
            <div className="space-y-3">
              {filteredTasks.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No tasks scheduled for {selectedDateStr}. Click "Add Task" to start planning your day.
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 group ${task.completed
                      ? 'bg-slate-50 border-slate-100 opacity-60'
                      : 'bg-white border-slate-200/80 hover:border-indigo-200 hover:shadow-xs'
                      }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        aria-label={`Mark ${task.title} ${task.completed ? 'incomplete' : 'complete'}`}
                        onChange={() => toggleTask(task.id)}
                        className="mt-0.5 w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer"
                      />

                      <div className="min-w-0">
                        <h4
                          className={`text-xs font-bold text-slate-900 truncate ${task.completed ? 'line-through text-slate-400' : ''
                            }`}
                        >
                          {task.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                          <span className="font-medium text-slate-700">{task.subject}</span>
                          <span>•</span>
                          <span className="text-slate-400">{task.dueText}</span>
                          {task.estimatedMinutes && (
                            <>
                              <span>•</span>
                              <span className="text-slate-400 flex items-center gap-0.5">
                                <Clock className="w-3 h-3" /> {task.estimatedMinutes}m
                              </span>
                            </>
                          )}
                        </div>

                        {task.notes && (
                          <p className="text-[10px] text-slate-400 mt-1 italic line-clamp-1">
                            {task.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${task.priority === 'High'
                          ? 'bg-rose-50 text-rose-600 border border-rose-100'
                          : task.priority === 'Medium'
                            ? 'bg-amber-50 text-amber-600 border border-amber-100'
                            : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          }`}
                      >
                        {task.priority}
                      </span>

                      <button
                        onClick={() => deleteTask(task.id)}
                        aria-label={`Delete ${task.title}`}
                        className="p-1 rounded-md text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* Left Column Ending (Banners Removed) */}
          </div>
        </div>

        {/* Right Column: Mini Calendar & Task Stats */}
        <div className="lg:col-span-4 space-y-5">
          {/* Mini Calendar Box matching UI screenshot */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">{currentMonthName}</span>
              <div className="flex items-center gap-1 text-slate-400">
                <button
                  aria-label="Previous calendar month"
                  onClick={() => navigateMonth(-1)}
                  className="p-1 hover:text-slate-700 rounded hover:bg-slate-100"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  aria-label="Next calendar month"
                  onClick={() => navigateMonth(1)}
                  className="p-1 hover:text-slate-700 rounded hover:bg-slate-100"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="bg-slate-50/60 p-2.5 rounded-xl border border-slate-100">
              <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 mb-1.5">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {calendarDays.map((day, idx) => {
                  if (!day) return <div key={`empty-${idx}`} className="h-7" />;
                  const isSelected = day === selectedDateNum;
                  return (
                    <button
                      key={`day-${day}`}
                      aria-label={`${currentDate.toLocaleDateString('en-US', { month: 'long' })} ${day}`}
                      aria-pressed={isSelected}
                      onClick={() => {
                        const newD = new Date(currentDate);
                        newD.setDate(day);
                        setCurrentDate(newD);
                      }}
                      className={`h-7 w-7 mx-auto rounded-full flex items-center justify-center text-[11px] font-medium transition-all ${isSelected
                        ? 'bg-indigo-600 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-200/60'
                        }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Task Stats Box matching UI screenshot */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Task Stats
            </h3>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-lg font-extrabold text-slate-900 block">{totalTasks}</span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Total</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                <span className="text-lg font-extrabold text-emerald-700 block">{completedTasks}</span>
                <span className="text-[10px] font-semibold text-emerald-600 uppercase">Completed</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100">
                <span className="text-lg font-extrabold text-amber-700 block">{pendingTasks}</span>
                <span className="text-[10px] font-semibold text-amber-600 uppercase">Pending</span>
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-600">{activeView} Completion</span>
                <span className="text-indigo-600 font-bold">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {isAddTaskModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsAddTaskModalOpen(false)} />

          <div role="dialog" aria-modal="true" aria-labelledby="study-task-title" className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in fade-in zoom-in-95">
            <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white p-5 flex items-center justify-between">
              <h3 id="study-task-title" className="text-sm font-bold text-white flex items-center gap-2">
                <CalendarDays className="w-4 h-4" /> Add Study Task
              </h3>
              <button type="button" aria-label="Close add task dialog" onClick={() => setIsAddTaskModalOpen(false)} className="text-white/70 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="p-5 space-y-3.5">
              <div>
                <label htmlFor="study-task-title-input" className="block text-xs font-bold text-slate-700 mb-1">Task Title *</label>
                <input
                  id="study-task-title-input"
                  type="text"
                  required
                  maxLength={200}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. DBMS Normalization Assignment"
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="study-task-subject" className="block text-xs font-bold text-slate-700 mb-1">Subject / Course</label>
                <input
                  id="study-task-subject"
                  type="text"
                  maxLength={120}
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. Database Management Systems"
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="study-task-due-date" className="block text-xs font-bold text-slate-700 mb-1">Due Date</label>
                  <input
                    id="study-task-due-date"
                    type="date"
                    required
                    value={newDueDate}
                    onChange={(e) => {
                      setNewDueDate(e.target.value);
                      setNewDueText(e.target.value ? `Due ${e.target.value}` : '');
                    }}
                    className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="study-task-priority" className="block text-xs font-bold text-slate-700 mb-1">Priority</label>
                  <select
                    id="study-task-priority"
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as Priority)}
                    className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="study-task-category" className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    id="study-task-category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as TaskCategory)}
                    className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option value="Assignment">Assignment</option>
                    <option value="Exam">Exam Prep</option>
                    <option value="Project">Project Task</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Study">Self Study</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="study-task-duration" className="block text-xs font-bold text-slate-700 mb-1">Estimated Time</label>
                  <select
                    id="study-task-duration"
                    value={newEstimatedMinutes}
                    onChange={(e) => setNewEstimatedMinutes(Number(e.target.value))}
                    className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option value={30}>30 mins</option>
                    <option value={45}>45 mins</option>
                    <option value={60}>1 hour</option>
                    <option value={90}>1.5 hours</option>
                    <option value={120}>2 hours</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="study-task-notes" className="block text-xs font-bold text-slate-700 mb-1">Notes (Optional)</label>
                <textarea
                  id="study-task-notes"
                  rows={2}
                  maxLength={2000}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Key deliverables, chapter numbers, reference URLs..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all"
              >
                Schedule Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
