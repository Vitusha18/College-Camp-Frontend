import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";

// 👇 1. Import your landing components (making sure paths match your project)
import Home from "./components/Home"; // or wherever Home.jsx lives

// 👇 2. Import your dashboard component
import Dashboard from "./components/Dashboard/Dashboard"; 

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#f8fafc] text-gray-900 font-sans flex flex-col justify-between">
        {/* Navbar stays at the top across landing routes */}
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* The main landing page */}
            <Route path="/" element={<Home />} />
            
            {/* 👇 3. Add the secure path route to your Dashboard! */}
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}