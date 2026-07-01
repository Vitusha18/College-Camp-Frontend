import React from 'react';
// 1. Import all your individual components
import Navbar from './components/navbar';
import HeroSection from './components/Hero';
import Features from './components/Feature';
import WhyChooseUs from './components/Why Choose us';
import CTA from './components/Cta';
import Footer from './components/Footer';

function App() {
  return (
    // min-h-screen ensures the background stretches to full height, 
    // and bg-white (or any color) keeps a clean canvas.
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      
      {/* 2. Stack them vertically in order */}
      <Navbar />
      
      <main>
        <HeroSection />
        <Features />
        <WhyChooseUs />
        <CTA />
      </main>
      
      <Footer />

    </div>
  );
}

export default App;