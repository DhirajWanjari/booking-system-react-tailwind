// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-10">
        
        {/* Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white">Booking System</h2>
          <p className="text-sm text-gray-400 mt-1">© {new Date().getFullYear()} All rights reserved</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row gap-4 text-sm items-center">
          <Link to="/contact" className="hover:text-white transition duration-200">Contact Us</Link>
          <Link to="/privacy" className="hover:text-white transition duration-200">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition duration-200">Terms of Service</Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
            <img src="/icons/facebook.svg" alt="Facebook" className="w-6 h-6 hover:opacity-80 transition duration-200" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
            <img src="/icons/twitter.svg" alt="Twitter" className="w-6 h-6 hover:opacity-80 transition duration-200" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <img src="/icons/instagram.svg" alt="Instagram" className="w-6 h-6 hover:opacity-80 transition duration-200" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
