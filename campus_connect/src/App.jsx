import React from 'react';
import Navbar from './components/navbar';
import Hero from './components/Hero';
import Feature from './components/Feature';
import WhyChooseUs from './components/Why choose us';
import CTA from './components/Cta';
import Footer from './components/Footer';

function App() {
  return (
    <div className='min-h-screen bg-white text-gray-800 antialiased selection:bg-blue-500 selection:text-white font-sans'>
      <Navbar />
      <main>
        <Hero />
        <Feature />
        <WhyChooseUs />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;