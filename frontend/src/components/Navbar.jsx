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

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Title */}
        <h1 className="text-xl font-bold">Booking System</h1>

        {/* Burger Icon (Mobile) */}
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

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/booking" className="hover:underline">Book</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/admin" className="hover:underline">Admin</Link>
          <Link to="/businessDashboard" className="hover:underline">Bussiness Dash</Link>
        </div>

        {/* Right Buttons (Desktop) */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <>
              <span className="text-sm">Hi, {user.name || 'User'}</span>
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100">
                Login
              </Link>
              <Link to="/signup" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-2 text-center">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block">Home</Link>
          <Link to="/booking" onClick={() => setMenuOpen(false)} className="block">Book</Link>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block">Dashboard</Link>
          <Link to="/admin" onClick={() => setMenuOpen(false)} className="block">Admin</Link>
          <hr className="border-white opacity-30 my-2" />
          {user ? (
            <>
              <span className="block text-sm text-white">Hi, {user.name || 'User'}</span>
              <button onClick={handleLogout} className="block w-full text-sm bg-red-500 text-white px-4 py-1 rounded mx-auto max-w-xs">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-sm bg-white text-blue-600 px-4 py-1 rounded mx-4">
                Login
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="block text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
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
