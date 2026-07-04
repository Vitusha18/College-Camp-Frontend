import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";

// 👇 Fixed paths to point directly to the files in your components folder
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard/Dashboard"; 

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#f8fafc] text-gray-900 font-sans flex flex-col justify-between">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}