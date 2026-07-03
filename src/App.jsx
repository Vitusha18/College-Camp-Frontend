import React from 'react';
import Navbar from './components/navbar';
import Hero from './components/Hero';
import Features from './components/Feature';
import WhyChooseUs from './components/WhyChooseUs';
import CtaBanner from './components/Cta';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 font-sans">
      <Navbar />
      <Hero />
      <hr className="border-gray-100" />
      <Features />
      <hr className="border-gray-100" />
      <WhyChooseUs />
      <CtaBanner />
      <Footer />
    </div>
  );
}