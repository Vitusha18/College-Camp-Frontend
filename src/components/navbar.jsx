import React from 'react';
import Logo from './Logo';     // 👈 Look right here in the same folder for Logo.jsx
import Button from "./Button"; // 👈 Step OUT of components to find Button.jsx in src/

export default function Navbar() {
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
        <Button className="bg-[#2563eb] text-white px-7 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 shadow-sm">
          Log In
        </Button>
      </div>
    </header>
  );
}