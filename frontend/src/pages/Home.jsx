import React from 'react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: 'Real-time Availability',
    icon: '📅',
    desc: 'Easily check and book available time slots without delays.',
  },
  {
    title: 'Email Reminders',
    icon: '🔔',
    desc: 'Stay informed with automatic confirmation and reminder emails.',
  },
  {
    title: 'Secure Booking',
    icon: '🔐',
    desc: 'Your data is safe and protected with modern security standards.',
  },
  {
    title: 'Flexible Services',
    icon: '🛠️',
    desc: 'Book consultations, salon visits, coaching sessions and more.',
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate('/booking'); // ✅ No need to check token manually — PrivateRoute handles it
  };

  // const handleBookingClick = () => {
  //   const token = localStorage.getItem('token'); // Token set after login
  //   if (token) {
  //     navigate('/booking');
  //   } else {
  //     alert('Please log in first to book an appointment.');
  //     navigate('/login');
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* Hero Section */}
      <div className="p-8 flex-grow">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center mb-12">
          <img
            src="/images/booking-hero.png"
            alt="Booking Illustration"
            className="w-full h-auto rounded-lg shadow-md"
          />
          <div>
            <h1 className="text-4xl font-bold mb-4 text-blue-700">
              Welcome to the Booking System
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Book appointments effortlessly with instant confirmations and timely reminders. Fast. Easy. Reliable.
            </p>
            <button
              onClick={handleBookingClick}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Book an Appointment
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-blue-700 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
