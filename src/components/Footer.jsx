import React from 'react';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#f8fafc] pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-left mb-12">
        
        {/* Column 1: Brand details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#2563eb] font-bold text-xl">
            <GraduationCap className="h-7 w-7" />
            <span>Campus Connect</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            Your smart companion for academics, internships, scholarships and campus life.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-bold text-sm text-slate-900 mb-4 tracking-wide">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><a href="#home" className="hover:text-blue-600 transition-colors">Home</a></li>
            <li><a href="#features" className="hover:text-blue-600 transition-colors">Features</a></li>
            <li><a href="#about" className="hover:text-blue-600 transition-colors">About Us</a></li>
            <li><a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div>
          <h4 className="font-bold text-sm text-slate-900 mb-4 tracking-wide">Support</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">FAQs</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div className="space-y-4">
          <h4 className="font-bold text-sm text-slate-900 tracking-wide">Contact Us</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <Mail className="h-4 w-4 text-blue-500 shrink-0" />
              <span>hello@campusconnect.in</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <Phone className="h-4 w-4 text-blue-500 shrink-0" />
              <span>+91 1234567890</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <MapPin className="h-4 w-4 text-blue-500 shrink-0" />
              <span>Your Campus , Your City</span>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright text directly under everything */}
      <div className="text-center text-xs text-gray-400 pt-8 border-t border-gray-100 max-w-7xl mx-auto">
        © 2026 Campus Connect. All Rights Reserved.
      </div>
    </footer>
  );
}