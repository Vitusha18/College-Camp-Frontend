// import React from 'react';
// import { Calculator, Search, Briefcase, Calendar, BookOpen, LayoutDashboard } from 'lucide-react';

// export default function Features() {
//   return (
//     <section id="features" className="max-w-7xl mx-auto px-6 py-20">
//       <div className="text-center max-w-2xl mx-auto mb-16">
//         <span className="text-[#2563eb] text-sm font-bold tracking-wider uppercase">Features</span>
//         <h2 className="text-3xl font-bold text-slate-900 mt-2">Everything You Need, All in One Place</h2>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {/* Feature 1 */}
//         <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex items-start gap-4">
//           <div className="p-3 rounded-xl bg-blue-50 text-blue-600 shrink-0">
//             <Calculator className="h-6 w-6" />
//           </div>
//           <div>
//             <h3 className="font-bold text-lg text-slate-900 mb-2">CGPA Calculator</h3>
//             <p className="text-gray-500 text-sm leading-relaxed">Calculate your CGPA and track your academic performance easily.</p>
//           </div>
//         </div>

//         {/* Feature 2 */}
//         <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex items-start gap-4">
//           <div className="p-3 rounded-xl bg-green-50 text-green-600 shrink-0">
//             <Search className="h-6 w-6" />
//           </div>
//           <div>
//             <h3 className="font-bold text-lg text-slate-900 mb-2">Scholarship Finder</h3>
//             <p className="text-gray-500 text-sm leading-relaxed">Discover scholarships based on your profile and eligibility.</p>
//           </div>
//         </div>

//         {/* Feature 3 */}
//         <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex items-start gap-4">
//           <div className="p-3 rounded-xl bg-purple-50 text-purple-600 shrink-0">
//             <Briefcase className="h-6 w-6" />
//           </div>
//           <div>
//             <h3 className="font-bold text-lg text-slate-900 mb-2">Internship Finder</h3>
//             <p className="text-gray-500 text-sm leading-relaxed">Find internships from top companies and apply quickly.</p>
//           </div>
//         </div>

//         {/* Feature 4 */}
//         <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex items-start gap-4">
//           <div className="p-3 rounded-xl bg-amber-50 text-amber-600 shrink-0">
//             <Calendar className="h-6 w-6" />
//           </div>
//           <div>
//             <h3 className="font-bold text-lg text-slate-900 mb-2">Campus Events</h3>
//             <p className="text-gray-500 text-sm leading-relaxed">Stay updated with workshops, seminars, and college events.</p>
//           </div>
//         </div>

//         {/* Feature 5 */}
//         <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex items-start gap-4">
//           <div className="p-3 rounded-xl bg-rose-50 text-rose-600 shrink-0">
//             <BookOpen className="h-6 w-6" />
//           </div>
//           <div>
//             <h3 className="font-bold text-lg text-slate-900 mb-2">Study Planner</h3>
//             <p className="text-gray-500 text-sm leading-relaxed">Plan assignments, deadlines, and study schedules efficiently.</p>
//           </div>
//         </div>

//         {/* Feature 6 */}
//         <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex items-start gap-4">
//           <div className="p-3 rounded-xl bg-cyan-50 text-cyan-600 shrink-0">
//             <LayoutDashboard className="h-6 w-6" />
//           </div>
//           <div>
//             <h3 className="font-bold text-lg text-slate-900 mb-2">Student Dashboard</h3>
//             <p className="text-gray-500 text-sm leading-relaxed">View achievements, tasks, analytics, and progress.</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import React from "react";
import {
  Calculator,
  Search,
  Briefcase,
  Calendar,
  BookOpen,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Calculator,
    title: "CGPA Calculator",
    description:
      "Calculate semester-wise CGPA instantly and monitor your academic performance.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Search,
    title: "Scholarship Finder",
    description:
      "Find scholarships based on eligibility, course, and academic profile.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Briefcase,
    title: "Internship Portal",
    description:
      "Explore internship opportunities from companies and apply in one place.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: Calendar,
    title: "Campus Events",
    description:
      "Stay informed about workshops, seminars, hackathons, and college activities.",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: BookOpen,
    title: "Study Planner",
    description:
      "Manage assignments, deadlines, notes, and study schedules efficiently.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: LayoutDashboard,
    title: "Student Dashboard",
    description:
      "Track achievements, upcoming tasks, attendance, and overall progress.",
    color: "bg-cyan-50 text-cyan-600",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 bg-slate-50"
    >
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-20 xl:px-28">

        {/* Heading */}

        <div className="max-w-3xl mx-auto text-center mb-16">

          <span className="inline-block rounded-full bg-blue-100 text-blue-700 px-5 py-2 text-sm font-semibold">
            Features
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-bold text-slate-900">
            Everything You Need,
            <br />
            All in One Platform
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-8">
            Campus Connect combines all the essential student tools into one
            seamless platform, making academic and career management easier than ever.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl"
              >
                <div
                  className={`inline-flex rounded-2xl p-4 ${feature.color}`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {feature.description}
                </p>

                <button
                  className="mt-8 flex items-center gap-2 font-semibold text-blue-600 transition-all group-hover:gap-3"
                >
                  Learn More
                  <ArrowRight size={18} />
                </button>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}