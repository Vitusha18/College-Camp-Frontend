// import React from 'react';
// import { Zap, Smartphone, Bell, BarChart3 } from 'lucide-react';

// export default function WhyChooseUs() {
//   return (
//     <section id="about" className="max-w-7xl mx-auto px-6 py-20">
//       <div className="text-center max-w-2xl mx-auto mb-16">
//         <span className="text-[#2563eb] text-sm font-bold tracking-wider">Why Choose Campus Connect?</span>
//         <h2 className="text-3xl font-bold text-slate-900 mt-2 max-w-xl mx-auto">
//           Everything a student needs to stay organized, connected, and productive.
//         </h2>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white p-6 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.02)] text-center flex flex-col items-center">
//           <div className="p-3 rounded-xl bg-amber-50 text-amber-500 mb-4">
//             <Zap className="h-6 w-6" />
//           </div>
//           <h4 className="font-bold text-base text-slate-900 mb-2">Save Time</h4>
//           <p className="text-gray-400 text-xs leading-relaxed px-2">Access all campus services from one platform.</p>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.02)] text-center flex flex-col items-center">
//           <div className="p-3 rounded-xl bg-blue-50 text-blue-500 mb-4">
//             <Smartphone className="h-6 w-6" />
//           </div>
//           <h4 className="font-bold text-base text-slate-900 mb-2">All-in-One Platform</h4>
//           <p className="text-gray-400 text-xs leading-relaxed px-2">Manage CGPA, Internships, events and more.</p>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.02)] text-center flex flex-col items-center">
//           <div className="p-3 rounded-xl bg-purple-50 text-purple-500 mb-4">
//             <Bell className="h-6 w-6" />
//           </div>
//           <h4 className="font-bold text-base text-slate-900 mb-2">Smart Notifications</h4>
//           <p className="text-gray-400 text-xs leading-relaxed px-2">Never miss deadlines, events or opportunities.</p>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.02)] text-center flex flex-col items-center">
//           <div className="p-3 rounded-xl bg-emerald-50 text-emerald-500 mb-4">
//             <BarChart3 className="h-6 w-6" />
//           </div>
//           <h4 className="font-bold text-base text-slate-900 mb-2">Track Progress</h4>
//           <p className="text-gray-400 text-xs leading-relaxed px-2">Monitor your academic growth and achievements.</p>
//         </div>
//       </div>
//     </section>
//   );
// }

import React from "react";
import {
  Zap,
  Smartphone,
  Bell,
  BarChart3,
  ShieldCheck,
  Users,
} from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Save Time",
    description:
      "Access every essential student service from one centralized platform.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Smartphone,
    title: "All-in-One Platform",
    description:
      "Manage academics, internships, scholarships and campus activities effortlessly.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Receive timely reminders for deadlines, events and important updates.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description:
      "Monitor your academic performance, goals and overall growth.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: ShieldCheck,
    title: "Secure Access",
    description:
      "Your academic information stays protected with secure authentication.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: Users,
    title: "Student Community",
    description:
      "Stay connected with classmates, clubs and campus opportunities.",
    color: "bg-cyan-50 text-cyan-600",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="about"
      className="bg-white py-24"
    >
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-20 xl:px-28">

        {/* Heading */}

        <div className="max-w-3xl mx-auto text-center mb-16">

          <span className="inline-block rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            Why Campus Connect
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-bold text-slate-900">
            Built Around Every
            <br />
            Student's Journey
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            From managing academics to discovering internships and staying
            updated with campus activities, Campus Connect provides everything
            students need in one modern platform.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:bg-white hover:shadow-2xl"
              >

                <div
                  className={`inline-flex rounded-2xl p-4 ${item.color}`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}