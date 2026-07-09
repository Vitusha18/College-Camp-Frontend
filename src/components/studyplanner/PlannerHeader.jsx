import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo'; // Goes up exactly one step to find Logo.jsx in the components folder

export default function PlannerHeader() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>
        
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 relative">
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full" />
            🔔
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs cursor-pointer">
            U
          </div>
        </div>
      </div>
    </header>
  );
}