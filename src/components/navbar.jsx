import React from 'react';
import Button from './Button';
import { GraduationCap } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between px-8 md:px-16 py-4 bg-white border-b border-gray-100 max-w-7xl mx-auto w-full'>
      {/* Logo */}
      <div className='flex items-center gap-2 text-blue-600 font-bold text-xl'>
        <GraduationCap className='w-7 h-7' />
        <span>Campus Connect</span>
      </div>

      {/* Nav Links */}
      <div className='hidden md:flex items-center gap-8 text-gray-600 text-sm font-medium'>
        <a href='#home' className='hover:text-blue-600 transition-colors'>Home</a>
        <a href='#features' className='hover:text-blue-600 transition-colors'>Features</a>
        <a href='#about' className='hover:text-blue-600 transition-colors'>About</a>
        <a href='#contact' className='hover:text-blue-600 transition-colors'>Contact</a>
      </div>

      {/* Auth Button */}
      <div>
        <Button variant='primary' className='px-7 py-2 rounded-lg'>Log in</Button>
      </div>
    </nav>
  );
}