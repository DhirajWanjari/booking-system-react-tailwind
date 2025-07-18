import React from 'react';

const BookingForm = ({ formData, setFormData }) => {
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <input
        name="name"
        placeholder="Full Name"
        className="border p-2 rounded"
        required
        value={formData.name || ''}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        className="border p-2 rounded"
        required
        value={formData.email || ''}
        onChange={handleChange}
      />
      <input
        name="phone"
        placeholder="Phone Number"
        type="tel"
        className="border p-2 rounded"
        required
        value={formData.phone || ''}
        onChange={handleChange}
      />
      <select
        name="gender"
        className="border p-2 rounded"
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
        className="border p-2 rounded col-span-2"
        required
        value={formData.address || ''}
        onChange={handleChange}
      />
      <textarea
        name="message"
        placeholder="Notes (optional)"
        className="border p-2 rounded col-span-2"
        value={formData.message || ''}
        onChange={handleChange}
      />
    </form>
  );
};

export default BookingForm;
