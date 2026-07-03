import React from 'react';
import Button from './Button';
import connectImg from '../assets/connect.PNG'; // Verified exact file name match

export default function Hero() {
  return (
    <section id="home" className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
      
      {/* Left side text content */}
      <div className="flex flex-col items-start space-y-6">
        <span className="inline-block bg-[#eaf2fe] text-[#2563eb] text-sm font-semibold px-4 py-1.5 rounded-full">
          Welcome to Campus Connect
        </span>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
          Your Smart <span className="text-[#2563eb]">Campus <br />Companion</span>
        </h1>
        
        <p className="text-gray-500 text-base md:text-lg max-w-md leading-relaxed">
          Manage your academics, internships, scholarships, and campus life from one platform.
        </p>
        
        <div className="flex items-center gap-4 pt-2">
          <Button className="bg-[#2563eb] text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
            Get Started
          </Button>
          <Button className="bg-white text-slate-800 border border-slate-300 px-8 py-3 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">
            Learn More
          </Button>
        </div>
      </div>
      
      {/* Right side illustration layout */}
      <div className="flex justify-end w-full">
        <img 
          src={connectImg} 
          alt="Students studying illustration" 
          className="w-full max-w-lg object-contain"
        />
      </div>
      
    </section>
  );
}