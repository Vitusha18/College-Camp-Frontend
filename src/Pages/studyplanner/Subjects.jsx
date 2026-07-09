import React, { useState } from 'react';
import { 
  Plus, 
  X, 
  BookOpen, 
  Tag, 
  Trash2, 
  Filter, 
  AlertCircle,
  Percent,
  CheckCircle2
} from 'lucide-react';

export default function Subjects() {
  const [semesterFilter, setSemesterFilter] = useState('All');

  // Modal State
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [newSubName, setNewSubName] = useState('');
  const [newSubCode, setNewSubCode] = useState('');
  const [newSubSemester, setNewSubSemester] = useState('Spring 2026');
  const [newSubProgress, setNewSubProgress] = useState(45);
  const [newSubColorType, setNewSubColorType] = useState('indigo');

  const colorThemeMap = {
    indigo: { badge: 'bg-indigo-50 border-indigo-200 text-indigo-900', dot: 'bg-indigo-500', bgClass: 'bg-indigo-500', bar: 'bg-indigo-600' },
    emerald: { badge: 'bg-emerald-50 border-emerald-200 text-emerald-900', dot: 'bg-emerald-500', bgClass: 'bg-emerald-500', bar: 'bg-emerald-500' },
    amber: { badge: 'bg-amber-50 border-amber-200 text-amber-900', dot: 'bg-amber-400', bgClass: 'bg-amber-400', bar: 'bg-amber-500' },
    purple: { badge: 'bg-purple-50 border-purple-200 text-purple-900', dot: 'bg-purple-500', bgClass: 'bg-purple-500', bar: 'bg-purple-600' },
    sky: { badge: 'bg-sky-50 border-sky-200 text-sky-900', dot: 'bg-sky-500', bgClass: 'bg-sky-500', bar: 'bg-sky-500' }
  };

  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: 'Data Structures & Algorithms',
      code: 'CS 201',
      semester: 'Spring 2026',
      progress: 68,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      dotColor: 'bg-emerald-500',
      progressBar: 'bg-emerald-500'
    },
    {
      id: 2,
      name: 'Computer Architecture',
      code: 'CS 250',
      semester: 'Spring 2026',
      progress: 42,
      color: 'bg-indigo-50 border-indigo-200 text-indigo-900',
      dotColor: 'bg-indigo-500',
      progressBar: 'bg-indigo-600'
    },
    {
      id: 3,
      name: 'Discrete Mathematics',
      code: 'CS 215',
      semester: 'Spring 2026',
      progress: 85,
      color: 'bg-amber-50 border-amber-200 text-amber-900',
      dotColor: 'bg-amber-400',
      progressBar: 'bg-amber-500'
    },
    {
      id: 4,
      name: 'Database Systems',
      code: 'CS 310',
      semester: 'Spring 2026',
      progress: 30,
      color: 'bg-sky-50 border-sky-200 text-sky-900',
      dotColor: 'bg-sky-500',
      progressBar: 'bg-sky-500'
    }
  ]);

  const handleAddSubjectSubmit = (e) => {
    e.preventDefault();
    if (!newSubName.trim()) return;

    const chosenTheme = colorThemeMap[newSubColorType] || colorThemeMap.indigo;

    const newSubject = {
      id: Date.now(),
      name: newSubName,
      code: newSubCode || 'CS 101',
      semester: newSubSemester,
      progress: Number(newSubProgress) || 0,
      color: chosenTheme.badge,
      dotColor: chosenTheme.dot,
      progressBar: chosenTheme.bar
    };

    setSubjects([newSubject, ...subjects]);
    setNewSubName('');
    setNewSubCode('');
    setNewSubProgress(45);
    setIsAddSubjectOpen(false);
  };

  const handleDeleteSubject = (id) => {
    setSubjects(subjects.filter(sub => sub.id !== id));
  };

  const filteredSubjects = subjects.filter(sub => {
    if (semesterFilter === 'All') return true;
    return sub.semester === semesterFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-indigo-600" /> Subjects Directory
            </h1>
            <p className="text-slate-500 text-sm mt-1">Track your course progression and study completion rates.</p>
          </div>

          <button 
            onClick={() => setIsAddSubjectOpen(true)}
            className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition cursor-pointer self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Subject</span>
          </button>
        </div>

        {/* Semester Filter Bar */}
        <div className="flex items-center justify-between gap-4 mb-6 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 shrink-0 pl-1">
              <Filter className="w-3.5 h-3.5" /> Semester:
            </span>
            {['All', 'Spring 2026', 'Fall 2026'].map((sem) => (
              <button
                key={sem}
                onClick={() => setSemesterFilter(sem)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer whitespace-nowrap ${
                  semesterFilter === sem 
                    ? 'bg-slate-900 text-white border-slate-900' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {sem}
              </button>
            ))}
          </div>
          <span className="text-xs font-semibold bg-slate-100 px-3 py-1 rounded-full text-slate-600 hidden sm:inline-block">
            {filteredSubjects.length} {filteredSubjects.length === 1 ? 'subject' : 'subjects'}
          </span>
        </div>

        {/* Subjects Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-slate-200/80 text-center text-slate-400">
              <AlertCircle className="w-10 h-10 mb-2 opacity-40 text-indigo-600" />
              <p className="text-sm font-medium">No subjects found for this semester filter.</p>
            </div>
          ) : (
            filteredSubjects.map((sub) => (
              <div 
                key={sub.id} 
                className={`border rounded-2xl p-5 shadow-xs transition-all flex flex-col justify-between gap-4 ${sub.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-white/70 rounded-md">
                      {sub.code}
                    </span>
                    <span className={`w-2.5 h-2.5 rounded-full ${sub.dotColor}`}></span>
                  </div>
                  <h3 className="text-base font-bold tracking-tight mb-3">{sub.name}</h3>
                  
                  {/* Progress Indicator */}
                  <div className="bg-white/60 p-3 rounded-xl border border-black/5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="flex items-center gap-1 opacity-80"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Study Completed</span>
                      <span>{sub.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${sub.progressBar || 'bg-indigo-600'}`} 
                        style={{ width: `${Math.min(Math.max(sub.progress, 0), 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-black/5 text-[11px] font-semibold">
                  <span className="opacity-75">{sub.semester}</span>
                  <button 
                    onClick={() => handleDeleteSubject(sub.id)}
                    className="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-white/50 transition cursor-pointer flex items-center gap-1"
                    title="Delete Subject"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Subject Modal */}
        {isAddSubjectOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs px-4">
            <div className="bg-white w-full max-w-md rounded-3xl border border-slate-100 shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-xl">📚</span> Add New Subject
                </h3>
                <button onClick={() => setIsAddSubjectOpen(false)} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddSubjectSubmit} className="space-y-4 text-xs font-semibold">
                <div className="space-y-1.5">
                  <label className="text-slate-600 flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-indigo-600" /> Subject Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Operating Systems" 
                    value={newSubName}
                    onChange={(e) => setNewSubName(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-indigo-600"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-slate-600">Course Code</label>
                    <input 
                      type="text" 
                      placeholder="e.g. CS 325" 
                      value={newSubCode}
                      onChange={(e) => setNewSubCode(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-indigo-600"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-600">Semester Term</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Spring 2026" 
                      value={newSubSemester}
                      onChange={(e) => setNewSubSemester(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-600 flex items-center gap-1"><Percent className="w-3 h-3 text-indigo-600" /> Study Completed %</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="100" 
                    value={newSubProgress}
                    onChange={(e) => setNewSubProgress(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-indigo-600"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-600 block">Theme Highlight Color</label>
                  <div className="flex items-center gap-3 py-1">
                    {Object.keys(colorThemeMap).map((colorKey) => {
                      const theme = colorThemeMap[colorKey];
                      const isSelected = newSubColorType === colorKey;
                      return (
                        <button
                          key={colorKey}
                          type="button"
                          onClick={() => setNewSubColorType(colorKey)}
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
                    onClick={() => setIsAddSubjectOpen(false)}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                  >
                    Save Subject
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