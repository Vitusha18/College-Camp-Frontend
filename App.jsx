// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/navbar";
// import Footer from "./components/Footer";

// // 👇 Fixed paths to point directly to the files in your components folder
// import Home from "./pages/Home";
// import Dashboard from "./components/Dashboard/Dashboard";
// import Register from "./components/Register";
// import Login from "./components/Login";

// export default function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-[#f8fafc] text-gray-900 font-sans flex flex-col justify-between">
//         <Navbar />

//         <main className="flex-grow">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//           </Routes>
//         </main>

//         <Footer />
//       </div>
//     </Router>
//   );
// }

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/navbar";
// import Footer from "./components/Footer";

// // 👇 Fixed paths to point directly to the files in your components folder
// import Home from "./pages/Home";
// import Dashboard from "./components/Dashboard/Dashboard"; 
// import Register from "./components/Register";
// import Login from "./components/Login";

// export default function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-[#f8fafc] text-gray-900 font-sans flex flex-col justify-between">
//         <Navbar />

//         <main className="flex-grow">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/login" element={<Login />} />


//           </Routes>
//         </main>

//         <Footer />
//       </div>
//     </Router>
//   );
// }

//current code
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Navbar from "./components/navbar";
// import Footer from "./components/Footer";

// import Home from "./pages/Home";
// import Dashboard from "./components/Dashboard/Dashboard";
// import Register from "./components/Register";
// import Login from "./components/Login";
// import Overview from "./Pages/studyplanner/Overview";

// function PublicLayout() {
//   return (
//     <>
//       <Navbar />

//       <main className="flex-grow">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           {/* About */}
//           {/* Features */}
//           {/* Contact */}
//         </Routes>
//       </main>

//       <Footer />
//     </>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Pages WITHOUT Navbar/Footer */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/planner" element={<Overview />} />


//         {/* Everything else */}
//         <Route path="/*" element={<PublicLayout />} />
//       </Routes>
//     </Router>
//   );
// }

//updated code
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Footer from "./components/Footer";

import Home from "./Pages/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Internship from "./components/Internship";
import Scholarship from "./components/Scholarship";
import Notifications from "./components/Notifications";
import Settings from "./components/Settings";
import Overview from "./Pages/studyplanner/Overview";
import Subjects from "./Pages/studyplanner/Subjects";

// Public pages layout
function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Pages WITHOUT Navbar/Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/internship" element={<Internship />} />
        <Route path="/scholarship" element={<Scholarship />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />

        {/* Study Planner */}
        <Route path="/planner" element={<Overview />} />
        <Route path="/planner/subjects" element={<Subjects />} />

        {/* Public pages */}
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </Router>
  );
}