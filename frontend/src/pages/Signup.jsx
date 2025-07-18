import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
    businessType: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, role, businessType } = formData;
    if (!name || !email || !password || !role) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, businessType })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // 🔁 Redirect based on role
        if (data.user.role === 'admin') {
          window.location.href = '/admin';
        } else if (data.user.role === 'business') {
          window.location.href = '/businessdashboard';
        } else {
          window.location.href = '/dashboard';
        }
      } else {
        setError(data.message || 'Signup failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white shadow-md rounded p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create Your Account</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="customer">Customer</option>
            <option value="business">Business</option>
            
          </select>

          {formData.role === 'business' && (
            <input
              type="text"
              name="businessType"
              placeholder="Business Type (e.g. Salon, Clinic)"
              value={formData.businessType}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
