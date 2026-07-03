// import React from 'react';
// import Button from './Button';
// import connectImg from '../assets/connect.PNG'; // Verified exact file name match

// export default function Hero() {
//   return (
//     <section id="home" className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
      
//       {/* Left side text content */}
//       <div className="flex flex-col items-start space-y-6">
//         <span className="inline-block bg-[#eaf2fe] text-[#2563eb] text-sm font-semibold px-4 py-1.5 rounded-full">
//           Welcome to Campus Connect
//         </span>
        
//         <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
//           Your Smart <span className="text-[#2563eb]">Campus <br />Companion</span>
//         </h1>
        
//         <p className="text-gray-500 text-base md:text-lg max-w-md leading-relaxed">
//           Manage your academics, internships, scholarships, and campus life from one platform.
//         </p>
        
//         <div className="flex items-center gap-4 pt-2">
//           <Button className="bg-[#2563eb] text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
//             Get Started
//           </Button>
//           <Button className="bg-white text-slate-800 border border-slate-300 px-8 py-3 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">
//             Learn More
//           </Button>
//         </div>
//       </div>
      
//       {/* Right side illustration layout */}
//       <div className="flex justify-end w-full">
//         <img 
//           src={connectImg} 
//           alt="Students studying illustration" 
//           className="w-full max-w-lg object-contain"
//         />
//       </div>
      
//     </section>
//   );
// }

import React from "react";
import {
  ArrowRight,
  GraduationCap,
  BriefcaseBusiness,
  CalendarDays,
} from "lucide-react";
import Button from "./Button";
import connectImg from "../assets/connect.PNG";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50"
    >
      {/* Background Blur */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-indigo-200/30 blur-3xl"></div>

      <div className="relative max-w-screen-2xl mx-auto px-8 lg:px-20 xl:px-28 pt-6 pb-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ================= LEFT ================= */}

          <div>

            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-700">
              Student Success Platform
            </span>

            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-slate-900">
              Everything You Need
              <br />
              <span className="text-blue-600">
                For Campus Success
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base md:text-lg leading-8 text-slate-600">
              Campus Connect brings academics, internships,
              scholarships, events, study planning and career
              opportunities together in one powerful platform built
              specifically for students.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Button className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl">
                Get Started
                <ArrowRight size={18} />
              </Button>

              <Button className="rounded-xl border border-slate-300 bg-white px-8 py-3 font-semibold text-slate-700 transition-all duration-300 hover:border-blue-600 hover:text-blue-600">
                Learn More
              </Button>

            </div>

            {/* Stats */}

            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-slate-200 pt-8">

              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  500+
                </h2>
                <p className="mt-2 text-slate-500">
                  Students
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  120+
                </h2>
                <p className="mt-2 text-slate-500">
                  Internships
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  80+
                </h2>
                <p className="mt-2 text-slate-500">
                  Scholarships
                </p>
              </div>

            </div>

          </div>

          {/* ================= RIGHT ================= */}

          <div className="relative flex justify-center">

            <img
              src={connectImg}
              alt="Campus Connect"
              className="w-full max-w-xl lg:max-w-2xl object-contain"
            />

            {/* Card 1 */}

            <div className="absolute top-6 left-0 hidden lg:flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl">

              <div className="rounded-xl bg-blue-100 p-3">
                <GraduationCap
                  size={22}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Academic Progress
                </h3>

                <p className="text-sm text-slate-500">
                  Track your CGPA
                </p>
              </div>

            </div>

            {/* Card 2 */}

            <div className="absolute bottom-8 right-0 hidden lg:flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl">

              <div className="rounded-xl bg-green-100 p-3">
                <BriefcaseBusiness
                  size={22}
                  className="text-green-600"
                />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Internship Portal
                </h3>

                <p className="text-sm text-slate-500">
                  Find opportunities
                </p>
              </div>

            </div>

            {/* Card 3 */}

            <div className="absolute top-1/2 -right-6 hidden xl:flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl">

              <div className="rounded-xl bg-orange-100 p-3">
                <CalendarDays
                  size={22}
                  className="text-orange-600"
                />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Campus Events
                </h3>

                <p className="text-sm text-slate-500">
                  Stay Updated
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}