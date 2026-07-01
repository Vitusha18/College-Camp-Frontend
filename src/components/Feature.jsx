import React from 'react';
import { Calculator, GraduationCap, Briefcase, Calendar, BookOpen, BarChart3 } from 'lucide-react';

export default function Feature() {
  const features = [
    { icon: <Calculator className='text-blue-600 w-5 h-5' />, title: 'CGPA Calculator', desc: 'Calculate your CGPA and track your academic performance easily.' },
    { icon: <GraduationCap className='text-green-600 w-5 h-5' />, title: 'Scholarship Finder', desc: 'Discover scholarships based on your profile and eligibility.', bg: 'bg-green-50' },
    { icon: <Briefcase className='text-purple-600 w-5 h-5' />, title: 'Internship Finder', desc: 'Find internships from top companies and apply quickly.', bg: 'bg-purple-50' },
    { icon: <Calendar className='text-amber-500 w-5 h-5' />, title: 'Campus Events', desc: 'Stay updated with workshops, seminars, and college events.', bg: 'bg-amber-50' },
    { icon: <BookOpen className='text-rose-500 w-5 h-5' />, title: 'Study Planner', desc: 'Plan assignments, deadlines, and study schedules efficiently.', bg: 'bg-rose-50' },
    { icon: <BarChart3 className='text-cyan-500 w-5 h-5' />, title: 'Student Dashboard', desc: 'View achievements, tasks, analytics, and progress.', bg: 'bg-cyan-50' },
  ];

  return (
    <section id='features' className='max-w-7xl mx-auto px-8 md:px-16 py-20 border-t border-gray-100/80'>
      <div className='text-center space-y-3 mb-16'>
        <p className='text-blue-600 text-sm font-bold tracking-wide uppercase'>Features</p>
        <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>Everything You Need, All in One Place</h2>
      </div>

      <div className='grid md:grid-cols-3 gap-8'>
        {features.map((item, index) => (
          <div key={index} className='bg-white p-8 rounded-xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all hover:translate-y-[-2px] relative group'>
            {/* Minimalist triple dots asset decoration */}
            <div className='absolute top-4 right-5 text-gray-300 group-hover:text-blue-400 font-bold transition-colors text-sm tracking-widest'>•••</div>
            
            <div className={`w-11 h-11 ${item.bg || 'bg-blue-50'} rounded-lg flex items-center justify-center mb-5 shadow-sm`}>
              {item.icon}
            </div>
            <h3 className='font-bold text-gray-900 text-lg mb-2'>{item.title}</h3>
            <p className='text-gray-500 text-sm leading-relaxed'>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}