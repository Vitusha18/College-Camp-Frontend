


  import React, { useState } from 'react'; // 👈 Added 'useState' import here!

  // 👇 Ensured all your landing page component imports are present
  import Navbar from './components/navbar';
  import Hero from './components/Hero';
  import Features from './components/Feature';
  import WhyChooseUs from './components/WhyChooseUs';
  import CtaBanner from './components/Cta';
  import Footer from './components/Footer';
  
  // Your dashboard main folder component import
  import Dashboard from './components/Dashboard/Dashboard';
  
  export default function App() {
    const [view, setView] = useState('landing');
  
    if (view === 'dashboard') {
      return <Dashboard />;
    }
  
    return (
      <div className="min-h-screen bg-[#f8fafc] text-gray-900 font-sans">
        {/* Pass the state changer function into your Navbar */}
        <Navbar onLogin={() => setView('dashboard')} />
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