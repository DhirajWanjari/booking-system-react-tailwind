import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setMenuOpen(false);
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (!user) return null;
    if (user.role === 'admin') return '/admin';
    if (user.role === 'business') return '/businessdashboard';
    return '/dashboard'; // customer or default
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Title */}
        <h1 className="text-2xl font-extrabold tracking-wide">Booking System</h1>

        {/* Burger Icon for Mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-yellow-300 transition duration-300">Home</Link>
          <Link to="/booking" className="hover:text-yellow-300 transition duration-300">Book</Link>
          <Link to={getDashboardLink()} className="hover:text-yellow-300 transition duration-300">Dashboard</Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm font-medium">Hi, {user.name || 'User'}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-gray-100 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-center bg-blue-700">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block py-1 hover:text-yellow-200">Home</Link>
          <Link to="/booking" onClick={() => setMenuOpen(false)} className="block py-1 hover:text-yellow-200">Book</Link>
          <Link to={getDashboardLink()} onClick={() => setMenuOpen(false)} className="block py-1 hover:text-yellow-200">Dashboard</Link>

          <hr className="border-white opacity-30 my-2" />

          {user ? (
            <>
              <span className="block text-sm font-medium">Hi, {user.name || 'User'}</span>
              <button
                onClick={handleLogout}
                className="block w-full bg-red-500 text-white px-4 py-1 rounded mx-auto max-w-xs hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block bg-white text-blue-700 px-4 py-1 rounded hover:bg-gray-200 mx-4"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="block bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 mx-4"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
