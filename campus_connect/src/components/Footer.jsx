import React from 'react';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id='contact' className='max-w-7xl mx-auto px-8 md:px-16 pt-16 pb-8 border-t border-gray-100 mt-12'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 mb-12'>
        
        {/* Col 1: Branding */}
        <div className='col-span-2 md:col-span-1 space-y-4'>
          <div className='flex items-center gap-2 text-blue-600 font-bold text-lg'>
            <GraduationCap className='w-6 h-6' />
            <span>Campus Connect</span>
          </div>
          <p className='text-gray-500 text-xs md:text-sm leading-relaxed pr-4'>
            Your smart companion for academics, internships, scholarships and campus life.
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div className='space-y-4'>
          <h4 className='font-bold text-gray-900 text-sm tracking-wide'>Quick Links</h4>
          <ul className='space-y-2.5 text-xs md:text-sm text-gray-500'>
            <li><a href='#home' className='hover:text-blue-600 transition-colors'>Home</a></li>
            <li><a href='#features' className='hover:text-blue-600 transition-colors'>Features</a></li>
            <li><a href='#about' className='hover:text-blue-600 transition-colors'>About Us</a></li>
            <li><a href='#contact' className='hover:text-blue-600 transition-colors'>Contact</a></li>
          </ul>
        </div>

        {/* Col 3: Support */}
        <div className='space-y-4'>
          <h4 className='font-bold text-gray-900 text-sm tracking-wide'>Support</h4>
          <ul className='space-y-2.5 text-xs md:text-sm text-gray-500'>
            <li><a href='#' className='hover:text-blue-600 transition-colors'>Help Center</a></li>
            <li><a href='#' className='hover:text-blue-600 transition-colors'>FAQs</a></li>
            <li><a href='#' className='hover:text-blue-600 transition-colors'>Privacy Policy</a></li>
            <li><a href='#' className='hover:text-blue-600 transition-colors'>Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Col 4: Contact Us */}
        <div className='space-y-4 col-span-2 md:col-span-1 relative'>
          <div className='absolute top-0 left-24 text-gray-300 font-bold tracking-widest text-xs hidden lg:inline'>•••</div>
          <h4 className='font-bold text-gray-900 text-sm tracking-wide'>Contact Us</h4>
          <ul className='space-y-3.5 text-xs md:text-sm text-gray-600 font-medium'>
            <li className='flex items-center gap-2.5'>
              <Mail className='w-4 h-4 text-blue-600 shrink-0' />
              <span className='truncate text-gray-500'>hello@campusconnect.in</span>
            </li>
            <li className='flex items-center gap-2.5'>
              <Phone className='w-4 h-4 text-blue-600 shrink-0' />
              <span className='text-gray-500'>+91 1234567890</span>
            </li>
            <li className='flex items-center gap-2.5'>
              <MapPin className='w-4 h-4 text-blue-600 shrink-0' />
              <span className='text-gray-500'>Your Campus, Your City</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Sub-Footer Section */}
      <div className='border-t border-gray-100 pt-6 text-center text-xs text-gray-400'>
        © {new Date().getFullYear()} Campus Connect. All Rights Reserved.
      </div>
    </footer>
  );
}