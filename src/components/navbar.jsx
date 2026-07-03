// import React from 'react';
// import Logo from './Logo';     // 👈 Look right here in the same folder for Logo.jsx
// import Button from "./Button"; // 👈 Step OUT of components to find Button.jsx in src/

// export default function Navbar() {
//   return (
//     <header className="sticky top-0 z-50 bg-[#f8fafc]/90 backdrop-blur-md border-b border-slate-100 font-sans">
//       <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
//         {/* Render your brand new Logo component here */}
//         <Logo />
        
//         {/* Navigation Links */}
//         <nav className="hidden md:flex items-center gap-10 text-sm font-semibold text-slate-600">
//           <a href="#home" className="hover:text-[#2563eb] transition-colors">Home</a>
//           <a href="#features" className="hover:text-[#2563eb] transition-colors">Features</a>
//           <a href="#about" className="hover:text-[#2563eb] transition-colors">About</a>
//           <a href="#contact" className="hover:text-[#2563eb] transition-colors">Contact</a>
//         </nav>
        
//         {/* Action Button */}
//         <Button className="bg-[#2563eb] text-white px-7 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 shadow-sm">
//           Log In
//         </Button>
//       </div>
//     </header>
//   );
// }


import React from "react";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import Button from "./Button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
      <div className="max-w-screen-2xl mx-auto h-[74px] px-8 lg:px-20 xl:px-28 flex items-center justify-between">

        {/* Logo */}
       <a href="#home" className="cursor-pointer">
  <Logo />
</a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-12">

          <a
            href="#home"
            className="relative text-[16px] font-semibold text-blue-600 after:absolute after:left-0 after:-bottom-2 after:h-[2.5px] after:w-full after:bg-blue-600"
          >
            Home
          </a>

          <a
            href="#features"
            className="text-[16px] font-medium text-slate-600 transition duration-300 hover:text-blue-600"
          >
            Features
          </a>

          <a
            href="#about"
            className="text-[16px] font-medium text-slate-600 transition duration-300 hover:text-blue-600"
          >
            About
          </a>

          <a
            href="#contact"
            className="text-[16px] font-medium text-slate-600 transition duration-300 hover:text-blue-600"
          >
            Contact
          </a>

        </nav>

        {/* Right Buttons */}

        <div className="hidden lg:flex items-center gap-4">

          <Button className="border border-blue-600 bg-white text-blue-600 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:bg-blue-50">
            Log In
          </Button>

          <Button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl">
            Get Started
          </Button>

        </div>

        {/* Mobile Menu */}

        <button className="lg:hidden rounded-lg border border-slate-200 p-2">
          <Menu size={22} />
        </button>

      </div>
    </header>
  );
}