import React from 'react';
import Button from './Button';

export default function CTA() {
  return (
    <section className='max-w-7xl mx-auto px-8 md:px-16 py-10'>
      <div className='bg-blue-600 rounded-2xl p-8 md:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl'>
        
        {/* Simple geometric element overlay representing original graphic structure */}
        <div className='absolute bottom-[-20%] left-[-5%] w-48 h-48 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-40 pointer-events-none'></div>
        
        <div className='space-y-4 max-w-xl text-center md:text-left z-10'>
          <h2 className='text-2xl md:text-3xl font-bold tracking-tight'>
            Ready to Simplify Your Campus Life?
          </h2>
          <p className='text-blue-100 text-sm md:text-base leading-relaxed opacity-90'>
            Join Campus Connect today and manage your academics, internships, scholarships, events, and more—all in one place.
          </p>
        </div>

        <div className='shrink-0 z-10'>
          <Button variant='white' className='px-8 py-3.5 rounded-lg text-blue-600 shadow-md font-bold text-sm tracking-wide'>
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}