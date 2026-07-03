// import React from 'react';
// import Button from './Button';

// export default function CtaBanner() {
//   return (
//     <section className="max-w-7xl mx-auto px-6 mb-20">
//       <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-3xl p-10 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
//         <div className="space-y-4 max-w-xl z-10 text-center md:text-left">
//           <h2 className="text-2xl md:text-3xl font-bold">Ready to Simplify Your Campus Life?</h2>
//           <p className="text-blue-100 text-sm md:text-base leading-relaxed">
//             Join Campus Connect today and manage your academics, internships, scholarships, events, and more—all in one place.
//           </p>
//         </div>
//         <div className="z-10 shrink-0">
//           <Button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-blue-50 transition-all">
//             Get Started
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// }

import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "./Button";

export default function CtaBanner() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-20 xl:px-28">

        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-10 py-16 lg:px-16 lg:py-20 shadow-2xl">

          {/* Background Decoration */}

          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl"></div>

          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">

            {/* Left */}

            <div>

              <span className="inline-block rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-blue-100">
                Get Started Today
              </span>

              <h2 className="mt-6 text-4xl lg:text-5xl font-bold leading-tight text-white">
                Simplify Your
                <br />
                Campus Journey
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">
                Access internships, scholarships, academic tools,
                campus events and much more from one intelligent
                student platform designed to keep everything organized.
              </p>

              <div className="mt-8 flex flex-wrap gap-6 text-blue-100">

                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} />
                  <span>No Setup Required</span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} />
                  <span>Student Friendly</span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} />
                  <span>Free to Use</span>
                </div>

              </div>

            </div>

            {/* Right */}

            <div className="flex flex-col items-center lg:items-end gap-5">

              <Button className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-700 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-blue-50">
                Get Started
                <ArrowRight size={20} />
              </Button>

              <p className="text-sm text-blue-100 text-center lg:text-right">
                Join hundreds of students already using Campus Connect.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}