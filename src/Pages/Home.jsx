import React from 'react';
// import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Feature';
import WhyChooseUs from '../components/WhyChooseUs';
import CtaBanner from '../components/Cta';
// import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900">
      <Hero />
      <Features />
      <WhyChooseUs />
      <CtaBanner />
    </div>
  );
};

export default Home;