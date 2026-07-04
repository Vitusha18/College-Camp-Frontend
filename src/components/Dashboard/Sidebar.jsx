import React from 'react';
// 1. Import your exact Logo component from your root components folder
import Logo from '../Logo'; 
import { 
  LayoutDashboard, User, BookOpen, Calendar, 
  Briefcase, GraduationCap, Bell, Settings 
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: true },
    { name: 'Profile', icon: User, active: false },
    { name: 'Course', icon: BookOpen, active: false },
    { name: 'Study Planner', icon: Calendar, active: false },
    { name: 'Internship', icon: Briefcase, active: false },
    { name: 'Scholarship', icon: GraduationCap, active: false },
    { name: 'Notification', icon: Bell, active: false },
    { name: 'Settings', icon: Settings, active: false },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen flex flex-col justify-between p-4 sticky top-0">
      <div>
        {/* 2. Your Logo fits seamlessly right inside the sidebar's padding container */}
        <div className="px-3 py-4 mb-4">
          <Logo />
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  item.active
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${item.active ? 'text-blue-600' : 'text-gray-400'}`} />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;