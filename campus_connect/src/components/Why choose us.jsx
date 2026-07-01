import React from 'react';
import { Zap, Smartphone, Bell, BarChart2 } from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    { icon: <Zap className='text-amber-500 w-5 h-5 fill-amber-500' />, title: 'Save Time', desc: 'Access all campus services from one platform.', bg: 'bg-amber-50' },
    { icon: <Smartphone className='text-blue-600 w-5 h-5' />, title: 'All-in-One Platform', desc: 'Manage CGPA, internships, events and more.', bg: 'bg-blue-50' },
    { icon: <Bell className='text-purple-600 w-5 h-5 fill-purple-100' />, title: 'Smart Notifications', desc: 'Never miss deadlines, events or opportunities.', bg: 'bg-purple-50' },
    { icon: <BarChart2 className='text-emerald-500 w-5 h-5' />, title: 'Track Progress', desc: 'Monitor your academic growth and achievements.', bg: 'bg-emerald-50' },
  ];

  return (
    <section id='about' className='max-w-7xl mx-auto px-8 md:px-16 py-20 border-t border-gray-100/80 bg-slate-50/30'>
      <div className='text-center space-y-3 mb-16 max-w-2xl mx-auto'>
        <p className='text-blue-600 text-sm font-bold tracking-wide uppercase'>Why Choose Campus Connect?</p>
        <h2 className='text-2xl md:text-3xl font-bold text-gray-900 leading-snug'>
          Everything a student needs to stay organized, connected, and productive.
        </h2>
      </div>

      <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {benefits.map((item, index) => (
          <div key={index} className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center'>
            <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-4`}>
              {item.icon}
            </div>
            <h3 className='font-bold text-gray-900 mb-2 text-sm md:text-base'>{item.title}</h3>
            <p className='text-gray-500 text-xs md:text-sm leading-relaxed'>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}