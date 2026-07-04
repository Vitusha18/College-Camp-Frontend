import React from 'react';
import { Search, Bell, ChevronDown, User } from 'lucide-react'; // 👈 Added User icon import

const Header = () => {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
      {/* Search Bar */}
      <div className="relative w-96">
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search internships, scholarships, events..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-700"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white">
            3
          </span>
        </button>

        {/* User Profile Dropdown matching dash 2.PNG */}
        <button className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded-xl transition-all">
          {/* Circular avatar wrapper containing a clean user profile outline icon */}
          <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 text-slate-500">
            <User className="w-5 h-5" />
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </header>
  );
};

export default Header;