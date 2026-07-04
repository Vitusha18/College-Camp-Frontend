import React from 'react';
import { Bookmark, ArrowRight, Calendar } from 'lucide-react';

const UpcomingDeadlines = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Recommended for You Column */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-900 text-sm">Recommended for You</h4>
            <button className="text-xs font-semibold text-blue-600 hover:underline">View all</button>
          </div>
          <div className="flex gap-4 border-b border-gray-100 pb-3 mb-4">
            <button className="text-xs font-bold text-blue-600 border-b-2 border-blue-600 pb-2 -mb-[14px]">Internships</button>
            <button className="text-xs font-medium text-gray-400 pb-2">Scholarships</button>
          </div>
          
          <div className="space-y-4">
            {/* Item 1 */}
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center font-bold text-red-500 border border-gray-100">G</div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900">Software Engineering Intern</h5>
                  <p className="text-[11px] text-gray-400">Google • Bengaluru, India</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">₹80,000 / month</span>
                <Bookmark className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
            </div>
            {/* Item 2 */}
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center font-bold text-blue-500 border border-gray-100">M</div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900">Data Science Intern</h5>
                  <p className="text-[11px] text-gray-400">Microsoft • Hyderabad, India</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">₹60,000 / month</span>
                <Bookmark className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:gap-2 mt-6 transition-all w-fit">
          Explore more internships <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Today's Tasks Column */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-900 text-sm">Today's Tasks</h4>
            <button className="text-xs font-semibold text-blue-600 hover:underline">View all</button>
          </div>
          
          <div className="space-y-4 mt-6">
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <div className="flex-1 flex justify-between items-start -mt-0.5">
                <div>
                  <h5 className="text-xs font-bold text-red-600">DBMS Assignment</h5>
                  <p className="text-[11px] text-gray-400">Due today</p>
                </div>
                <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Due today</span>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <div className="flex-1 -mt-0.5">
                <h5 className="text-xs font-bold text-gray-900">Study Operating Systems</h5>
                <p className="text-[11px] text-gray-400">10:00 AM - 11:30 AM</p>
              </div>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:gap-2 mt-6 transition-all w-fit">
          Open Study Planner <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Upcoming Events Column */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-900 text-sm">Upcoming Events</h4>
            <button className="text-xs font-semibold text-blue-600 hover:underline">View all</button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-50 rounded-xl overflow-hidden text-center w-12 border border-blue-100 flex-shrink-0">
                <div className="bg-blue-600 text-white text-[9px] font-bold uppercase py-0.5 tracking-wider">May</div>
                <div className="text-xs font-bold text-blue-700 py-1">22</div>
              </div>
              <div className="flex-1">
                <h5 className="text-xs font-bold text-gray-900 line-clamp-1">Tech Talk: AI in Everyday Life</h5>
                <p className="text-[11px] text-gray-400">3:00 PM – 4:30 PM</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Auditorium, Block A</p>
              </div>
              <Bookmark className="w-4 h-4 text-gray-400 cursor-pointer" />
            </div>
          </div>
        </div>
        <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:gap-2 mt-6 transition-all w-fit">
          Explore all events <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default UpcomingDeadlines;