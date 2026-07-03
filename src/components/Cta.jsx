import React from 'react';
import Button from './Button';

export default function CtaBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-20">
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-3xl p-10 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div className="space-y-4 max-w-xl z-10 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold">Ready to Simplify Your Campus Life?</h2>
          <p className="text-blue-100 text-sm md:text-base leading-relaxed">
            Join Campus Connect today and manage your academics, internships, scholarships, events, and more—all in one place.
          </p>
        </div>
        <div className="z-10 shrink-0">
          <Button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-blue-50 transition-all">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}