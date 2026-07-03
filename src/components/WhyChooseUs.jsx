import React from 'react';
import { Zap, Smartphone, Bell, BarChart3 } from 'lucide-react';

export default function WhyChooseUs() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[#2563eb] text-sm font-bold tracking-wider">Why Choose Campus Connect?</span>
        <h2 className="text-3xl font-bold text-slate-900 mt-2 max-w-xl mx-auto">
          Everything a student needs to stay organized, connected, and productive.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.02)] text-center flex flex-col items-center">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-500 mb-4">
            <Zap className="h-6 w-6" />
          </div>
          <h4 className="font-bold text-base text-slate-900 mb-2">Save Time</h4>
          <p className="text-gray-400 text-xs leading-relaxed px-2">Access all campus services from one platform.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.02)] text-center flex flex-col items-center">
          <div className="p-3 rounded-xl bg-blue-50 text-blue-500 mb-4">
            <Smartphone className="h-6 w-6" />
          </div>
          <h4 className="font-bold text-base text-slate-900 mb-2">All-in-One Platform</h4>
          <p className="text-gray-400 text-xs leading-relaxed px-2">Manage CGPA, Internships, events and more.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.02)] text-center flex flex-col items-center">
          <div className="p-3 rounded-xl bg-purple-50 text-purple-500 mb-4">
            <Bell className="h-6 w-6" />
          </div>
          <h4 className="font-bold text-base text-slate-900 mb-2">Smart Notifications</h4>
          <p className="text-gray-400 text-xs leading-relaxed px-2">Never miss deadlines, events or opportunities.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.02)] text-center flex flex-col items-center">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-500 mb-4">
            <BarChart3 className="h-6 w-6" />
          </div>
          <h4 className="font-bold text-base text-slate-900 mb-2">Track Progress</h4>
          <p className="text-gray-400 text-xs leading-relaxed px-2">Monitor your academic growth and achievements.</p>
        </div>
      </div>
    </section>
  );
}