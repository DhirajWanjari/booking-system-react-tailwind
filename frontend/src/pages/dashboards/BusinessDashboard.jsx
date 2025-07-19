import React, { useEffect, useState } from 'react';

const BusinessDashboard = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not authorized');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/business/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data.user);
          setAppointments(data.appointments);
        } else {
          setError(data.message || 'Failed to fetch data');
        }
      } catch (err) {
        setError('Server error');
      }
    };

    fetchDashboard();
  }, []);

  const handleConfirm = async (id) => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'confirmed' }),
      });

      const data = await res.json();

      if (res.ok) {
        setAppointments((prev) =>
          prev.map((appt) => (appt.id === id ? { ...appt, status: 'confirmed' } : appt))
        );
      } else {
        alert(data.message || 'Failed to confirm booking');
      }
    } catch (err) {
      console.error('Confirm error:', err);
      alert('Server error while confirming booking');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-indigo-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">📊 Business Dashboard</h1>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        {user && (
          <div className="mb-6 bg-gray-800 shadow p-4 rounded text-center border border-gray-700">
            <h2 className="text-xl font-semibold text-blue-300 mb-2">👤 {user.name}</h2>
            <p className="text-gray-300">Email: {user.email}</p>
            <p className="text-gray-300">Business Type: {user.business_type}</p>
          </div>
        )}

        <h3 className="text-xl font-bold mb-4 text-center text-blue-400">📅 Appointments</h3>

        {appointments.length === 0 ? (
          <p className="text-center text-gray-400">
            No appointments found for your business service.
          </p>
        ) : (
          <div className="space-y-4">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className="bg-gray-800 border border-gray-700 p-4 rounded shadow-sm flex justify-between items-center hover:shadow-lg transition"
              >
                <div>
                  <p className="font-semibold text-blue-300">👤 {appt.customer_name}</p>
                  <p className="text-gray-300">📅 {appt.date} 🕒 {appt.time}</p>
                  <p className="text-gray-400 mt-1">
                    Status:{' '}
                    <span
                      className={`font-semibold ${
                        appt.status === 'confirmed' ? 'text-green-400' : 'text-yellow-400'
                      }`}
                    >
                      {appt.status}
                    </span>
                  </p>
                </div>

                {appt.status === 'pending' && (
                  <button
                    onClick={() => handleConfirm(appt.id)}
                    className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 transition ml-4 text-sm"
                  >
                    ✅ Confirm
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessDashboard;
