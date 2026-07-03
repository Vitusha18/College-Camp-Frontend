import React from 'react';
import { Calculator, Search, Briefcase, Calendar, BookOpen, LayoutDashboard } from 'lucide-react';

export default function Features() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[#2563eb] text-sm font-bold tracking-wider uppercase">Features</span>
        <h2 className="text-3xl font-bold text-slate-900 mt-2">Everything You Need, All in One Place</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600 shrink-0">
            <Calculator className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">CGPA Calculator</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Calculate your CGPA and track your academic performance easily.</p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-green-50 text-green-600 shrink-0">
            <Search className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Scholarship Finder</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Discover scholarships based on your profile and eligibility.</p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-purple-50 text-purple-600 shrink-0">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Internship Finder</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Find internships from top companies and apply quickly.</p>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600 shrink-0">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Campus Events</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Stay updated with workshops, seminars, and college events.</p>
          </div>
        </div>

        {/* Feature 5 */}
        <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-rose-50 text-rose-600 shrink-0">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Study Planner</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Plan assignments, deadlines, and study schedules efficiently.</p>
          </div>
        </div>

        {/* Feature 6 */}
        <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-cyan-50 text-cyan-600 shrink-0">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Student Dashboard</h3>
            <p className="text-gray-500 text-sm leading-relaxed">View achievements, tasks, analytics, and progress.</p>
          </div>
        </div>
      </div>
    </section>
  );
}