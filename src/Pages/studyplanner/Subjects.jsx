import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Search, Plus, ChevronRight, 
  CheckCircle2, Clock, Award, X, Trash2
} from 'lucide-react';
import { allCourses as initialCourses } from '../../Data/coursesData';

export default function Subjects() {
  const navigate = useNavigate();
  
  // CHANGED: Moved courses into React state so user additions & deletions persist
  const [courses, setCourses] = useState(initialCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCourseModal, setActiveCourseModal] = useState(null);

  // State for Add Course / Subject Form Modal
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newCategory, setNewCategory] = useState('Computer Science');
  const [newInstructor, setNewInstructor] = useState('');
  const [newSchedule, setNewSchedule] = useState('Mon, Wed (10:00 AM)');

  const categories = ['All', 'Computer Science', 'Mathematics', 'General', 'Elective'];

  // Filter logic based on search & category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate live stats
  const totalEnrolled = courses.length;
  const completedCount = courses.filter(c => c.progress === 100).length;
  const avgProgress = totalEnrolled > 0 ? Math.round(courses.reduce((acc, curr) => acc + curr.progress, 0) / totalEnrolled) : 0;

  // Handler to add a new course/subject
  const handleAddCourseSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCode.trim()) return;

    const newEntry = {
      id: Date.now(),
      title: newTitle,
      code: newCode.toUpperCase(),
      category: newCategory,
      progress: 0,
      totalModules: 10,
      completedModules: 0,
      instructor: newInstructor || 'TBD',
      schedule: newSchedule,
      icon: BookOpen,
      iconColor: 'text-blue-500 bg-blue-50',
      progressColor: 'bg-blue-600',
      status: 'Just Added'
    };

    setCourses([newEntry, ...courses]);
    setNewTitle('');
    setNewCode('');
    setNewInstructor('');
    setIsAddingCourse(false);
  };

  // Handler to delete a course/subject
  const handleDeleteCourse = (id, e) => {
    e.stopPropagation(); // Prevents opening the detail modal when clicking delete
    setCourses(courses.filter(course => course.id !== id));
  };

  return (
    <div className="space-y-8 mt-4 pb-12">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">📘</span> My Enrolled Courses
          </h1>
          <p className="text-xs font-medium text-gray-400">Track your curriculum progress, view schedules, and manage subjects.</p>
        </div>
        <button 
          onClick={() => setIsAddingCourse(!isAddingCourse)} 
          className="flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-xl transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" /> {isAddingCourse ? 'Close Form' : 'Add Subject'}
        </button>
      </div>

      {/* ADD COURSE FORM MODAL / EXPANDABLE PANEL */}
      {isAddingCourse && (
        <form onSubmit={handleAddCourseSubmit} className="bg-white border border-blue-100 p-6 rounded-3xl shadow-sm space-y-4 animate-in fade-in duration-200">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-blue-700">Add a New Course / Subject</h3>
            <button type="button" onClick={() => setIsAddingCourse(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Course Title (e.g., Artificial Intelligence)" 
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="text-xs font-medium p-3 bg-slate-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
              required
            />
            <input 
              type="text" 
              placeholder="Course Code (e.g., CS-404)" 
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              className="text-xs font-medium p-3 bg-slate-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
              required
            />
            <input 
              type="text" 
              placeholder="Instructor Name" 
              value={newInstructor}
              onChange={(e) => setNewInstructor(e.target.value)}
              className="text-xs font-medium p-3 bg-slate-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
            />
            <select 
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="text-xs font-medium p-3 bg-slate-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="General">General</option>
              <option value="Elective">Elective</option>
            </select>
          </div>

          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition cursor-pointer">
            Save Course
          </button>
        </form>
      )}

      {/* STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><BookOpen className="w-6 h-6" /></div>
          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Active Subjects</span>
            <h3 className="text-2xl font-black text-gray-900">{totalEnrolled}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Award className="w-6 h-6" /></div>
          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Avg. Completion</span>
            <h3 className="text-2xl font-black text-gray-900">{avgProgress}%</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><CheckCircle2 className="w-6 h-6" /></div>
          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Fully Completed</span>
            <h3 className="text-2xl font-black text-gray-900">{completedCount}</h3>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition whitespace-nowrap cursor-pointer ${
                selectedCategory === cat ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search courses or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs font-medium pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-2xl outline-none focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* COURSES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => {
            const IconComponent = course.icon || BookOpen;
            return (
              <div 
                key={course.id} 
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-blue-200 transition flex flex-col justify-between space-y-6 group relative"
              >
                {/* Delete Button on Card Top Right */}
                <button 
                  onClick={(e) => handleDeleteCourse(course.id, e)}
                  title="Delete Course"
                  className="absolute top-5 right-5 text-gray-300 hover:text-red-500 bg-slate-50 hover:bg-red-50 p-2 rounded-xl transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="space-y-4">
                  <div className="flex items-start justify-between pr-8">
                    <div className={`p-3 rounded-2xl ${course.iconColor || 'text-blue-500 bg-blue-50'}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 bg-slate-100 text-gray-500 rounded-full">{course.code}</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition leading-snug">{course.title}</h3>
                    <p className="text-xs text-gray-400 font-medium">Instructor: {course.instructor}</p>
                  </div>
                </div>

                <div className="space-y-4 pt-2 border-t border-gray-50">
                  <div className="flex items-center text-xs text-gray-500 font-medium gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{course.schedule}</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-gray-800">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className={`h-full ${course.progressColor || 'bg-blue-600'}`} style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveCourseModal(course)}
                    className="w-full py-2.5 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    View Modules <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-16 text-center space-y-2 bg-white rounded-3xl border border-gray-100">
            <p className="text-sm font-bold text-gray-700">No courses found matching "{searchQuery}"</p>
          </div>
        )}
      </div>

      {/* DETAIL MODAL */}
      {activeCourseModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-lg w-full p-6 rounded-3xl shadow-xl space-y-6 relative">
            <button onClick={() => setActiveCourseModal(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1.5 rounded-full bg-slate-50 cursor-pointer">
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">{activeCourseModal.code} • {activeCourseModal.category}</span>
              <h2 className="text-xl font-black text-gray-900">{activeCourseModal.title}</h2>
              <p className="text-xs text-gray-400 font-medium">Taught by {activeCourseModal.instructor}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl space-y-3">
              <span className="text-xs font-bold text-gray-700 block">Curriculum Summary</span>
              <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>Completed Modules: {activeCourseModal.completedModules} of {activeCourseModal.totalModules}</span>
                <span className="font-bold text-blue-600">{activeCourseModal.progress}% Done</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full" style={{ width: `${activeCourseModal.progress}%` }} />
              </div>
            </div>

            <button onClick={() => setActiveCourseModal(null)} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition cursor-pointer">
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}