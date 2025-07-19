import React from 'react';

const BookingForm = ({ formData, setFormData }) => {
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-sky-100 shadow-lg rounded-lg border border-gray-200">
      <input
        name="name"
        placeholder="Full Name"
        className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
        value={formData.name || ''}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
        value={formData.email || ''}
        onChange={handleChange}
      />
      <input
        name="phone"
        type="tel"
        placeholder="Phone Number"
        className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
        value={formData.phone || ''}
        onChange={handleChange}
      />
      <select
        name="gender"
        className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
        value={formData.gender || ''}
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <input
        name="address"
        placeholder="Address"
        className="p-3 rounded-md border border-gray-300 col-span-1 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
        value={formData.address || ''}
        onChange={handleChange}
      />
      <textarea
        name="message"
        placeholder="Notes (optional)"
        className="p-3 rounded-md border border-gray-300 col-span-1 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none min-h-[100px]"
        value={formData.message || ''}
        onChange={handleChange}
      />
    </form>
  );
};

export default BookingForm;
