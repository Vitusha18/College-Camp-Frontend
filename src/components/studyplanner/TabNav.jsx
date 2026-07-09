import React from 'react';
import { NavLink } from 'react-router-dom';

export default function TabNav() {
  const tabs = [
    { name: 'Overview', path: 'overview' },
    { name: 'My Schedule', path: 'schedule' },
    { name: 'Tasks', path: 'tasks' },
    { name: 'Subjects', path: 'subjects' },
    { name: 'Goals', path: 'goals' },
  ];

  return (
    <div className="flex border-b border-gray-100 my-6 overflow-x-auto gap-2">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={`/planner/${tab.path}`}
          className={({ isActive }) =>
            `py-2.5 px-4 font-bold text-sm border-b-2 transition whitespace-nowrap ${
              isActive
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`
          }
        >
          {tab.name}
        </NavLink>
      ))}
    </div>
  );
}