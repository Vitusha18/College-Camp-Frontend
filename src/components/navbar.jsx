
// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // 👈 1. Import the router hook
// import Logo from './Logo';     
// import Button from "./Button"; 

// export default function Navbar() {
//   const navigate = useNavigate(); // 👈 2. Initialize navigation

//   return (
//     <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
//       <div className="max-w-screen-2xl mx-auto h-[74px] px-8 lg:px-20 xl:px-28 flex items-center justify-between">

//         {/* Logo */}
//         <a href="#home" className="cursor-pointer">
//           <Logo />
//         </a>

//         {/* Desktop Navigation */}
//         <nav className="hidden lg:flex items-center gap-12">
//           <a
//             href="#home"
//             className="relative text-[16px] font-semibold text-blue-600 after:absolute after:left-0 after:-bottom-2 after:h-[2.5px] after:w-full after:bg-blue-600"
//           >
//             Home
//           </a>
//           <a
//             href="#features"
//             className="text-[16px] font-medium text-slate-600 transition duration-300 hover:text-blue-600"
//           >
//             Features
//           </a>
//           <a
//             href="#about"
//             className="text-[16px] font-medium text-slate-600 transition duration-300 hover:text-blue-600"
//           >
//             About
//           </a>
//           <a
//             href="#contact"
//             className="text-[16px] font-medium text-slate-600 transition duration-300 hover:text-blue-600"
//           >
//             Contact
//           </a>
//         </nav>
        
//         {/* Action Button */}
//         {/* 👈 3. Attached the click handler to push users to /dashboard */}
//         <Button 
//           onClick={() => navigate("/dashboard")} 
//           className="bg-[#2563eb] text-white px-7 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 shadow-sm"
//         >
//           Log In
//         </Button>
//       </div>
//     </header>
//   );
// }

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from './Logo';     
import Button from "./Button"; 

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
      <div className="max-w-screen-2xl mx-auto h-[74px] px-8 lg:px-20 xl:px-28 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="cursor-pointer">
          <Logo />
        </Link>

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
        
        {/* Action Button */}
        <Button 
          onClick={() => navigate("/dashboard")} 
          className="bg-[#2563eb] text-white px-7 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 shadow-sm"
        >
          Log In
        </Button>
      </div>
    </header>
  );
}