import React from 'react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: 'Real-time Availability',
    icon: '📅',
    desc: 'Book available time slots instantly without waiting.',
  },
  {
    title: 'Email Reminders',
    icon: '📧',
    desc: 'Receive automatic confirmations and reminders.',
  },
  {
    title: 'Secure Booking',
    icon: '🔒',
    desc: 'We use end-to-end encryption to protect your data.',
  },
  {
    title: 'Flexible Services',
    icon: '💼',
    desc: 'From salons to coaching, manage all types of appointments.',
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate('/booking');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-indigo-900 to-black text-white relative">
      {/* Optional: Background Overlay Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: 'url(/images/booking-hero.png)' }}></div>

      <div className="relative z-10 px-6 py-16">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-extrabold mb-6 leading-tight">
              Seamless Online Booking for Any Service
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Schedule appointments with ease. Smart reminders. Real-time updates. No hassle.
            </p>
            <button
              onClick={handleBookingClick}
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md transition"
            >
              Book Now
            </button>
          </div>

          <img
            src="/images/download.jpg"
            alt="Booking"
            className="w-full max-h-[400px] rounded-xl shadow-2xl ring-2 ring-white"
          />
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold mb-8">Why Choose Us?</h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/10 border border-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg hover:scale-105 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-200">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm py-6 text-gray-400 border-t border-white/20">
        &copy; {new Date().getFullYear()} Booking System. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
