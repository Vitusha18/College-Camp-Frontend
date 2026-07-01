import React from 'react';
import Button from './Button'; 

// 1. Properly import your image using its relative path
import studentIllustration from '../assets/connect.PNG'; 

export default function Hero() {
  return (
    <section id='home' className='max-w-7xl mx-auto px-8 md:px-16 py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center bg-white'>
      
      {/* Left Column (Text & Buttons) */}
      <div className='flex flex-col items-start space-y-6'>
        <span className='bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full'>
          Welcome to Campus Connect
        </span>
        <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight'>
          Your Smart <span className='text-blue-600'>Campus <br /> Companion</span>
        </h1>
        <p className='text-gray-600 text-base md:text-lg max-w-md leading-relaxed'>
          Manage your academics, internships, scholarships, and campus life from one platform.
        </p>
        <div className='flex gap-4 pt-2'>
          <Button variant='primary' className='px-7 py-3 rounded-lg shadow-md shadow-blue-200'>
            Get Started
          </Button>
          <Button variant='outline' className='px-7 py-3 rounded-lg border-slate-200 text-slate-700 hover:bg-slate-50 bg-white shadow-sm'>
            Learn More
          </Button>
        </div>
      </div>

      {/* Right Column (Your Student Illustration) */}
      <div className='flex justify-center items-center w-full'>
        {/* 2. Use the variable name inside curly braces here */}
        <img 
          src={studentIllustration} 
          alt="Campus Connect Students Illustration" 
          className='w-full max-w-lg h-auto object-contain'
          loading="lazy"
        />
      </div>

    </section>
  );
}
