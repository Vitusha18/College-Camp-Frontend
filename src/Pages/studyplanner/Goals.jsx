import React, { useState } from 'react';
import { 
  Plus, 
  X, 
  Target, 
  Tag, 
  Trash2, 
  Filter, 
  AlertCircle,
  Percent,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function Goals() {
  const [categoryFilter, setCategoryFilter] = useState('All'); // 'All', 'Academic', 'Personal', 'Career'

  // Modal State
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalDesc, setNewGoalDesc] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState('Academic');
  const [newGoalTargetDate, setNewGoalTargetDate] = useState('End of Semester');
  const [newGoalProgress, setNewGoalProgress] = useState(25);
  const [newGoalColorType, setNewGoalColorType] = useState('indigo');

  const colorThemeMap = {
    indigo: { badge: 'bg-indigo-50 border-indigo-200 text-indigo-900', dot: 'bg-indigo-500', bgClass: 'bg-indigo-500', bar: 'bg-indigo-600' },
    emerald: { badge: 'bg-emerald-50 border-emerald-200 text-emerald-900', dot: 'bg-emerald-500', bgClass: 'bg-emerald-500', bar: 'bg-emerald-500' },
    amber: { badge: 'bg-amber-50 border-amber-200 text-amber-900', dot: 'bg-amber-400', bgClass: 'bg-amber-400', bar: 'bg-amber-500' },
    purple: { badge: 'bg-purple-50 border-purple-200 text-purple-900', dot: 'bg-purple-500', bgClass: 'bg-purple-500', bar: 'bg-purple-600' },
    rose: { badge: 'bg-rose-50 border-rose-200 text-rose-900', dot: 'bg-rose-500', bgClass: 'bg-rose-500', bar: 'bg-rose-500' }
  };

  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'Maintain a 3.8+ GPA',
      description: 'Score above 90% in all midterms and final examinations.',
      category: 'Academic',
      targetDate: 'End of Semester',
      progress: 80,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      dotColor: 'bg-emerald-500',
      progressBar: 'bg-emerald-500'
    },
    {
      id: 2,
      title: 'Contribute to Open Source',
      description: 'Make at least 5 pull requests to major developer repositories.',
      category: 'Career',
      targetDate: 'Summer 2026',
      progress: 40,
      color: 'bg-indigo-50 border-indigo-200 text-indigo-900',
      dotColor: 'bg-indigo-500',
      progressBar: 'bg-indigo-600'
    },
    {
      id: 3,
      title: 'Learn Advanced TypeScript',
      description: 'Master generics, conditional types, and utility types.',
      category: 'Personal',
      targetDate: 'Next Month',
      progress: 60,
      color: 'bg-amber-50 border-amber-200 text-amber-900',
      dotColor: 'bg-amber-400',
      progressBar: 'bg-amber-500'
    },
    {
      id: 4,
      title: 'Read 12 Technical Books',
      description: 'Focus on system design, clean code, and database architecture.',
      category: 'Personal',
      targetDate: 'Year End',
      progress: 25,
      color: 'bg-purple-50 border-purple-200 text-purple-900',
      dotColor: 'bg-purple-500',
      progressBar: 'bg-purple-600'
    }
  ]);

  const handleAddGoalSubmit = (e) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    const chosenTheme = colorThemeMap[newGoalColorType] || colorThemeMap.indigo;

    const newGoal = {
      id: Date.now(),
      title: newGoalTitle,
      description: newGoalDesc,
      category: newGoalCategory || 'General',
      targetDate: newGoalTargetDate || 'Soon',
      progress: Number(newGoalProgress) || 0,
      color: chosenTheme.badge,
      dotColor: chosenTheme.dot,
      progressBar: chosenTheme.bar
    };

    setGoals([newGoal, ...goals]);
    setNewGoalTitle('');
    setNewGoalDesc('');
    setNewGoalProgress(25);
    setIsAddGoalOpen(false);
  };

  const handleDeleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const filteredGoals = goals.filter(goal => {
    if (categoryFilter === 'All') return true;
    return goal.category === categoryFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Target className="w-8 h-8 text-indigo-600" /> Goals Tracker
            </h1>
            <p className="text-slate-500 text-sm mt-1">Set, plan, and monitor your personal and academic objectives.</p>
          </div>

          <button 
            onClick={() => setIsAddGoalOpen(true)}
            className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition cursor-pointer self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>New Goal</span>
          </button>
        </div>

        {/* Category Filter Bar */}
        <div className="flex items-center justify-between gap-4 mb-6 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 shrink-0 pl-1">
              <Filter className="w-3.5 h-3.5" /> Category:
            </span>
            {['All', 'Academic', 'Career', 'Personal'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer whitespace-nowrap ${
                  categoryFilter === cat 
                    ? 'bg-slate-900 text-white border-slate-900' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <span className="text-xs font-semibold bg-slate-100 px-3 py-1 rounded-full text-slate-600 hidden sm:inline-block">
            {filteredGoals.length} {filteredGoals.length === 1 ? 'goal' : 'goals'}
          </span>
        </div>

        {/* Goals Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGoals.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-slate-200/80 text-center text-slate-400">
              <AlertCircle className="w-10 h-10 mb-2 opacity-40 text-indigo-600" />
              <p className="text-sm font-medium">No goals found for this category filter.</p>
            </div>
          ) : (
            filteredGoals.map((goal) => (
              <div 
                key={goal.id} 
                className={`border rounded-2xl p-5 shadow-xs transition-all flex flex-col justify-between gap-4 ${goal.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-white/70 rounded-md">
                      {goal.category}
                    </span>
                    <span className={`w-2.5 h-2.5 rounded-full ${goal.dotColor}`}></span>
                  </div>
                  <h3 className="text-base font-bold tracking-tight mb-1">{goal.title}</h3>
                  <p className="text-xs opacity-80 mb-3">{goal.description}</p>
                  
                  {/* Progress Indicator */}
                  <div className="bg-white/60 p-3 rounded-xl border border-black/5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="flex items-center gap-1 opacity-80"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${goal.progressBar || 'bg-indigo-600'}`} 
                        style={{ width: `${Math.min(Math.max(goal.progress, 0), 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-black/5 text-[11px] font-semibold">
                  <span className="opacity-75">Target: {goal.targetDate}</span>
                  <button 
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-white/50 transition cursor-pointer flex items-center gap-1"
                    title="Delete Goal"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Goal Modal */}
        {isAddGoalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs px-4">
            <div className="bg-white w-full max-w-md rounded-3xl border border-slate-100 shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-xl">🎯</span> Create New Goal
                </h3>
                <button onClick={() => setIsAddGoalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddGoalSubmit} className="space-y-4 text-xs font-semibold">
                <div className="space-y-1.5">
                  <label className="text-slate-600 flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-indigo-600" /> Goal Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Master React Performance" 
                    value={newGoalTitle}
                    onChange={(e) => setNewGoalTitle(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-indigo-600"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-600">Description</label>
                  <textarea 
                    placeholder="Describe what you want to achieve..." 
                    value={newGoalDesc}
                    onChange={(e) => setNewGoalDesc(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-indigo-600 h-20 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-slate-600">Category</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Academic" 
                      value={newGoalCategory}
                      onChange={(e) => setNewGoalCategory(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-indigo-600"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-600">Target Timeframe</label>
                    <input 
                      type="text" 
                      placeholder="e.g. End of Semester" 
                      value={newGoalTargetDate}
                      onChange={(e) => setNewGoalTargetDate(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-600 flex items-center gap-1"><Percent className="w-3 h-3 text-indigo-600" /> Initial Progress %</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="100" 
                    value={newGoalProgress}
                    onChange={(e) => setNewGoalProgress(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-indigo-600"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-600 block">Theme Highlight Color</label>
                  <div className="flex items-center gap-3 py-1">
                    {Object.keys(colorThemeMap).map((colorKey) => {
                      const theme = colorThemeMap[colorKey];
                      const isSelected = newGoalColorType === colorKey;
                      return (
                        <button
                          key={colorKey}
                          type="button"
                          onClick={() => setNewGoalColorType(colorKey)}
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
                    onClick={() => setIsAddGoalOpen(false)}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                  >
                    Save Goal
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