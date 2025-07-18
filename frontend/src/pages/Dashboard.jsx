import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const userRes = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userRes.ok) throw new Error('Unauthorized');
        const userData = await userRes.json();
        setUser(userData);

        const bookingRes = await fetch('http://localhost:5000/api/bookings/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!bookingRes.ok) throw new Error('Failed to fetch bookings');
        const bookingData = await bookingRes.json();
        setBookings(bookingData);
      } catch (err) {
        console.error('Dashboard error:', err.message);
        navigate('/login'); // fallback on any failure
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleCancel = async (id) => {
    const confirm = window.confirm('Are you sure you want to cancel this appointment?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
        alert('Appointment cancelled.');
      } else {
        alert('Failed to cancel appointment.');
      }
    } catch (err) {
      console.error('Cancel error:', err.message);
      alert('Server error while cancelling.');
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <>
      <div className="min-h-screen p-8 max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold mb-6 text-center">Dashboard</h2>

        {/* ✅ User Info Section */}
        {user && (
          <div className="mb-6 bg-white shadow p-4 rounded border">
            <h3 className="text-xl font-semibold text-blue-700 mb-1">👤 {user.name}</h3>
            <p className="text-sm text-gray-700">Email: {user.email}</p>
            <p className="text-sm text-gray-700">Role: {user.role}</p>
          </div>
        )}

        {/* ✅ Appointments List */}
        <div className="bg-white shadow p-4 rounded border mb-6">
        <h2 className="text-2xl font-medium mb-6 text-center">📋 My Appointments</h2>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-600">You haven't booked any appointments yet.</p>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-700">{booking.businessType}</h3>
                    <p className="text-gray-700">
                      👤 {booking.name} <br />
                      📅 {booking.date} at 🕒 {booking.time} <br />
                      {booking.business_type}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Status:{' '}
                      <span
                        className={`font-semibold ${
                          booking.status === 'Confirmed'
                            ? 'text-green-600'
                            : 'text-yellow-600'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </p>
                  </div>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition text-sm"
                    onClick={() => handleCancel(booking.id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
     
    </>
  );
};

export default Dashboard;
