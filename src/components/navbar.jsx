

import React from 'react';
import Logo from './Logo';     
import Button from "./Button"; 

// 1. Accept the onLogin function as a prop here
export default function Navbar({ onLogin }) {
  return (
    <header className="sticky top-0 z-50 bg-[#f8fafc]/90 backdrop-blur-md border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Render your brand new Logo component here */}
        <Logo />
        
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-semibold text-slate-600">
          <a href="#home" className="hover:text-[#2563eb] transition-colors">Home</a>
          <a href="#features" className="hover:text-[#2563eb] transition-colors">Features</a>
          <a href="#about" className="hover:text-[#2563eb] transition-colors">About</a>
          <a href="#contact" className="hover:text-[#2563eb] transition-colors">Contact</a>
        </nav>
        
        {/* Action Button */}
        {/* 2. Added onClick={onLogin} to connect your custom button */}
        <Button 
          onClick={onLogin}
          className="bg-[#2563eb] text-white px-7 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 shadow-sm"
        >
          Log In
        </Button>
      </div>
    </header>
  );
}