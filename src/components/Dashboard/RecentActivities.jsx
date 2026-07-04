import React from 'react';
import { Briefcase, GraduationCap, Calendar, Calculator, Award, Users, Bell } from 'lucide-react';

const RecentActivities = () => {
  const tools = [
    { name: 'Internship Finder', desc: 'Find and apply to top internships', icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Scholarship Finder', desc: 'Find scholarships you\'re eligible for', icon: GraduationCap, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Study Planner', desc: 'Plan tasks, assignments and exams', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'GPA Calculator', desc: 'Calculate SGPA, CGPA and track growth', icon: Calculator, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Achievements', desc: 'Showcase your skills and certificates', icon: Award, color: 'text-amber-500', bg: 'bg-amber-50' },
    { name: 'Communities', desc: 'Connect and grow with peers', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Access Block */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h4 className="font-bold text-gray-900 text-sm mb-4">Quick Access</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-gray-50 bg-white hover:shadow-sm transition-all cursor-pointer">
                <div className={`p-3 rounded-xl ${tool.bg} ${tool.color} flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900">{tool.name}</h5>
                  <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{tool.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Persistent System Update Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            <Bell className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-gray-900">Never Miss Important Updates</h5>
            <p className="text-[11px] text-gray-500 mt-0.5">Enable smart notifications and stay updated on deadlines, events and opportunities.</p>
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm">
          Manage Notifications
        </button>
      </div>
    </div>
  );
};

export default RecentActivities;